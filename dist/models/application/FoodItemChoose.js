"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FoodItemChoose {
    constructor(self) {
        this.name = "";
        this.price = 0;
        this.number = 0;
        this.path = "";
        if (self) {
            this.name = self.name;
            this.price = self.price;
            this.number = self.number;
            this.path = self.path;
        }
    }
}
exports.FoodItemChoose = FoodItemChoose;
