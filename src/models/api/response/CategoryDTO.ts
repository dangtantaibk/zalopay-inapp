export class CategoryDTO {
  public categoryId?: number;
  public categoryName?: string;
  public categoryValue?: number;
  public categoryType?: number;
  public order?: number;
  public status?: number;
  public parentId?: number;

  constructor(self?: CategoryDTO) {
    if (self) {
      this.categoryId = self.categoryId;
      this.categoryName = self.categoryName;
      this.categoryValue = self.categoryValue;
      this.categoryType = self.categoryType;
      this.order = self.order;
      this.status = self.status;
      this.parentId = self.parentId;
    }
  }
}