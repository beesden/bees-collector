import { CollectionItem } from "src/app/entity/collection-item";
import { Figure } from "src/app/entity/figure";
import { ItemImage } from "src/app/entity/item-image";

export class Collection {

  id: number;
  name: string;
  series: string;
  description: string;
  images: ItemImage[];
  items: CollectionItem[];
  length: number;

  /**
   * Return how many of the figures in the collection have been collected.
   */
  get collected(): number {
    return this.figures ? this.figures.filter(figure => figure.collected).length : 0;
  }

  /**
   * Get all items that have a figure.
   */
  get figures(): Figure[] {
    return this.items ? this.items
        .filter(item => item.figure)
        .sort((a, b) => a.idx - b.idx)
        .map(item => item.figure)
      : [];
  }

}
