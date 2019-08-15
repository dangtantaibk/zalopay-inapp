export class ItemDTO {
  public itemId?: number;
  public itemName?: string;
  public itemCode?: string;
  public price?: number;
  public imgPath?: string;
  public imgCrc?: string;
  public description?: string;
  public inventory?: number;
  public status?: number;
  public createBy?: string;
  public createDate?: string;
  public barcode?: string;
  public modifiedBy?: string;
  public modifiedDateTime?: string;
  public order?: number;
  public originalPrice?: number;
  public promotionType?: number;
  public promotionId?: number;
  public cateMask?: number;
  public printerMask?: number;
  public kitchenAreaId?: number;

  constructor(self?: ItemDTO) {
    if (self) {
      this.itemId = self.itemId;
      this.itemName = self.itemName;
      this.itemCode = self.itemCode;
      this.price = self.price;
      this.imgPath = self.imgPath;
      this.imgCrc = self.imgCrc;
      this.description = self.description;
      this.inventory = self.inventory;
      this.status = self.status;
      this.createBy = self.createBy;
      this.createDate = self.createDate;
      this.barcode = self.barcode;
      this.modifiedBy = self.modifiedBy;
      this.modifiedDateTime = self.modifiedDateTime;
      this.order = self.order;
      this.originalPrice = self.originalPrice;
      this.promotionType = self.promotionType;
      this.promotionId = self.promotionId;
      this.cateMask = self.cateMask;
      this.printerMask = self.printerMask;
      this.kitchenAreaId = self.kitchenAreaId;
    }
  }
}