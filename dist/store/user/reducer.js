"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.initState = {
    getListFoodHasError: false,
    getListFoodLoading: false,
    lstFoodItem: {},
};
function default_1(state = exports.initState, action) {
    switch (action.type) {
        case types_1.Types.GET_LIST_FOOD_REQUEST: {
            return Object.assign({}, state, { getListFoodHasError: false, getListFoodLoading: true });
        }
        case types_1.Types.GET_LIST_FOOD_SUCCESS: {
            return Object.assign({}, state, { lstFoodItem: action.payload, getListFoodLoading: false });
        }
        case types_1.Types.GET_LIST_FOOD_FAILURE: {
            return Object.assign({}, state, { getListFoodError: action.payload, getListFoodHasError: true, getListFoodLoading: false });
        }
        case types_1.Types.RESET_STATE: {
            return exports.initState;
        }
        default: return Object.assign({}, state);
    }
}
exports.default = default_1;
