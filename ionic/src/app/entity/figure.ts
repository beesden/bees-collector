import { CollectibleState } from "src/app/entity/collectible";
import { Collection } from "src/app/entity/collection";
import { CollectionItem } from "src/app/entity/collection-item";
import { FigureAccessory } from "src/app/entity/figure-accessory";
import { ItemImage } from "src/app/entity/item-image";
import { Tag } from "src/app/entity/tag";

/**
 *
 */
export interface FigureData {

  id: string;
  name: string;
  variant: string;
  notes: string;
  images: ItemImage[];
  dateCreated: Date;
  dateUpdated: Date;
  tags: Tag[];
  collected: boolean;
  damaged: boolean;
  incomplete: boolean;
  release: string;
  manufacturer: string;
  highlight: boolean;

}

export class Figure {

  id: string;
  name: string;
  variant: string;
  notes: string;
  images: ItemImage[];
  dateCreated: Date;
  dateUpdated: Date;
  tags: Tag[];
  collected: boolean;
  damaged: boolean;
  incomplete: boolean;
  release: string;
  manufacturer: string;
  highlight: boolean;

  data: FigureData;
  accessories: FigureAccessory[];
  items: CollectionItem[];

  constructor(figure: FigureData) {
    this.data = figure;
  }

  /**
   * Return the current collection status of the figure.
   */
  get status(): CollectibleState {

    if (!this.collected) {
      return CollectibleState.UNOWNED;
    } else if (this.incomplete) {
      return CollectibleState.INCOMPLETE;
    } else if (this.damaged) {
      return CollectibleState.DAMAGED;
    } else {
      return CollectibleState.COMPLETE;
    }

  }

  /**
   * Return appropriate text for the current status.
   */
  get statusText(): string {
    switch (this.status) {
      case CollectibleState.COMPLETE:
        return 'Complete';
      case CollectibleState.INCOMPLETE:
        return 'Incomplete';
      case CollectibleState.DAMAGED:
        return 'Damaged';
      case CollectibleState.UNOWNED:
        return 'Not Owned';
      default:
        return '???';
    }
  }

  get collections(): Collection[] {
    return this.items ? this.items.map(item => item.collection) : [];
  }

}
