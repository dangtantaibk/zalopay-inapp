/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, NativeModules, NativeEventEmitter, ScrollView} from 'react-native';
import CryptoJS from 'crypto-js';
import { Button } from "zalopay-react-native-ui-toolkit";
import ZPNativeModule from "react-native-zalopay-native-module";
import API from "../../api";



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
});

let apptransid = 1811232010

const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      money: '10000',
      token:'',
      returncode: ''
    }
  }

  componentDidMount() {
    this.subscription = payZaloBridgeEmitter.addListener(
        'EventPayZalo',
        (data) => {
          console.log('Kết quả giao dịch: ' + data.returnCode, data);
          if(data.returnCode == 1){
            alert('Giao dịch thành công!');
          }else{
            alert('Giao dịch thất bại! ' + data.returnCode);
          }
        }
    );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  createOrder = () => {
    apptransid += 1
    let appid = 352
    let amount = parseInt(this.state.money)
    let appuser = "demozpdk"
    let apptime = (new Date).getTime()
    let embeddata = "{\"promotioninfo\":\"{\\\"campaignc ode\\\":\\\"yeah\\\"}\",\"merchantinfo\":\"embeddata123\"}"
    let item = "[{\\\"itemid\\\":\\\"knb\\\",\\\"itemname\\\":\\\"kim nguyen bao\\\",\\\"itemquantity\\\":10,\\\"itemprice\\\":50000}]"
    let description = "Simple demo zpdk"
    let hmacInput = appid +"|"+ apptransid +"|"+ appuser +"|"+ amount +"|" + apptime +"|"+ embeddata +"|" +item
    let mac = CryptoJS.HmacSHA256(hmacInput, "5NQvhuNM3C8eBD8SBIajpgAgKhiO79yG")
    console.log('====================================');
    console.log("hmacInput: " + hmacInput);
    console.log("mac: " + mac)
    console.log('====================================');
    var order = {
      'appid':appid,
      'appuser': appuser,
      'apptime' : apptime,
      'amount' : amount,
      'apptransid': apptransid,
      'embeddata' : embeddata,
      'item':item,
      'description': description,
      'mac': mac
    };

    console.log(order)

    let formBody = []
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log('body formBody', formBody);
    fetch('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
        .then(resJson => {
          console.log('response json', resJson)
          this.setState({
            token: resJson.zptranstoken,
            returncode: resJson.returncode
          })
        })
        .catch((error)=>{
          console.log("error ", error)
        })
  }

  payOrder = () => {
    var payZP = NativeModules.PayZaloBridge;
    console.log('zptranstoken', this.state.token)
    payZP.payOrder(this.state.token);
  }

  handleChangeText = text => {
    this.setState({
      amount: text
    });
  };

  handlePayPress = () => {
    const { amount } = this.state;
    ZPNativeModule.showLoading();
    API.createOrder({ amount })
        .then(resp => {
          console.log("API.createOrder", resp);
          ZPNativeModule.hideLoading();
          resp.amount = amount;
          ZPNativeModule.payOrder(resp)
              .then((responseObject) => {
                ZPNativeModule.showDialogWithMessage("Thanh toán thành công");
              })
              .catch((error) => {
                ZPNativeModule.showDialogWithMessage("Thanh toán đơn hàng lỗi");
              });
        })
        .catch(error => {
          ZPNativeModule.hideLoading();
          ZPNativeModule.showDialogWithMessage("Tạo đơn hàng lỗi");
        });
  };

  handleUserInfoPress = () => {
    ZPNativeModule.showLoading();
    ZPNativeModule.getAppUserInfo("")
        .then((responseObject) => {
          const {userid, muid, maccesstoken} = responseObject;
          ZPNativeModule.hideLoading();
          ZPNativeModule.showDialogWithMessage(`Thông tin user: userid-${userid}, muid-${muid}, maccesstoken-${maccesstoken} `);
        })
        .catch((error) => {
          ZPNativeModule.hideLoading();
          ZPNativeModule.showDialogWithMessage("Get user info error");
        });
  };

  handleOpenSupportCenter = () => {
    ZPNativeModule.navigateSupportCenter();
  };

  handleCloseModule = () => {
    ZPNativeModule.closeModule()
  }


  render() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  payButton: {
    alignSelf: "stretch",
    margin: 10
  },
  userInfoButton: {
    alignSelf: "stretch",
    margin: 10
  },
  textInput: {
    height: 50,
    borderColor: "#FAAAAA",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignSelf: "stretch",
    flex: 1
  },
});
