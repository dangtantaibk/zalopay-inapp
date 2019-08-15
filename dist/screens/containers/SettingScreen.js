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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const Loading_1 = __importDefault(require("../../components/Loading"));
class SettingScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ showLoading: false });
        }, 2000);
    }
    render() {
        const { showLoading } = this.state;
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: [styles.welcome] }, "Welcome to React Native!"),
            showLoading && react_1.default.createElement(Loading_1.default, null)));
    }
}
exports.default = SettingScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        margin: 10,
        textAlign: 'center',
    },
});
