import { Figure } from "src/entity/figure";
import { Image } from "src/entity/image";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Collection {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @ManyToMany(type => Figure, {cascade: true})
  @JoinTable()
  figures: Figure[];

  @ManyToMany(type => Image, {cascade: true})
  @JoinTable()
  images: Image[];

}
