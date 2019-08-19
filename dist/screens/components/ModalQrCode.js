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
const react_native_qrcode_1 = __importDefault(require("react-native-qrcode"));
class ModalQrCode extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { currentInvoice } = this.props;
        const object = {
            zptransid: currentInvoice ? currentInvoice.zptransid : ""
        };
        return (React.createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: this.props.modalVisible, onRequestClose: () => { this.props.onClose(); } },
            React.createElement(react_native_1.View, { style: styles.modal },
                React.createElement(TouchableDebounce_1.TouchableDebounce, { style: { flex: 1 }, onPress: () => this.props.onClose() }),
                React.createElement(ScreenAreaView_1.default, { forceInset: { bottom: 'never' }, style: styles.modalSelectBox },
                    React.createElement(react_native_1.View, { style: { justifyContent: 'center', alignItems: 'center', flex: 1 } },
                        React.createElement(react_native_qrcode_1.default, { value: JSON.stringify(object), size: 200, bgColor: 'black', fgColor: 'white' }))))));
    }
}
exports.default = ModalQrCode;
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
