import _ from "lodash";
import React, { Component } from 'react';
import {
  Dimensions,
  FlatList, Image, ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ZPNativeModule from "react-native-zalopay-native-module";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from 'redux';
import API from "../../../src/api";
import {StoreState} from "../../store";
import * as UserActions from "../../store/user/actions";
import {RequestFoodItem} from "../../models/api/request/RequestFoodItem";
import {FoodItemDTO} from "../../models/api/response/FoodItemDTO";
import reactotron from "reactotron-react-native";
import ScreenAreaView from "../../components/ScreenAreaView";
import Header from "../../components/Header";
import {NavigationScreenProps} from "react-navigation";
import {CategoryDTO} from "../../models/api/response/CategoryDTO";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import ItemCategory from "../components/ItemCategory";
import {ItemDTO} from "../../models/api/response/ItemDTO";
import { Button } from "zalopay-react-native-ui-toolkit";
import ModalFoodItem from "../../components/ModalFoodItem";
import Loading from "../../components/Loading";
import {FoodItemChoose} from "../../models/application/FoodItemChoose";
import ModalPreview from "../components/ModalPreview";



interface IDispatchInjectedProps {
  UserActions: typeof UserActions,
}


interface IStateInjectedProps {
  lstFoodItem: FoodItemDTO,
  getListFoodLoading: boolean
}

interface IProps extends IStateInjectedProps, IDispatchInjectedProps, NavigationScreenProps{

}

interface IState {
  amount: number;
  lstCategory: CategoryDTO[];
  lstItem: ItemDTO[];
  indexCategory: number;
  modalVisible: boolean;
  modalPreviewVisible: boolean;
  currentItem: ItemDTO;
  lstItemChoose: FoodItemChoose[];
}

class HomeScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      amount: 0,
      lstCategory: [],
      lstItem: [],
      indexCategory: 0,
      modalVisible: false,
      modalPreviewVisible: false,
      currentItem: {},
      lstItemChoose: []
    };

    this._renderItem = this._renderItem.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  public componentDidMount(): void {
      const dt : RequestFoodItem = {
          item_status: 1,
          merchant_code: "canteenvng",
      };
      this.props.UserActions.getListFood("getlist", dt);
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevStates: Readonly<IState>): void {
    const {indexCategory} = this.state;
    const {lstFoodItem} = this.props;

    if (prevProps.lstFoodItem !== lstFoodItem) {
          reactotron.log!('lstFoodItem', this.props.lstFoodItem);
          this.setState({
            lstCategory: lstFoodItem.categories || [],
            lstItem: lstFoodItem.items || [],
            indexCategory: lstFoodItem.categories && lstFoodItem.categories[0].categoryId || 0
          })
      }

      if (prevStates.indexCategory !== indexCategory) {
        let list : ItemDTO[] = [];
        switch (indexCategory) {
          case 0: list = lstFoodItem.items || []; break;
          case 1: list = (lstFoodItem.items || []).filter(value => {
            return value.cateMask === 1
          });
            break;
          case 2: list = (lstFoodItem.items || []).filter(value => {
            return value.cateMask === 2 || value.cateMask === 6 || value.cateMask === 10 || value.cateMask === 7
          });
            break;
          case 3: list = (lstFoodItem.items || []).filter(value => {
            return value.cateMask && value.cateMask > 2 && value.cateMask <= 4
          });
            break;
          case 4: list = (lstFoodItem.items || []).filter(value => {
            return value.cateMask && value.cateMask > 6
          });
            break;
        }

        this.setState({ lstItem: list })
      }
  }

    public handlePayPress = () => {
    const { amount } = this.state;
    ZPNativeModule.showLoading();
    API.createOrder({ amount })
        .then(resp => {
          // tslint:disable-next-line:no-console
          console.log("API.createOrder", resp);
          ZPNativeModule.hideLoading();
          // @ts-ignore
          resp.amount = amount;
          ZPNativeModule.payOrder(resp)
              .then((responseObject: any) => {
                ZPNativeModule.showDialogWithMessage("Thanh toán thành công");
                // tslint:disable-next-line:no-console
                console.log("responseObject success", responseObject);
              })
              .catch((error: any) => {
                ZPNativeModule.showDialogWithMessage("Thanh toán đơn hàng lỗi");
                // tslint:disable-next-line:no-console
                console.log("error", error);
              });
        })
        .catch(error => {
          ZPNativeModule.hideLoading();
          ZPNativeModule.showDialogWithMessage("Tạo đơn hàng lỗi");
          // tslint:disable-next-line:no-console
          console.log("error", error);
        });
  };

  public keyExtractor(_I: CategoryDTO, index: number): string {
      return index.toString();
  }

  public handleCloseModule = () => {
    ZPNativeModule.closeModule()
  };

  public render() {
    return (
        <ScreenAreaView forceInset={{ bottom: 'always' }} style={styles.container}>
            <Header
                backgroundColor={'#008FE5'}
                leftComponent='goBack'
                arrowBackColor='white'
                goBackPressed={this.handleCloseModule}
                centerComponent={(<View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22, lineHeight: 23, fontWeight: '600', color: 'white' }}>Menu Căn tin</Text>
                </View>)}
                rightComponent={(<View style={{ flexDirection: 'row' }}>
                </View>)}
            />
          {this.renderContent()}
        </ScreenAreaView>
    );
  }

  public renderContent() {
    const {lstFoodItem, getListFoodLoading} = this.props;
    const {lstCategory, lstItem, amount, modalVisible, currentItem, modalPreviewVisible, lstItemChoose} = this.state;
    const array2Dimen = _.chunk(lstItem, 3);
    const widthImage = Dimensions.get("window").width / 3.5;


    if (getListFoodLoading) {
      return <Loading/>
    }

    return (
      <View style={{ backgroundColor: '#d3dadd' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10}}
          data={lstCategory}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          renderItem={this._renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <ScrollView style={{ marginBottom: 140 }}>
          {array2Dimen.map((arr, indexCol) => {
            return (
              <View key={indexCol} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: indexCol !== array2Dimen.length - 1 ? 5 : 0, alignContent: 'center', flex: 1 }}>{
                arr.map((item, index) => {
                  const imageUrl = (lstFoodItem.imageHost || '') + item.imgPath;
                  return (
                    <TouchableDebounce key={index} onPress={() => {
                      this.setState({ modalVisible: true, currentItem: item })
                    }}>
                      <View style={{ borderColor: 'black', borderRadius: 5, borderWidth: 1, margin: 5, backgroundColor: 'white' }}>
                        <Image
                          style={{ width: widthImage, height: widthImage, borderRadius: 4 }}
                          source={{ uri: imageUrl }} />
                        <Text style={{ width: widthImage, paddingLeft: 5, paddingTop: 5 }}>{item.itemName}</Text>
                        <Text style={{ color: 'red', width: widthImage, paddingLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{`${item.price} VNĐ`}</Text>
                      </View>
                    </TouchableDebounce>
                  )
                })
              }
              </View>
            )
          })}
        </ScrollView>

        {
          amount ?
            <View style={{ position: 'absolute', height: 50, width: '100%', bottom: 140, right: 0, justifyContent: 'space-between', flexDirection: 'row'}}>

              <TouchableDebounce onPress={() => this.setState({ modalPreviewVisible: true })}
                style={{ backgroundColor: '#000', opacity: 0.7, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 14 }}>{`${amount} vnd`}</Text>
              </TouchableDebounce>
              <Button.Normal
                title="Thanh toán"
                style={styles.payButton}
                onPress={this.handlePayPress}
              />
            </View> : null
        }

        {
          modalVisible ?
            <ModalFoodItem
              imageHost={lstFoodItem.imageHost || ''}
              foodItem={currentItem}
              modalVisible={modalVisible}
              onDone={(price, foodItemChoose) => {
                const lst = this.state.lstItemChoose;
                lst.push(foodItemChoose);
                this.setState({ amount: amount + price, modalVisible: false, lstItemChoose: lst })}
              }
              onClose={() => {this.setState({ modalVisible: false })}}/>
              : null
        }

        {
          modalPreviewVisible ?
            <ModalPreview
              imageHost={lstFoodItem.imageHost || ''}
              lstFoodItem={lstItemChoose}
              amount={amount}
              modalVisible={modalPreviewVisible}
              onClose={() => this.setState({ modalPreviewVisible: false })}/> : null
        }

      </View>
    )

  }

  private _renderItem ({item, index}: { item: CategoryDTO, index: number }) {
    const {indexCategory} = this.state;
    const isChoose = indexCategory === item.categoryId;

    return (
      <ItemCategory
        key={index}
        category={item}
        onPress={(id) => {this.setState({ indexCategory: id })}}
        isChoose={isChoose}
        />
    );
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  lstFoodItem: state.User.lstFoodItem,
  getListFoodLoading: state.User.getListFoodLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  UserActions: bindActionCreators(UserActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008FE5',
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  payButton: {
    width: 150,
    height: 50,
    borderRadius: 0
  },
  textInput: {
    alignSelf: "stretch",
    borderColor: "#FAAAAA",
    borderWidth: 1,
    flex: 1,
    height: 50,
    margin: 10,
    padding: 10,
  },
  userInfoButton: {
    alignSelf: "stretch",
    margin: 10
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  backgroundItemCategory: {
    backgroundColor: 'white',
    height: 50,
    width: Dimensions.get("window").width / 4,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignContent: 'center'
  }
});
