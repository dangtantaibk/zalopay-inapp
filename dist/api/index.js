"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const CREATE_ORDER_PATH = "http://zp.789.vn/CreateOrder.cshtml";
axios_1.default.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios_1.default.interceptors.response.use(response => {
    const { data } = response;
    const { code } = data;
    if (code === 1) {
        return data;
    }
    return Promise.reject(data);
}, error => {
    return Promise.reject(error);
});
const createOrder = params => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
    });
    return axios_1.default.post(CREATE_ORDER_PATH, formData);
};
exports.default = {
    createOrder
};
