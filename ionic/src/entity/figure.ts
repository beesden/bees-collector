import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser";
import { Collection } from "./collection";
import { Image } from "./image";

class Collectable {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  notes: string;

  @ManyToMany(type => Image, {cascade: true})
  images: Image[];

  @Column({nullable: true})
  owned: boolean;

  @Column({nullable: true})
  condition: boolean;

}

@Entity()
export class Figure extends Collectable {

  @Column({nullable: true})
  series: string;

  @ManyToMany(type => Collection, {cascade: true})
  collections: Collection[];

  @Column({nullable: true})
  range: string;

  @Column({nullable: true})
  release: Date;

  @OneToMany(type => FigureAccessory, accessory => accessory.figure)
  accessories: FigureAccessory[];

  @OneToMany(type => FigureProperty, property => property.figure)
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

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Figure, figure => figure.accessories)
  figure: Figure;

}
