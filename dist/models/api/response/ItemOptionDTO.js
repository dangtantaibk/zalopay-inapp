"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemOptionDTO {
    constructor(self) {
        this.optionGroupName = "";
        if (self) {
            this.id = self.id;
            this.itemId = self.itemId;
            this.optionGroupId = self.optionGroupId;
            this.optionGroupName = self.optionGroupName;
        }
    }
}
exports.ItemOptionDTO = ItemOptionDTO;
