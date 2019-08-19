
export class RequestInvoiceListOfPage {
  // tslint:disable-next-line:variable-name
  public merchant_code: string = "";
  // tslint:disable-next-line:variable-name
  public invoice_code?: string;
  // tslint:disable-next-line:variable-name
  public zp_trans_id?: string;
  // tslint:disable-next-line:variable-name
  public payment_status?: number;
  // tslint:disable-next-line:variable-name
  public payment_method?: number;
  // tslint:disable-next-line:variable-name
  public payment_date_time_from?: string;
  // tslint:disable-next-line:variable-name
  public payment_date_time_to?: string;
  // tslint:disable-next-line:variable-name
  public audit_status?: number;
  // tslint:disable-next-line:variable-name
  public current_page?: number;
  // tslint:disable-next-line:variable-name
  public total_trans_per_page?: number;

  constructor(self?: RequestInvoiceListOfPage) {
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