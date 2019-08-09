import React, { Component } from 'react';
import {
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import ZPNativeModule from "react-native-zalopay-native-module";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from 'redux';
import { Button } from "zalopay-react-native-ui-toolkit";
import API from "../../../src/api";
import {StoreState} from "../../store";
import * as UserActions from "../../store/user/actions";



interface IDispatchInjectedProps {
  UserActions: typeof UserActions,
}


interface IStateInjectedProps {
  fontSizeForDisplay: number,
}

interface IProps extends IStateInjectedProps, IDispatchInjectedProps{

}

interface IState {
  amount: string;
}

class HomeScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      amount: "0"
    }
  }

  public handleChangeText = (text: string) => {
    this.setState({
      amount: text
    });
  };

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

  public handleUserInfoPress = () => {
    ZPNativeModule.showLoading();
    ZPNativeModule.getAppUserInfo("")
        .then((responseObject: any) => {
          const {userid, muid, maccesstoken} = responseObject;
          ZPNativeModule.hideLoading();
          ZPNativeModule.showDialogWithMessage(`Thông tin user: userid-${userid}, muid-${muid}, maccesstoken-${maccesstoken} `);
        })
        .catch((error: any) => {
          ZPNativeModule.hideLoading();
          ZPNativeModule.showDialogWithMessage("Get user info error");
          // tslint:disable-next-line:no-console
          console.log("error", error);
        });
  };

  public handleOpenSupportCenter = () => {
    ZPNativeModule.navigateSupportCenter();
  };

  public handleCloseModule = () => {
    ZPNativeModule.closeModule()
  }


  public render() {
    return (
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <Text>Amount</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={this.handleChangeText}
                keyboardType={"number-pad"}
                value={this.state.amount}
            />
          </View>
          <Button.Normal
              title="Pay"
              style={styles.payButton}
              onPress={this.handlePayPress}
          />
          <Button.Normal
              title="Get user info"
              style={styles.userInfoButton}
              onPress={this.handleUserInfoPress}
          />
          <Button.Normal
              title="Support center"
              style={styles.userInfoButton}
              onPress={this.handleOpenSupportCenter}
          />
          <Button.Normal
              title="Close"
              style={styles.userInfoButton}
              onPress={this.handleCloseModule}
          />
        </View>
    );
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  fontSizeForDisplay: state.User.fontSizeForDisplay,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  UserActions: bindActionCreators(UserActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
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
    alignSelf: "stretch",
    margin: 10
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
});
