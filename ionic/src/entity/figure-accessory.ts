import { Collectible } from "src/entity/collectible";
import { Figure } from "src/entity/figure";
import { Entity, ManyToOne } from "typeorm/browser";

@Entity()
export class FigureAccessory extends Collectible {

  @ManyToOne(type => Figure, figure => figure.accessories, {onDelete: 'CASCADE'})
  figure: Figure;

}
