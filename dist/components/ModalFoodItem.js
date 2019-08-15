"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const ScreenAreaView_1 = __importDefault(require("./ScreenAreaView"));
const TouchableDebounce_1 = require("./TouchableDebounce");
const images_1 = require("../assets/images");
const FoodItemChoose_1 = require("../models/application/FoodItemChoose");
class ModalFoodItem extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberItem: 1,
            amount: 0,
            foodItemChoose: new FoodItemChoose_1.FoodItemChoose()
        };
    }
    componentDidMount() {
        const { foodItem } = this.props;
        const { numberItem } = this.state;
        const foodItemChoose = {
            name: foodItem.itemName || '',
            number: numberItem,
            price: foodItem.price || 0,
            path: foodItem.imgPath || ''
        };
        this.setState({ amount: (foodItem.price || 0) * numberItem, foodItemChoose });
    }
    componentDidUpdate(_P, prevState) {
        const { foodItem } = this.props;
        const { numberItem } = this.state;
        if (numberItem !== prevState.numberItem) {
            const foodItemChoose = {
                name: foodItem.itemName || '',
                number: numberItem,
                price: foodItem.price || 0,
                path: foodItem.imgPath || ''
            };
            this.setState({ amount: (foodItem.price || 0) * numberItem, foodItemChoose });
        }
    }
    render() {
        const { imageHost, foodItem } = this.props;
        const { numberItem, amount, foodItemChoose } = this.state;
        const imageUrl = imageHost + foodItem.imgPath;
        return (React.createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: this.props.modalVisible, onRequestClose: () => { this.props.onClose(); } },
            React.createElement(react_native_1.View, { style: styles.modal },
                React.createElement(TouchableDebounce_1.TouchableDebounce, { style: { flex: 1 }, onPress: () => this.props.onClose() }),
                React.createElement(ScreenAreaView_1.default, { forceInset: { bottom: 'never' }, style: styles.modalSelectBox },
                    React.createElement(react_native_1.View, { style: { backgroundColor: '#008FE5', flexDirection: 'row' } },
                        React.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => this.props.onClose(), style: { padding: 20 } },
                            React.createElement(react_native_1.Image, { source: images_1.icons.close, style: { tintColor: '#FFF' } })),
                        React.createElement(react_native_1.Text, { style: { color: '#FFF', lineHeight: 26, fontSize: 16, textAlign: 'center', padding: 20 } }, "Chọn món")),
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginTop: 5, marginLeft: 5 } },
                        React.createElement(react_native_1.Image, { source: { uri: imageUrl }, style: { width: 100, height: 100, borderRadius: 4 } }),
                        React.createElement(react_native_1.View, { style: { marginLeft: 5 } },
                            React.createElement(react_native_1.Text, { style: { paddingLeft: 5, paddingTop: 5 } }, foodItem.itemName),
                            React.createElement(react_native_1.Text, { style: { color: 'red', paddingLeft: 5, fontSize: 16, fontWeight: 'bold' } }, `${foodItem.price} VNĐ`)),
                        React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end', flexDirection: 'row' } },
                            React.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => {
                                    this.setState({ numberItem: numberItem + 1 });
                                }, style: { padding: 10 } },
                                React.createElement(react_native_1.Image, { source: images_1.icons.plus })),
                            React.createElement(react_native_1.Text, { style: { color: '#000', lineHeight: 26, fontSize: 16, textAlign: 'center', padding: 10 } }, numberItem),
                            React.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => {
                                    if (numberItem > 0) {
                                        this.setState({ numberItem: numberItem - 1 });
                                    }
                                }, style: { padding: 10 } },
                                React.createElement(react_native_1.Image, { source: images_1.icons.minus })))),
                    React.createElement(react_native_1.View, { style: { justifyContent: 'center', alignItems: 'center', padding: 10 } },
                        React.createElement(react_native_1.Text, { style: { fontSize: 16, fontWeight: 'bold', color: '#000' } }, `Tổng tiền: ${amount}`)),
                    React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: '#008FE5', borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, position: 'absolute', left: 0, bottom: 20, width: '93%' }, onPress: () => this.props.onDone(amount, foodItemChoose) },
                        React.createElement(react_native_1.Text, { style: { color: '#ffffff', lineHeight: 24, fontSize: 16, fontWeight: 'bold' } }, "Xong"))))));
    }
}
exports.default = ModalFoodItem;
const styles = react_native_1.StyleSheet.create({
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
