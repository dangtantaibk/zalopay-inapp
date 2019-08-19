import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Loading from "../../components/Loading";
import * as HistoryActions from "../../store/history/actions";
import {connect} from "react-redux";
import {StoreState} from "../../store";
import {bindActionCreators, Dispatch} from "redux";
import {InvoiceListDTO} from "../../models/api/response/InvoiceListDTO";
import ScreenAreaView from "../../components/ScreenAreaView";
import Header from "../../components/Header";
import ZPNativeModule from "react-native-zalopay-native-module";
import {InvoiceDTO} from "../../models/api/response/InvoiceDTO";
import {RequestInvoiceListOfPage} from "../../models/api/request/RequestInvoiceListOfPage";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import ModalQrCode from "../components/ModalQrCode";


interface IStateInjectedProps {
  lstInvoiceData: InvoiceListDTO,
  getListInvoiceLoading: boolean,
}

interface IDispatchInjectedProps {
  HistoryActions: typeof HistoryActions,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStateInjectedProps, IDispatchInjectedProps{

}

interface IState {
  modalQrCodeVisible: boolean,
  currentInvoice: InvoiceDTO
}

class SettingScreen extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      modalQrCodeVisible: false,
      currentInvoice: {}
    };

    this.renderContent = this.renderContent.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  public componentDidMount(): void {
    const request : RequestInvoiceListOfPage = {
      merchant_code: "canteenvng",
      current_page: 1,
      total_trans_per_page: 50
    };

    this.props.HistoryActions.getListInvoice("pagination", request);
  }

  public handleCloseModule = () => {
    ZPNativeModule.closeModule()
  };

  public keyExtractor(_I: InvoiceDTO, index: number): string {
    return index.toString();
  }

  public render() {
    const {modalQrCodeVisible, currentInvoice} = this.state;

    return (
      <ScreenAreaView forceInset={{ bottom: 'never' }} barStyle={"light-content"} style={styles.container}>
        <Header
          backgroundColor={'#008FE5'}
          leftComponent='goBack'
          arrowBackColor='white'
          goBackPressed={this.handleCloseModule}
          centerComponent={(<View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 22, lineHeight: 23, fontWeight: '600', color: 'white' }}>Lịch sử</Text>
          </View>)}
          rightComponent={(<View style={{ flexDirection: 'row' }}>
          </View>)}
        />
        {this.renderContent()}

        {
          modalQrCodeVisible ?
            <ModalQrCode
              currentInvoice={currentInvoice}
              modalVisible={modalQrCodeVisible}
              onClose={() => this.setState({ modalQrCodeVisible: false })}/> : null
        }
      </ScreenAreaView>
    );
  }

  public renderContent() {
    const {lstInvoiceData, getListInvoiceLoading} = this.props;

    if (getListInvoiceLoading) {
      return <Loading/>
    }

    return (
      <View style={{ backgroundColor: '#d3dadd', flex: 1 }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10}}
          data={lstInvoiceData.listInvoice || []}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )

  }

  public _renderItem({item, index}: { item: InvoiceDTO, index: number }) {
    return (
      <TouchableDebounce
        onPress={() => this.setState({ modalQrCodeVisible: true, currentInvoice: item })}
        key={index}>
        <View style={{ width: '100%', height: 100, justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#000', backgroundColor: "rgba(0,143,229,0.26)", padding: 20, margin: 5}}>
          <Text>{`invoiceId ${item.invoiceId}`}</Text>
          <Text>{`Status payment: ${item.paymentStatus}`}</Text>
          <Text>{`zptranstoken ${item.zptranstoken}`}</Text>
        </View>
      </TouchableDebounce>
    )
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  lstInvoiceData: state.History.lstInvoiceData,
  getListInvoiceLoading: state.History.getListInvoiceLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  HistoryActions: bindActionCreators(HistoryActions, dispatch),
});

export default  connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008FE5',
    flex: 1,
  },
});