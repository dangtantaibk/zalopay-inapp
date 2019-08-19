import * as React from 'react';
import { Component } from "react";
import {Modal, StyleSheet, View} from "react-native";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import ScreenAreaView from "../../components/ScreenAreaView";
import QRCode from 'react-native-qrcode';
import {InvoiceDTO} from "../../models/api/response/InvoiceDTO";

interface IProps {
  modalVisible: boolean,
  onClose: () => void,
  currentInvoice?: InvoiceDTO
}

class ModalQrCode extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {currentInvoice} = this.props;
    const object = {
      zptransid: currentInvoice ? currentInvoice.zptransid : ""
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => { this.props.onClose() }}
      >
        <View style={styles.modal}>
          <TouchableDebounce style={{ flex: 1 }} onPress={() => this.props.onClose()}/>
          <ScreenAreaView forceInset={{ bottom: 'never' }} style={styles.modalSelectBox}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

              <QRCode
                value={JSON.stringify(object)}
                size={200}
                bgColor='black'
                fgColor='white'/>

            </View>
          </ScreenAreaView>
        </View>
      </Modal>
    );
  }
}

export default ModalQrCode

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSelectBox: {
    backgroundColor: 'white',
    flex: 1,
  },
});
