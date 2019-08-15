import { IAction } from "../";
import {FoodItemDTO} from "../../models/api/response/FoodItemDTO";

export enum Types {
    GET_LIST_FOOD_REQUEST = "@@user/GET_LIST_FOOD_REQUEST",
    GET_LIST_FOOD_SUCCESS = "@@user/GET_LIST_FOOD_SUCCESS",
    GET_LIST_FOOD_FAILURE = "@@user/GET_LIST_FOOD_FAILURE",

    RESET_STATE = "@@user/RESET_STATE"
}

export interface IState {
    getListFoodLoading: boolean;
    getListFoodHasError: boolean;
    getListFoodError?: Error;
    lstFoodItem: FoodItemDTO;
}

export interface IGetListFoodRequestAction extends IAction<Types.GET_LIST_FOOD_REQUEST> { }

export interface IGetListFoodSuccessAction extends IAction<Types.GET_LIST_FOOD_SUCCESS, FoodItemDTO> {
    payload: FoodItemDTO;
}
export interface IGetListFoodFailureAction extends IAction<Types.GET_LIST_FOOD_FAILURE, Error> {
    payload: Error;
}

export interface IResetStateAction extends IAction<Types.RESET_STATE> {
    type: Types.RESET_STATE
}

export type IActions =
    IGetListFoodRequestAction
    | IGetListFoodSuccessAction
    | IGetListFoodFailureAction
    | IResetStateAction;
