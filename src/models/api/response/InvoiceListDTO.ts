import {InvoiceDTO} from "./InvoiceDTO";

export class InvoiceListDTO {
  public length?: number;
  public listInvoice?: InvoiceDTO[];

  constructor(self?: InvoiceListDTO) {
    if (self) {
      this.length = self.length;
      this.listInvoice = self.listInvoice ? self.listInvoice.map(value => new InvoiceDTO(value)) : Array<InvoiceDTO>();
    }
  }
}