"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestFoodItem {
    constructor(self) {
        this.item_status = 0;
        this.merchant_code = "";
        if (self) {
            this.item_status = self.item_status;
            this.merchant_code = self.merchant_code;
        }
    }
}
exports.RequestFoodItem = RequestFoodItem;
