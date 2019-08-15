"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../helpers/api"));
function getListItemFood(cm, dt) {
    const url = `/item?cm=${cm}&dt=${JSON.stringify(dt)}`;
    return api_1.default(encodeURI(url), "GET");
}
exports.getListItemFood = getListItemFood;
