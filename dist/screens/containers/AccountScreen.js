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
const theme_1 = require("../../constants/theme");
class AccountScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true
        };
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: [styles.welcome] }, "Welcome to React Native!")));
    }
}
exports.default = AccountScreen;
const styles = react_native_1.StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: theme_1.colors.main,
        borderRadius: 5,
        height: 50,
        margin: 5,
        width: 200,
        justifyContent: 'center',
    },
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
    textButton: {
        color: 'white'
    },
    welcome: {
        margin: 10,
        textAlign: 'center',
    },
});
