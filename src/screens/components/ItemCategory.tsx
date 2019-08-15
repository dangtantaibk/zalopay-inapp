import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CategoryDTO} from "../../models/api/response/CategoryDTO";
import {TouchableDebounce} from "../../components/TouchableDebounce";

interface IProps {
  category: CategoryDTO;
  onPress: (id: number) => void;
  isChoose: boolean;
}

class ItemCategory extends Component<IProps> {

  public render() {
    const {category, onPress, isChoose} = this.props;
    return (
      <View style={styles.backgroundItemCategory}>
        <TouchableDebounce
          onPress={() => onPress(category.categoryId || 0)}
        >
          {!isChoose ?
            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'normal'}}>{category.categoryName}</Text>
            :
            <Text style={{ color: '#3e5737', fontSize: 16, fontWeight: 'bold'}}>{category.categoryName}</Text>
          }
        </TouchableDebounce>
      </View>
    );
  }
}

export default ItemCategory;

const styles = StyleSheet.create({
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
