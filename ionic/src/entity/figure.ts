import { Collectable } from "src/entity/collectable";
import { Collection } from "src/entity/collection";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm/browser";

export enum FigureState {
  COMPLETE,
  INCOMPLETE,
  UNOWNED
}

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
  get status(): FigureState {

    const accessoriesCollected = this.accessories ? this.accessories.filter(accessory => accessory.collected) : [];

    if (!this.collected) {
      return FigureState.UNOWNED;
    } else if(accessoriesCollected.length !== this.accessories.length) {
      return FigureState.INCOMPLETE;
    } else {
      return FigureState.COMPLETE;
    }

  }

  /**
   * Return appropriate text for the current status.
   */
  get statusText(): string {
    switch (this.status) {
      case FigureState.COMPLETE:
        return 'Complete';
      case FigureState.INCOMPLETE:
        return 'Incomplete';
      case FigureState.UNOWNED:
        return 'Unowned';
    }
  }

}
