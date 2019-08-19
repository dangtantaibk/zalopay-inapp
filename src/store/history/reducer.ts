import {IActions, IState, Types} from "./types";


export const initState: IState = {
    getListInvoiceHasError: false,
    getListInvoiceLoading: false,
    lstInvoiceData: {},
    lstInvoice: []
};

export default function (state: IState = initState, action: IActions): IState {
    switch (action.type) {

        case Types.GET_LIST_INVOICE_REQUEST: {
            return {
                ...state,
                getListInvoiceHasError: false,
                getListInvoiceLoading: true
            };
        }

        case Types.GET_LIST_INVOICE_SUCCESS: {
            return {
                ...state,
                lstInvoiceData: action.payload,
                getListInvoiceLoading: false
            }
        }

        case Types.GET_LIST_INVOICE_FAILURE: {
            return {
                ...state,
                getListInvoiceError: action.payload,
                getListInvoiceHasError: true,
                getListInvoiceLoading: false,
            };
        }

        case Types.RESET_STATE: {
            return initState;
        }

        default: return {
                ...state
            };
    }
}
