import * as React from 'react';
import { Component } from "react";
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ScreenAreaView from "./ScreenAreaView";
import {TouchableDebounce} from "./TouchableDebounce";
import {ItemDTO} from "../models/api/response/ItemDTO";
import {icons} from "../assets/images";
import {FoodItemChoose} from "../models/application/FoodItemChoose";

interface IProps {
  imageHost: string,
  modalVisible: boolean,
  foodItem: ItemDTO,
  onDone: (amount: number, foodItemChoose: FoodItemChoose) => void,
  onClose: () => void
}

interface IState {
  numberItem: number,
  amount: number,
  foodItemChoose: FoodItemChoose;
}

class ModalFoodItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      numberItem: 1,
      amount: 0,
      foodItemChoose: new FoodItemChoose()
    }
  }

  public componentDidMount(): void {
    const {foodItem} = this.props;
    const {numberItem} = this.state;
    const foodItemChoose: FoodItemChoose = {
      name: foodItem.itemName || '',
      number: numberItem,
      price: foodItem.price || 0,
      path: foodItem.imgPath || ''
    };
    this.setState({ amount: (foodItem.price || 0) * numberItem, foodItemChoose })
  }

  public componentDidUpdate(_P: Readonly<IProps>, prevState: Readonly<IState>): void {
    const {foodItem} = this.props;
    const {numberItem} = this.state;
    if (numberItem !== prevState.numberItem) {
      const foodItemChoose: FoodItemChoose = {
        name: foodItem.itemName || '',
        number: numberItem,
        price: foodItem.price || 0,
        path: foodItem.imgPath || ''
      };
      this.setState({ amount: (foodItem.price || 0) * numberItem, foodItemChoose })
    }
  }

  public render() {
    const {imageHost, foodItem} = this.props;
    const {numberItem, amount, foodItemChoose} = this.state;
    const imageUrl = imageHost + foodItem.imgPath;

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
                {"Chọn món"}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
              <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 4 }}/>
              <View style={{ marginLeft: 5 }}>
                <Text style={{ paddingLeft: 5, paddingTop: 5 }}>{foodItem.itemName}</Text>
                <Text style={{ color: 'red', paddingLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{`${foodItem.price} VNĐ`}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableDebounce onPress={() => {
                  this.setState({numberItem: numberItem + 1 })
                }}
                  style={{ padding: 10 }}>
                  <Image source={icons.plus}/>
                </TouchableDebounce>
                <Text style={{ color: '#000', lineHeight: 26, fontSize: 16, textAlign: 'center', padding: 10 }}>{numberItem}</Text>
                <TouchableDebounce onPress={() => {
                  if (numberItem > 0) {
                    this.setState({numberItem: numberItem - 1 })
                  }
                }}
                  style={{ padding: 10 }}>
                  <Image source={icons.minus}/>
                </TouchableDebounce>
              </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{`Tổng tiền: ${amount}`}</Text>
            </View>

            <TouchableOpacity
              style={{ backgroundColor: '#008FE5', borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, position: 'absolute', left: 0, bottom: 20, width: '93%' }}
              onPress={() => this.props.onDone(amount, foodItemChoose)}>
              <Text style={{ color: '#ffffff', lineHeight: 24, fontSize: 16, fontWeight: 'bold' }}>Xong</Text>
            </TouchableOpacity>
          </ScreenAreaView>
        </View>
      </Modal>
    );
  }
}

export default ModalFoodItem

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSelectBox: {
    backgroundColor: 'white',
    flex: 0,
    height: 300,
  },
});
