import { ItemImage } from "src/entity/item-image";
import { Column, CreateDateColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm/browser";

export enum CollectibleState {
  COMPLETE,
  INCOMPLETE,
  UNOWNED
}

export abstract class Collectible {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  variant: string;

  @Column({nullable: true})
  notes: string;

  @ManyToMany(type => ItemImage, {cascade: true, eager: true})
  @JoinTable()
  images: ItemImage[];

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

}
