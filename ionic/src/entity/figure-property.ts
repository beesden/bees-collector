import { Collection } from "src/entity/collection";
import { Collectable } from "src/entity/collectable";
import { Figure } from "src/entity/figure";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class FigureProperty {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Figure, figure => figure.properties)
  figure: Figure;

  @Column()
  name: string;

  @Column()
  value: string;

}
