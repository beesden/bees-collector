import { Collectable } from "src/entity/collectable";
import { Collection } from "src/entity/collection";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm/browser";


@Entity()
export class Figure extends Collectable {

  @Column({nullable: true})
  series: string;

  @ManyToMany(type => Collection, {cascade: true})
  @JoinTable()
  collections: Collection[];

  @Column({nullable: true})
  range: string;

  @Column({nullable: true})
  release: string;

  @OneToMany(type => FigureAccessory, accessory => accessory.figure, {cascade: true})
  accessories: FigureAccessory[];

  @OneToMany(type => FigureProperty, property => property.figure, {cascade: true})
  properties: FigureProperty[];
}
