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
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const ScreenAreaView_1 = __importDefault(require("../../components/ScreenAreaView"));
const images_1 = require("../../assets/images");
class ModalPreview extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { imageHost, lstFoodItem, amount } = this.props;
        return (React.createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: this.props.modalVisible, onRequestClose: () => { this.props.onClose(); } },
            React.createElement(react_native_1.View, { style: styles.modal },
                React.createElement(TouchableDebounce_1.TouchableDebounce, { style: { flex: 1 }, onPress: () => this.props.onClose() }),
                React.createElement(ScreenAreaView_1.default, { forceInset: { bottom: 'never' }, style: styles.modalSelectBox },
                    React.createElement(react_native_1.View, { style: { backgroundColor: '#008FE5', flexDirection: 'row' } },
                        React.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => this.props.onClose(), style: { padding: 20 } },
                            React.createElement(react_native_1.Image, { source: images_1.icons.close, style: { tintColor: '#FFF' } })),
                        React.createElement(react_native_1.Text, { style: { color: '#FFF', lineHeight: 26, fontSize: 16, textAlign: 'center', padding: 20 } }, "Xem lại")),
                    React.createElement(react_native_1.ScrollView, null, lstFoodItem.map(item => {
                        const imageUrl = imageHost + item.path;
                        if (item.number === 0) {
                            return null;
                        }
                        return (React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginTop: 5, marginLeft: 5 } },
                            React.createElement(react_native_1.Image, { source: { uri: imageUrl }, style: { width: 100, height: 100, borderRadius: 4 } }),
                            React.createElement(react_native_1.View, { style: { marginLeft: 5 } },
                                React.createElement(react_native_1.Text, { style: { paddingLeft: 5, paddingTop: 5 } }, item.name),
                                React.createElement(react_native_1.Text, { style: { color: 'red', paddingLeft: 5, fontSize: 16, fontWeight: 'bold' } }, `${item.price} VNĐ`)),
                            React.createElement(react_native_1.View, { style: { justifyContent: 'center', alignItems: 'center', marginLeft: 10 } },
                                React.createElement(react_native_1.Text, null, `Số lượng: ${item.number}`))));
                    })),
                    React.createElement(react_native_1.View, { style: { justifyContent: 'center', alignItems: 'center', padding: 10 } },
                        React.createElement(react_native_1.Text, { style: { fontSize: 16, fontWeight: 'bold', color: '#000' } }, `Tổng tiền: ${amount}`))))));
    }
}
exports.default = ModalPreview;
const styles = react_native_1.StyleSheet.create({
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
