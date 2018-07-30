import { Image } from "src/entity/image";
import { Column, CreateDateColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm/browser";

export enum CollectableState {
  COMPLETE,
  INCOMPLETE,
  UNOWNED
}

export abstract class Collectable {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  variant: string;

  @Column({nullable: true})
  notes: string;

  @ManyToMany(type => Image, {cascade: true, eager: true})
  @JoinTable()
  images: Image[];

  @Column({nullable: true})
  collected: boolean;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

}
