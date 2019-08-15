"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lottie_react_native_1 = __importDefault(require("lottie-react-native"));
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const json_1 = require("../assets/json");
const styles = react_native_1.StyleSheet.create({
    loading: {
        height: 300,
        width: 300
    },
    wrapper: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    }
});
class Loading extends react_1.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: [styles.wrapper, this.props.style] },
            react_1.default.createElement(lottie_react_native_1.default, { source: json_1.loading.loadingAnimation, style: styles.loading, loop: true, autoPlay: true })));
    }
}
exports.default = Loading;
