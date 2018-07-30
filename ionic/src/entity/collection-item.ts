import { Collection } from "src/entity/collection";
import { Figure } from "src/entity/figure";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class CollectionItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  idx: number;

  @ManyToOne(type => Figure, {eager: true})
  figure: Figure;

  @ManyToOne(type => Collection, collection => collection.items)
  collection: Collection;

}
