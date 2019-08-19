"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestInvoiceListOfPage {
    constructor(self) {
        this.merchant_code = "";
        if (self) {
            this.merchant_code = self.merchant_code;
            this.invoice_code = self.invoice_code;
            this.zp_trans_id = self.zp_trans_id;
            this.payment_status = self.payment_status;
            this.payment_method = self.payment_method;
            this.payment_date_time_from = self.payment_date_time_from;
            this.payment_date_time_to = self.payment_date_time_to;
            this.audit_status = self.audit_status;
            this.current_page = self.current_page;
            this.total_trans_per_page = self.total_trans_per_page;
        }
    }
}
exports.RequestInvoiceListOfPage = RequestInvoiceListOfPage;
