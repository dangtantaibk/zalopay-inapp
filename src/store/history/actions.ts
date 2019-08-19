import { IDispatch, IThunkFunction } from "../index";
import {
    IGetListInvoiceFailureAction, IGetListInvoiceRequestAction, IGetListInvoiceSuccessAction,
    Types
} from "./types";
import * as HistoryService from "../../services/history";
import {RequestInvoiceListOfPage} from "../../models/api/request/RequestInvoiceListOfPage";
import {InvoiceListDTO} from "../../models/api/response/InvoiceListDTO";

function getListInvoice(cm: string, dt: RequestInvoiceListOfPage): IThunkFunction {
    return async (dispatch: IDispatch) => {
        try {
            dispatch(GetListInvoiceRequest());
            const response = await HistoryService.getListInvoice(cm, dt);
            dispatch(GetListInvoiceSuccess(response.dt));
        } catch (error) {
            dispatch(GetListInvoiceFailure(error));
        }
    };
}

function GetListInvoiceRequest(): IGetListInvoiceRequestAction {
    return {
        payload: undefined,
        type: Types.GET_LIST_INVOICE_REQUEST
    };
}

function GetListInvoiceSuccess(data: InvoiceListDTO): IGetListInvoiceSuccessAction {
    return {
        payload: data,
        type: Types.GET_LIST_INVOICE_SUCCESS
    };
}

function GetListInvoiceFailure(error: Error): IGetListInvoiceFailureAction {
    return {
        payload: error,
        type: Types.GET_LIST_INVOICE_FAILURE
    };
}

export {
    getListInvoice,
}
