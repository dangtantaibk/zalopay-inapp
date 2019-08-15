export class ItemOptionDTO {
  public id?: number;
  public itemId?: number;
  public optionGroupId?: number;
  public optionGroupName: string = "";

  constructor(self?: ItemOptionDTO) {
    if (self) {
      this.id = self.id;
      this.itemId = self.itemId;
      this.optionGroupId = self.optionGroupId;
      this.optionGroupName = self.optionGroupName;
    }
  }
}