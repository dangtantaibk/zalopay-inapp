"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryDTO_1 = require("./CategoryDTO");
const ItemDTO_1 = require("./ItemDTO");
const ItemRelationDTO_1 = require("./ItemRelationDTO");
const ItemOptionDTO_1 = require("./ItemOptionDTO");
class FoodItemDTO {
    constructor(self) {
        if (self) {
            this.categories = self.categories ? self.categories.map(value => new CategoryDTO_1.CategoryDTO(value)) : Array();
            this.items = self.items ? self.items.map(value => new ItemDTO_1.ItemDTO(value)) : Array();
            this.relation = self.relation ? self.relation.map(value => new ItemRelationDTO_1.ItemRelationDTO(value)) : Array();
            this.option = self.option ? self.option.map(value => new ItemOptionDTO_1.ItemOptionDTO(value)) : Array();
            this.imageHost = self.imageHost;
            this.lastUpdate = self.lastUpdate;
        }
    }
}
exports.FoodItemDTO = FoodItemDTO;
