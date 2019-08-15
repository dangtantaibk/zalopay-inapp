"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemDTO {
    constructor(self) {
        if (self) {
            this.itemId = self.itemId;
            this.itemName = self.itemName;
            this.itemCode = self.itemCode;
            this.price = self.price;
            this.imgPath = self.imgPath;
            this.imgCrc = self.imgCrc;
            this.description = self.description;
            this.inventory = self.inventory;
            this.status = self.status;
            this.createBy = self.createBy;
            this.createDate = self.createDate;
            this.barcode = self.barcode;
            this.modifiedBy = self.modifiedBy;
            this.modifiedDateTime = self.modifiedDateTime;
            this.order = self.order;
            this.originalPrice = self.originalPrice;
            this.promotionType = self.promotionType;
            this.promotionId = self.promotionId;
            this.cateMask = self.cateMask;
            this.printerMask = self.printerMask;
            this.kitchenAreaId = self.kitchenAreaId;
        }
    }
}
exports.ItemDTO = ItemDTO;
