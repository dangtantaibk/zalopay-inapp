"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemRelationDTO {
    constructor(self) {
        if (self) {
            this.id = self.id;
            this.itemId = self.itemId;
            this.categoryId = self.categoryId;
            this.relationId = self.relationId;
        }
    }
}
exports.ItemRelationDTO = ItemRelationDTO;
