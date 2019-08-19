"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvoiceDTO_1 = require("./InvoiceDTO");
class InvoiceListDTO {
    constructor(self) {
        if (self) {
            this.length = self.length;
            this.listInvoice = self.listInvoice ? self.listInvoice.map(value => new InvoiceDTO_1.InvoiceDTO(value)) : Array();
        }
    }
}
exports.InvoiceListDTO = InvoiceListDTO;
