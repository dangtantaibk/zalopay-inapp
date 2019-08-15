import {CategoryDTO} from "./CategoryDTO";
import {ItemDTO} from "./ItemDTO";
import {ItemRelationDTO} from "./ItemRelationDTO";
import {ItemOptionDTO} from "./ItemOptionDTO";

export class FoodItemDTO {
  public categories?: CategoryDTO[];
  public items?: ItemDTO[];
  public relation?: ItemRelationDTO[];
  public option?: ItemOptionDTO[];
  public imageHost?: string;
  public lastUpdate?: number;

  constructor(self?: FoodItemDTO) {
    if (self) {
      this.categories = self.categories ? self.categories.map(value => new CategoryDTO(value)) : Array<CategoryDTO>();
      this.items = self.items ? self.items.map(value => new ItemDTO(value)) : Array<ItemDTO>();
      this.relation = self.relation ? self.relation.map(value => new ItemRelationDTO(value)) : Array<ItemRelationDTO>();
      this.option = self.option ? self.option.map(value => new ItemOptionDTO(value)) : Array<ItemOptionDTO>();
      this.imageHost = self.imageHost;
      this.lastUpdate = self.lastUpdate;
    }
  }
}