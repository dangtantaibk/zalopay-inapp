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
const apiFood = __importStar(require("../api/food"));
function getListItemFood(cm, dt) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield apiFood.getListItemFood(cm, dt);
            const lstCategory = [];
            const lstItem = [];
            if (response && response.data && response.data.dt && response.data.dt.categories) {
                response.data.dt.categories.map((value) => {
                    const category = Object.assign({}, value, { categoryName: value.category_name, categoryId: value.category_id, categoryValue: value.category_value, parentId: value.parent_id, categoryType: value.category_type });
                    lstCategory.push(category);
                });
            }
            if (response && response.data && response.data.dt && response.data.dt.items) {
                response.data.dt.items.map((value) => {
                    const item = {
                        itemId: value.item_id,
                        itemName: value.item_name,
                        itemCode: value.item_code,
                        price: value.price,
                        imgPath: value.img_path,
                        imgCrc: value.img_crc,
                        description: value.description,
                        inventory: value.inventory,
                        status: 1,
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
                });
            }
            const dat = response.data.dt;
            const data = Object.assign({}, response.data.dt, { categories: lstCategory, items: lstItem, imageHost: dat.img_host, lastUpdate: dat.last_update });
            const res = Object.assign({}, response.data, { dt: data });
            resolve(res);
        }
        catch (error) {
            reject(error);
        }
    }));
}
exports.getListItemFood = getListItemFood;
