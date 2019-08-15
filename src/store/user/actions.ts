import { IDispatch, IThunkFunction } from "../index";
import {
    IGetListFoodFailureAction,
    IGetListFoodRequestAction,
    IGetListFoodSuccessAction,
    Types
} from "./types";
import {FoodItemDTO} from "../../models/api/response/FoodItemDTO";
import * as FoodService from "../../services/food";
import {RequestFoodItem} from "../../models/api/request/RequestFoodItem";

function getListFood(cm: string, dt: RequestFoodItem): IThunkFunction {
    return async (dispatch: IDispatch) => {
        try {
            dispatch(GetListFoodRequest());
            const response = await FoodService.getListItemFood(cm, dt);
            dispatch(GetListFoodSuccess(response.dt));
        } catch (error) {
            dispatch(GetListFoodFailure(error));
        }
    };
}

function GetListFoodRequest(): IGetListFoodRequestAction {
    return {
        payload: undefined,
        type: Types.GET_LIST_FOOD_REQUEST
    };
}

function GetListFoodSuccess(data: FoodItemDTO): IGetListFoodSuccessAction {
    return {
        payload: data,
        type: Types.GET_LIST_FOOD_SUCCESS
    };
}

function GetListFoodFailure(error: Error): IGetListFoodFailureAction {
    return {
        payload: error,
        type: Types.GET_LIST_FOOD_FAILURE
    };
}

export {
    getListFood,
}
