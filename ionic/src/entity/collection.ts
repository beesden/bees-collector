import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm/browser";
import { Figure } from "./figure";
import { Image } from "./image";

@Entity()
export class Collection {

  /**
   * Unique ID of the entry.
   */

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the figure
   *
   */
  @Column()
  name: string;

  /**
   * Name of the figure
   *
   */
  @Column({nullable: true})
  description?: string;

  @ManyToMany(type => Figure, {cascade: true})
  figures: Figure[];

  @ManyToMany(type => Image, {cascade: true})
  images: Image[];

}
