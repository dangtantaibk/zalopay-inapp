import * as apiFood from "../api/food";
import {ResponseData} from "../models/types";
import {FoodItemDTO} from "../models/api/response/FoodItemDTO";
import {RequestFoodItem} from "../models/api/request/RequestFoodItem";
import {CategoryDTO} from "../models/api/response/CategoryDTO";
import {ItemDTO} from "../models/api/response/ItemDTO";

/**
 * Get list food
 *
 * @return {Promise}
 */
export function getListItemFood(cm: string, dt: RequestFoodItem): Promise<ResponseData<FoodItemDTO>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiFood.getListItemFood(cm, dt);
      const lstCategory : CategoryDTO[] = [];
      const lstItem: ItemDTO[] = [];
      if (response && response.data && response.data.dt && response.data.dt.categories){
        response.data.dt.categories.map((value: any) => {
          const category: CategoryDTO = {
            ...value,
            categoryName: value.category_name,
            categoryId: value.category_id,
            categoryValue: value.category_value,
            parentId: value.parent_id,
            categoryType: value.category_type
          };
          lstCategory.push(category);
        })
      }
      if (response && response.data && response.data.dt && response.data.dt.items){
        response.data.dt.items.map((value: any) => {
          const item: ItemDTO = {
            itemId: value.item_id,
            itemName: value.item_name,
            itemCode: value.item_code,
            price: value.price,
            imgPath: value.img_path,
            imgCrc: value.img_crc,
            description: value.description,
            inventory: value.inventory,
            status:1,
            createBy: value.create_by,
            createDate: value.create_date,
            barcode: value.barcode,
            modifiedBy: value.modified_by,
            modifiedDateTime: value.modified_date_time,
            order: value.order,
            originalPrice: value.original_price,
            promotionType: value.promotion_type,
            promotionId: value.promotion_id,
            cateMask: value.cate_mask,
            printerMask: value.printer_mask,
            kitchenAreaId: value.kitchen_area_id,
          };
          lstItem.push(item);
        })
      }
      const dat : any = response.data.dt;
      const data: FoodItemDTO = {
        ...response.data.dt,
        categories: lstCategory,
        items: lstItem,
        imageHost: dat.img_host,
        lastUpdate: dat.last_update
      };
      const res : ResponseData<FoodItemDTO> = {
        ...response.data,
        dt: data
      };

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}
