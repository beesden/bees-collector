import { Collection, Figure } from "src/entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm/browser";

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
