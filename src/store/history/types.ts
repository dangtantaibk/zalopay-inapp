import { IAction } from "../";
import {InvoiceListDTO} from "../../models/api/response/InvoiceListDTO";
import {InvoiceDTO} from "../../models/api/response/InvoiceDTO";

export enum Types {
    GET_LIST_INVOICE_REQUEST = "@@history/GET_LIST_INVOICE_REQUEST",
    GET_LIST_INVOICE_SUCCESS = "@@history/GET_LIST_INVOICE_SUCCESS",
    GET_LIST_INVOICE_FAILURE = "@@history/GET_LIST_INVOICE_FAILURE",

    RESET_STATE = "@@history/RESET_STATE"
}

export interface IState {
    getListInvoiceLoading: boolean;
    getListInvoiceHasError: boolean;
    getListInvoiceError?: Error;
    lstInvoiceData: InvoiceListDTO;
    lstInvoice: InvoiceDTO[];
}

export interface IGetListInvoiceRequestAction extends IAction<Types.GET_LIST_INVOICE_REQUEST> { }

export interface IGetListInvoiceSuccessAction extends IAction<Types.GET_LIST_INVOICE_SUCCESS, InvoiceListDTO> {
    payload: InvoiceListDTO;
}
export interface IGetListInvoiceFailureAction extends IAction<Types.GET_LIST_INVOICE_FAILURE, Error> {
    payload: Error;
}

export interface IResetStateAction extends IAction<Types.RESET_STATE> {
    type: Types.RESET_STATE
}

export type IActions =
  IGetListInvoiceRequestAction
    | IGetListInvoiceSuccessAction
    | IGetListInvoiceFailureAction
    | IResetStateAction;
