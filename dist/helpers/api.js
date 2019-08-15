"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("./axios"));
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
function setAuthorizationHeader(token, type) {
    axios_1.default.defaults.headers.common.Authorization = `${type} ${token}`;
}
exports.setAuthorizationHeader = setAuthorizationHeader;
function handlingErrors(error) {
    let message;
    let status;
    try {
        if (error.response) {
            console.log("API_ERROR", error.response);
            message = error.response.data.description;
            status = error.response.status;
        }
        else {
            message = error.message;
        }
    }
    catch (e) {
        message = e.message;
    }
    return new ApiError(status, message);
}
exports.handlingErrors = handlingErrors;
exports.default = (url, method, data, headers) => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.request({
                data,
                headers: Object.assign({}, axios_1.default.defaults.headers.common, headers),
                method,
                url
            });
            resolve({ data: response.data });
        }
        catch (e) {
            reject(handlingErrors(e));
        }
    }));
};
