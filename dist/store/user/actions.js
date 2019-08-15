"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const FoodService = __importStar(require("../../services/food"));
function getListFood(cm, dt) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            dispatch(GetListFoodRequest());
            const response = yield FoodService.getListItemFood(cm, dt);
            dispatch(GetListFoodSuccess(response.dt));
        }
        catch (error) {
            dispatch(GetListFoodFailure(error));
        }
    });
}
exports.getListFood = getListFood;
function GetListFoodRequest() {
    return {
        payload: undefined,
        type: types_1.Types.GET_LIST_FOOD_REQUEST
    };
}
function GetListFoodSuccess(data) {
    return {
        payload: data,
        type: types_1.Types.GET_LIST_FOOD_SUCCESS
    };
}
function GetListFoodFailure(error) {
    return {
        payload: error,
        type: types_1.Types.GET_LIST_FOOD_FAILURE
    };
}
