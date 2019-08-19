"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiHistory = __importStar(require("../api/history"));
function getListInvoice(cm, dt) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield apiHistory.getListInvoice(cm, dt);
            const lstInvoice = [];
            if (response && response.data && response.data.dt && response.data.dt.listInvoice) {
                response.data.dt.listInvoice.map((value) => {
                    const invoice = {
                        invoiceId: value.invoice_id,
                        invoiceCode: value.invoice_code,
                        invoiceNo: value.invoice_no,
                        amount: value.amount,
                        amountGross: value.amount_gross,
                        createDateTime: value.created_date_time,
                        paymentStatus: value.payment_status,
                        paymentMethod: value.payment_method,
                        zptranstoken: value.zptranstoken,
                        paymentDateTime: value.payment_date_time,
                        staffId: value.staff_id,
                        zptransid: value.zptransid,
                        auditStatus: value.audit_status,
                        auditBy: value.audit_by,
                        auditDateTime: value.audit_date_time,
                        machineName: value.machine_name
                    };
                    lstInvoice.push(invoice);
                });
            }
            const dat = response.data.dt;
            const data = {
                length: dat.length,
                listInvoice: lstInvoice,
            };
            const res = Object.assign({}, response.data, { dt: data });
            resolve(res);
        }
        catch (error) {
            reject(error);
        }
    }));
}
exports.getListInvoice = getListInvoice;
