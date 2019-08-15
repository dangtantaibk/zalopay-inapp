"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryDTO {
    constructor(self) {
        if (self) {
            this.categoryId = self.categoryId;
            this.categoryName = self.categoryName;
            this.categoryValue = self.categoryValue;
            this.categoryType = self.categoryType;
            this.order = self.order;
            this.status = self.status;
            this.parentId = self.parentId;
        }
    }
}
exports.CategoryDTO = CategoryDTO;
