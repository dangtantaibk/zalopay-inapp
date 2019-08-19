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
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_zalopay_native_module_1 = __importDefault(require("react-native-zalopay-native-module"));
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const api_1 = __importDefault(require("../../../src/api"));
const UserActions = __importStar(require("../../store/user/actions"));
const reactotron_react_native_1 = __importDefault(require("reactotron-react-native"));
const ScreenAreaView_1 = __importDefault(require("../../components/ScreenAreaView"));
const Header_1 = __importDefault(require("../../components/Header"));
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const ItemCategory_1 = __importDefault(require("../components/ItemCategory"));
const zalopay_react_native_ui_toolkit_1 = require("zalopay-react-native-ui-toolkit");
const ModalFoodItem_1 = __importDefault(require("../../components/ModalFoodItem"));
const Loading_1 = __importDefault(require("../../components/Loading"));
const ModalPreview_1 = __importDefault(require("../components/ModalPreview"));
const ModalQrCode_1 = __importDefault(require("../components/ModalQrCode"));
class HomeScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.handlePayPress = () => {
            const { amount } = this.state;
            react_native_zalopay_native_module_1.default.showLoading();
            api_1.default.createOrder({ amount })
                .then(resp => {
                console.log("API.createOrder", resp);
                react_native_zalopay_native_module_1.default.hideLoading();
                resp.amount = amount;
                react_native_zalopay_native_module_1.default.payOrder(resp)
                    .then((responseObject) => {
                    react_native_zalopay_native_module_1.default.showDialogWithMessage("Thanh toán thành công");
                    console.log("responseObject success", responseObject);
                })
                    .catch((error) => {
                    react_native_zalopay_native_module_1.default.showDialogWithMessage("Thanh toán đơn hàng lỗi");
                    console.log("error", error);
                });
            })
                .catch(error => {
                react_native_zalopay_native_module_1.default.hideLoading();
                react_native_zalopay_native_module_1.default.showDialogWithMessage("Tạo đơn hàng lỗi");
                console.log("error", error);
            });
        };
        this.handleCloseModule = () => {
            react_native_zalopay_native_module_1.default.closeModule();
        };
        this.state = {
            amount: 0,
            lstCategory: [],
            lstItem: [],
            indexCategory: 0,
            modalVisible: false,
            modalPreviewVisible: false,
            modalQrCodeVisible: false,
            currentItem: {},
            lstItemChoose: []
        };
        this._renderItem = this._renderItem.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }
    componentDidMount() {
        const dt = {
            item_status: 1,
            merchant_code: "canteenvng",
        };
        this.props.UserActions.getListFood("getlist", dt);
    }
    componentDidUpdate(prevProps, prevStates) {
        const { indexCategory } = this.state;
        const { lstFoodItem } = this.props;
        if (prevProps.lstFoodItem !== lstFoodItem) {
            reactotron_react_native_1.default.log('lstFoodItem', this.props.lstFoodItem);
            this.setState({
                lstCategory: lstFoodItem.categories || [],
                lstItem: lstFoodItem.items || [],
                indexCategory: lstFoodItem.categories && lstFoodItem.categories[0].categoryId || 0
            });
        }
        if (prevStates.indexCategory !== indexCategory) {
            let list = [];
            switch (indexCategory) {
                case 0:
                    list = lstFoodItem.items || [];
                    break;
                case 1:
                    list = (lstFoodItem.items || []).filter(value => {
                        return value.cateMask === 1;
                    });
                    break;
                case 2:
                    list = (lstFoodItem.items || []).filter(value => {
                        return value.cateMask === 2 || value.cateMask === 6 || value.cateMask === 10 || value.cateMask === 7;
                    });
                    break;
                case 3:
                    list = (lstFoodItem.items || []).filter(value => {
                        return value.cateMask && value.cateMask > 2 && value.cateMask <= 4;
                    });
                    break;
                case 4:
                    list = (lstFoodItem.items || []).filter(value => {
                        return value.cateMask && value.cateMask > 6;
                    });
                    break;
            }
            this.setState({ lstItem: list });
        }
    }
    keyExtractor(_I, index) {
        return index.toString();
    }
    render() {
        return (react_1.default.createElement(ScreenAreaView_1.default, { forceInset: { bottom: 'never' }, barStyle: "light-content", style: styles.container },
            react_1.default.createElement(Header_1.default, { backgroundColor: '#008FE5', leftComponent: 'goBack', arrowBackColor: 'white', goBackPressed: this.handleCloseModule, centerComponent: (react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                    react_1.default.createElement(react_native_1.Text, { style: { fontSize: 22, lineHeight: 23, fontWeight: '600', color: 'white' } }, "Menu C\u0103n tin"))), rightComponent: (react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row' } })) }),
            this.renderContent()));
    }
    renderContent() {
        const { lstFoodItem, getListFoodLoading } = this.props;
        const { lstCategory, lstItem, amount, modalVisible, currentItem, modalPreviewVisible, lstItemChoose, modalQrCodeVisible } = this.state;
        const array2Dimen = lodash_1.default.chunk(lstItem, 3);
        const widthImage = react_native_1.Dimensions.get("window").width / 3.5;
        if (getListFoodLoading) {
            return react_1.default.createElement(Loading_1.default, null);
        }
        return (react_1.default.createElement(react_native_1.View, { style: { backgroundColor: '#d3dadd', flex: 1 } },
            react_1.default.createElement(react_native_1.FlatList, { style: { backgroundColor: 'white' }, contentContainerStyle: { paddingHorizontal: 20, paddingVertical: 10 }, data: lstCategory, keyExtractor: this.keyExtractor, extraData: this.state, renderItem: this._renderItem, horizontal: true, showsHorizontalScrollIndicator: false }),
            react_1.default.createElement(react_native_1.ScrollView, { style: {} }, array2Dimen.map((arr, indexCol) => {
                return (react_1.default.createElement(react_native_1.View, { key: indexCol, style: { flexDirection: 'row', justifyContent: 'center', marginBottom: indexCol !== array2Dimen.length - 1 ? 5 : 0, alignContent: 'center', flex: 1 } }, arr.map((item, index) => {
                    const imageUrl = (lstFoodItem.imageHost || '') + item.imgPath;
                    return (react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { key: index, onPress: () => {
                            this.setState({ modalVisible: true, currentItem: item });
                        } },
                        react_1.default.createElement(react_native_1.View, { style: { borderColor: 'black', borderRadius: 5, borderWidth: 1, margin: 5, backgroundColor: 'white' } },
                            react_1.default.createElement(react_native_1.Image, { style: { width: widthImage, height: widthImage, borderRadius: 4 }, source: { uri: imageUrl } }),
                            react_1.default.createElement(react_native_1.Text, { style: { width: widthImage, paddingLeft: 5, paddingTop: 5 } }, item.itemName),
                            react_1.default.createElement(react_native_1.Text, { style: { color: 'red', width: widthImage, paddingLeft: 5, fontSize: 16, fontWeight: 'bold' } }, `${item.price} VNĐ`))));
                })));
            })),
            amount ?
                react_1.default.createElement(react_native_1.View, { style: { position: 'absolute', height: 50, width: '100%', bottom: 0, right: 0, justifyContent: 'space-between', flexDirection: 'row' } },
                    react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => this.setState({ modalPreviewVisible: true }), style: { backgroundColor: '#000', opacity: 0.7, flex: 1, justifyContent: 'center', alignItems: 'center' } },
                        react_1.default.createElement(react_native_1.Text, { style: { color: '#FFF', fontWeight: '600', fontSize: 14 } }, `${amount} vnd`)),
                    react_1.default.createElement(zalopay_react_native_ui_toolkit_1.Button.Normal, { title: "Thanh to\u00E1n", style: styles.payButton, onPress: () => this.setState({ modalQrCodeVisible: true }) })) : null,
            modalVisible ?
                react_1.default.createElement(ModalFoodItem_1.default, { imageHost: lstFoodItem.imageHost || '', foodItem: currentItem, modalVisible: modalVisible, onDone: (price, foodItemChoose) => {
                        const lst = this.state.lstItemChoose;
                        lst.push(foodItemChoose);
                        this.setState({ amount: amount + price, modalVisible: false, lstItemChoose: lst });
                    }, onClose: () => { this.setState({ modalVisible: false }); } })
                : null,
            modalPreviewVisible ?
                react_1.default.createElement(ModalPreview_1.default, { imageHost: lstFoodItem.imageHost || '', lstFoodItem: lstItemChoose, amount: amount, modalVisible: modalPreviewVisible, onClose: () => this.setState({ modalPreviewVisible: false }) }) : null,
            modalQrCodeVisible ?
                react_1.default.createElement(ModalQrCode_1.default, { modalVisible: modalQrCodeVisible, onClose: () => this.setState({ modalQrCodeVisible: false }) }) : null));
    }
    _renderItem({ item, index }) {
        const { indexCategory } = this.state;
        const isChoose = indexCategory === item.categoryId;
        return (react_1.default.createElement(ItemCategory_1.default, { key: index, category: item, onPress: (id) => { this.setState({ indexCategory: id }); }, isChoose: isChoose }));
    }
}
const mapStateToProps = (state) => ({
    lstFoodItem: state.User.lstFoodItem,
    getListFoodLoading: state.User.getListFoodLoading,
});
const mapDispatchToProps = (dispatch) => ({
    UserActions: redux_1.bindActionCreators(UserActions, dispatch),
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#008FE5',
        flex: 1,
    },
    inputWrapper: {
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    payButton: {
        width: 150,
        height: 50,
        borderRadius: 0
    },
    textInput: {
        alignSelf: "stretch",
        borderColor: "#FAAAAA",
        borderWidth: 1,
        flex: 1,
        height: 50,
        margin: 10,
        padding: 10,
    },
    userInfoButton: {
        alignSelf: "stretch",
        margin: 10
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
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
