import {IActions, IState, Types} from "./types";


export const initState: IState = {
    getListFoodHasError: false,
    getListFoodLoading: false,
    lstFoodItem: {},
};

export default function (state: IState = initState, action: IActions): IState {
    switch (action.type) {

        case Types.GET_LIST_FOOD_REQUEST: {
            return {
                ...state,
                getListFoodHasError: false,
                getListFoodLoading: true
            };
        }

        case Types.GET_LIST_FOOD_SUCCESS: {
            return {
                ...state,
                lstFoodItem: action.payload,
                getListFoodLoading: false
            }
        }

        case Types.GET_LIST_FOOD_FAILURE: {
            return {
                ...state,
                getListFoodError: action.payload,
                getListFoodHasError: true,
                getListFoodLoading: false,
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
