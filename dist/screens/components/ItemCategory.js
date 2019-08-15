"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
class ItemCategory extends react_1.Component {
    render() {
        const { category, onPress, isChoose } = this.props;
        return (react_1.default.createElement(react_native_1.View, { style: styles.backgroundItemCategory },
            react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => onPress(category.categoryId || 0) }, !isChoose ?
                react_1.default.createElement(react_native_1.Text, { style: { color: 'black', fontSize: 14, fontWeight: 'normal' } }, category.categoryName)
                :
                    react_1.default.createElement(react_native_1.Text, { style: { color: '#3e5737', fontSize: 16, fontWeight: 'bold' } }, category.categoryName))));
    }
}
exports.default = ItemCategory;
const styles = react_native_1.StyleSheet.create({
    backgroundItemCategory: {
        backgroundColor: 'white',
        height: 50,
        width: react_native_1.Dimensions.get("window").width / 4,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        justifyContent: 'center',
        alignContent: 'center'
    }
});
