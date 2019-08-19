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
const HistoryActions = __importStar(require("../../store/history/actions"));
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const ScreenAreaView_1 = __importDefault(require("../../components/ScreenAreaView"));
const Header_1 = __importDefault(require("../../components/Header"));
const react_native_zalopay_native_module_1 = __importDefault(require("react-native-zalopay-native-module"));
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const ModalQrCode_1 = __importDefault(require("../components/ModalQrCode"));
class SettingScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleCloseModule = () => {
            react_native_zalopay_native_module_1.default.closeModule();
        };
        this.state = {
            modalQrCodeVisible: false,
            currentInvoice: {}
        };
        this.renderContent = this.renderContent.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }
    componentDidMount() {
        const request = {
            merchant_code: "canteenvng",
            current_page: 1,
            total_trans_per_page: 50
        };
        this.props.HistoryActions.getListInvoice("pagination", request);
    }
    keyExtractor(_I, index) {
        return index.toString();
    }
    render() {
        const { modalQrCodeVisible, currentInvoice } = this.state;
        return (react_1.default.createElement(ScreenAreaView_1.default, { forceInset: { bottom: 'never' }, barStyle: "light-content", style: styles.container },
            react_1.default.createElement(Header_1.default, { backgroundColor: '#008FE5', leftComponent: 'goBack', arrowBackColor: 'white', goBackPressed: this.handleCloseModule, centerComponent: (react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                    react_1.default.createElement(react_native_1.Text, { style: { fontSize: 22, lineHeight: 23, fontWeight: '600', color: 'white' } }, "L\u1ECBch s\u1EED"))), rightComponent: (react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row' } })) }),
            this.renderContent(),
            modalQrCodeVisible ?
                react_1.default.createElement(ModalQrCode_1.default, { currentInvoice: currentInvoice, modalVisible: modalQrCodeVisible, onClose: () => this.setState({ modalQrCodeVisible: false }) }) : null));
    }
    renderContent() {
        const { lstInvoiceData, getListInvoiceLoading } = this.props;
        if (getListInvoiceLoading) {
            return react_1.default.createElement(Loading_1.default, null);
        }
        return (react_1.default.createElement(react_native_1.View, { style: { backgroundColor: '#d3dadd', flex: 1 } },
            react_1.default.createElement(react_native_1.FlatList, { style: { backgroundColor: 'white' }, contentContainerStyle: { paddingHorizontal: 20, paddingVertical: 10 }, data: lstInvoiceData.listInvoice || [], keyExtractor: this.keyExtractor, extraData: this.state, renderItem: this._renderItem, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false })));
    }
    _renderItem({ item, index }) {
        return (react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => this.setState({ modalQrCodeVisible: true, currentInvoice: item }), key: index },
            react_1.default.createElement(react_native_1.View, { style: { width: '100%', height: 100, justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#000', backgroundColor: "rgba(0,143,229,0.26)", padding: 20, margin: 5 } },
                react_1.default.createElement(react_native_1.Text, null, `invoiceId ${item.invoiceId}`),
                react_1.default.createElement(react_native_1.Text, null, `Status payment: ${item.paymentStatus}`),
                react_1.default.createElement(react_native_1.Text, null, `zptranstoken ${item.zptranstoken}`))));
    }
}
const mapStateToProps = (state) => ({
    lstInvoiceData: state.History.lstInvoiceData,
    getListInvoiceLoading: state.History.getListInvoiceLoading,
});
const mapDispatchToProps = (dispatch) => ({
    HistoryActions: redux_1.bindActionCreators(HistoryActions, dispatch),
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#008FE5',
        flex: 1,
    },
});
