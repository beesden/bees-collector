import { Collectable, CollectableState } from "src/entity";
import { Collection } from "src/entity/collection";
import { CollectionItem } from "src/entity/collection-item";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm/browser";

@Entity()
export class Figure extends Collectable {

  @Column({nullable: true})
  series: string;

  @Column({nullable: true})
  range: string;

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

  get collections(): Collection[] {
    return this.items ? this.items.map(item => item.collection) : [];
  }

  get collectedAccessories(): number {
    return this.accessories ? this.accessories.filter(accessory => accessory.collected).length : 0;
  }

  /**
   * Return the current collection status of the figure.
   */
  get status(): CollectableState {

    const accessories = this.accessories ? this.accessories.length : 0;

    if (!this.collected) {
      return CollectableState.UNOWNED;
    } else if(this.collectedAccessories !== accessories) {
      return CollectableState.INCOMPLETE;
    } else {
      return CollectableState.COMPLETE;
    }

  }

}
