import api from "../helpers/api";
import {ResponseData} from "../models/types";
import {FoodItemDTO} from "../models/api/response/FoodItemDTO";
import {RequestFoodItem} from "../models/api/request/RequestFoodItem";

/**
 * Get list food
 *
 * @return {Promise}
 */
export function getListItemFood(cm: string, dt: RequestFoodItem) {
  const url = `/item?cm=${cm}&dt=${JSON.stringify(dt)}`;
  return api<ResponseData<FoodItemDTO>>(
      encodeURI(url),
    "GET"
  );
}
