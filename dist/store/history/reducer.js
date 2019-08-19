"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.initState = {
    getListInvoiceHasError: false,
    getListInvoiceLoading: false,
    lstInvoiceData: {},
    lstInvoice: []
};
function default_1(state = exports.initState, action) {
    switch (action.type) {
        case types_1.Types.GET_LIST_INVOICE_REQUEST: {
            return Object.assign({}, state, { getListInvoiceHasError: false, getListInvoiceLoading: true });
        }
        case types_1.Types.GET_LIST_INVOICE_SUCCESS: {
            return Object.assign({}, state, { lstInvoiceData: action.payload, getListInvoiceLoading: false });
        }
        case types_1.Types.GET_LIST_INVOICE_FAILURE: {
            return Object.assign({}, state, { getListInvoiceError: action.payload, getListInvoiceHasError: true, getListInvoiceLoading: false });
        }
        case types_1.Types.RESET_STATE: {
            return exports.initState;
        }
        default: return Object.assign({}, state);
    }
}
exports.default = default_1;
