import { Collectable, CollectableState } from "src/entity";
import { Collection } from "src/entity/collection";
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
  highlight: boolean;

  @OneToMany(type => FigureAccessory, accessory => accessory.figure, {cascade: true, eager: true})
  accessories: FigureAccessory[];

  @OneToMany(type => FigureProperty, property => property.figure, {cascade: true, eager: true})
  properties: FigureProperty[];

  @ManyToMany(type => Collection, collection => collection.figures)
  collections: Collection[];

  /**
   * Return the current collection status of the figure.
   */
  get status(): CollectableState {

    const accessories = this.accessories ? this.accessories.length : 0;
    const accessoriesCollected = this.accessories ? this.accessories.filter(accessory => accessory.collected).length : 0;

    if (!this.collected) {
      return CollectableState.UNOWNED;
    } else if(accessoriesCollected !== accessories) {
      return CollectableState.INCOMPLETE;
    } else {
      return CollectableState.COMPLETE;
    }

  }

}
