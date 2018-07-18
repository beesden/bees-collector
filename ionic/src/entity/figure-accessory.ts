import { Collection } from "src/entity/collection";
import { Collectable } from "src/entity/collectable";
import { Figure } from "src/entity/figure";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class FigureAccessory extends Collectable {

  @ManyToOne(type => Figure, figure => figure.accessories)
  figure: Figure;

}
