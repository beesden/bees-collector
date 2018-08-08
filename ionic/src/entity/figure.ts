import { Collectible, CollectibleState } from "src/entity/collectible";
import { Collection } from "src/entity/collection";
import { CollectionItem } from "src/entity/collection-item";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureIssue } from "src/entity/figure-issue";
import { FigureProperty } from "src/entity/figure-property";
import { Tag } from "src/entity/tag";
import { Column, Entity, OneToMany } from "typeorm/browser";

@Entity()
export class Figure extends Collectible {

  @Column({nullable: true})
  release: string;

  @Column({nullable: true})
  manufacturer: string;

  @Column({nullable: true})
  highlight: boolean;

  @OneToMany(type => FigureAccessory, accessory => accessory.figure, {cascade: true, eager: true})
  accessories: FigureAccessory[];

  @OneToMany(type => FigureProperty, property => property.figure, {cascade: true, eager: true})
  properties: FigureProperty[];

  @OneToMany(type => CollectionItem, item => item.figure)
  items: CollectionItem[];

  @OneToMany(type => FigureIssue, issue => issue.figure)
  issues: FigureIssue[];

  @OneToMany(type => Tag, tag => tag.figure, {cascade: true, eager: true})
  tags: Tag[];

  @Column({nullable: true})
  collected: boolean;

  get collections(): Collection[] {
    return this.items ? this.items.map(item => item.collection) : [];
  }

  /**
   * Return the current collection status of the figure.
   */
  get status(): CollectibleState {

    if (!this.collected) {
      return CollectibleState.UNOWNED;
    } else if (this.issues && this.issues.length) {
      return CollectibleState.INCOMPLETE;
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
        return 'Owned';
      case CollectibleState.INCOMPLETE:
        return 'Partially Owned';
      case CollectibleState.UNOWNED:
        return 'Not Owned';
      default:
        return '???';
    }
  }

}
