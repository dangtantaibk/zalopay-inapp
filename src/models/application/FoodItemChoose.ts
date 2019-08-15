
export class FoodItemChoose {
  public name: string = "";
  public price: number = 0;
  public number: number = 0;
  public path: string = "";

  constructor(self?: FoodItemChoose) {
    if (self) {
      this.name = self.name;
      this.price = self.price;
      this.number = self.number;
      this.path = self.path;
    }
  }

}