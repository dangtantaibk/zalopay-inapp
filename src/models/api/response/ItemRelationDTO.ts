export class ItemRelationDTO {
  public id?: number;
  public itemId?: number;
  public categoryId?: number;
  public relationId?: number;

  constructor(self?: ItemRelationDTO) {
    if (self) {
      this.id = self.id;
      this.itemId = self.itemId;
      this.categoryId = self.categoryId;
      this.relationId = self.relationId;
    }
  }
}