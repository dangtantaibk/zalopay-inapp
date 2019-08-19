export class InvoiceDTO {
  public invoiceId?: number;
  public invoiceCode?: string;
  public invoiceNo?: number;
  public amount?: number;
  public amountGross?: number;
  public createDateTime?: string;
  public paymentStatus?: number;
  public paymentMethod?: number;
  public zptranstoken?: string;
  public paymentDateTime?: string;
  public staffId?: number;
  public zptransid?: string;
  public auditStatus?: number;
  public auditBy?: string;
  public auditDateTime?: string;
  public machineName?: string;

  constructor(self?: InvoiceDTO) {
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