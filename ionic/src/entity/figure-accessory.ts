import { CollectableState } from "src/entity";
import { Collectable } from "src/entity/collectable";
import { Figure } from "src/entity/figure";
import { Entity, ManyToOne } from "typeorm/browser";

@Entity()
export class FigureAccessory extends Collectable {

  @ManyToOne(type => Figure, figure => figure.accessories, {onDelete: 'CASCADE'})
  figure: Figure;

  /**
   * Return the current collection status of the accessory.
   */
  get status(): CollectableState {
    return this.collected ? CollectableState.COMPLETE : CollectableState.UNOWNED;
  }

}
