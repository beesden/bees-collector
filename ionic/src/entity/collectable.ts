import { Image } from "src/entity/image";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm/browser";

export abstract class Collectable {

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
