import * as React from 'react';
import { Component } from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {FoodItemChoose} from "../../models/application/FoodItemChoose";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import ScreenAreaView from "../../components/ScreenAreaView";
import {icons} from "../../assets/images";

interface IProps {
  imageHost: string
  lstFoodItem: FoodItemChoose[],
  amount: number,
  modalVisible: boolean,
  onClose: () => void
}

class ModalPreview extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {imageHost, lstFoodItem, amount} = this.props;

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
            <View style={{ backgroundColor: '#008FE5', flexDirection: 'row' }}>
              <TouchableDebounce onPress={() => this.props.onClose()} style={{ padding: 20 }}>
                <Image source={icons.close} style={{ tintColor: '#FFF' }}/>
              </TouchableDebounce>
              <Text style={{ color: '#FFF', lineHeight: 26, fontSize: 16, textAlign: 'center', padding: 20 }}>
                {"Xem lại"}
              </Text>
            </View>
            <ScrollView>
            {
              lstFoodItem.map(item => {
                const imageUrl = imageHost + item.path;
                if (item.number === 0) {
                  return null
                }

                return(
                  <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
                    <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 4 }}/>
                    <View style={{ marginLeft: 5 }}>
                      <Text style={{ paddingLeft: 5, paddingTop: 5 }}>{item.name}</Text>
                      <Text style={{ color: 'red', paddingLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{`${item.price} VNĐ`}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                      <Text>{`Số lượng: ${item.number}`}</Text>
                    </View>
                  </View>
                )
              })
            }
            </ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{`Tổng tiền: ${amount}`}</Text>
            </View>
          </ScreenAreaView>
        </View>
      </Modal>
    );
  }
}

export default ModalPreview

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
