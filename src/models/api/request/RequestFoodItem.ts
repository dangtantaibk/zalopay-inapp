
export class RequestFoodItem {
  // tslint:disable-next-line:variable-name
  public item_status: number = 0;
  // tslint:disable-next-line:variable-name
  public merchant_code: string = "";

  constructor(self?: RequestFoodItem) {
    if (self) {
      this.item_status = self.item_status;
      this.merchant_code = self.merchant_code;
    }
  }

}