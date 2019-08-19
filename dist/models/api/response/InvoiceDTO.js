"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvoiceDTO {
    constructor(self) {
        if (self) {
            this.invoiceId = self.invoiceId;
            this.invoiceCode = self.invoiceCode;
            this.invoiceNo = self.invoiceNo;
            this.amount = self.amount;
            this.amountGross = self.amountGross;
            this.createDateTime = self.createDateTime;
            this.paymentStatus = self.paymentStatus;
            this.paymentMethod = self.paymentMethod;
            this.zptranstoken = self.zptranstoken;
            this.paymentDateTime = self.paymentDateTime;
            this.staffId = self.staffId;
            this.zptransid = self.zptransid;
            this.auditStatus = self.auditStatus;
            this.auditBy = self.auditBy;
            this.auditDateTime = self.auditDateTime;
            this.machineName = self.machineName;
        }
    }
}
exports.InvoiceDTO = InvoiceDTO;
