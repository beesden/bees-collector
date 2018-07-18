import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser";
import { Collection } from "src/entity/collection";
import { Image } from "src/entity/image";

abstract class Collectable {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  notes: string;

  @ManyToMany(type => Image, {cascade: true})
  @JoinTable()
  images: Image[];

  @Column({nullable: true})
  collected: boolean;

}

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

@Entity()
export class FigureAccessory extends Collectable {

  @ManyToOne(type => Figure, figure => figure.accessories)
  figure: Figure;

}
