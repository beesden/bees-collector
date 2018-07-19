import { Image } from "src/entity/image";
import { Column, CreateDateColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm/browser";

export abstract class Collectable {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
