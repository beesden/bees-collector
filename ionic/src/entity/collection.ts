import { Figure } from "src/entity/figure";
import { Image } from "src/entity/image";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Collection {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @OneToOne(type => Image, {cascade: true, eager: true})
  @JoinColumn()
  image: Image;

  @ManyToMany(type => Figure, figure => figure.collections)
  @JoinTable()
  figures: Figure[];

  /**
   * Return how many of the figures in the collection have been collected.
   */
  get collected(): number {
    return this.figures ? this.figures.filter(figure => figure.collected).length : 0;
  }

  /**
   * Return the length of the figures in the collection..
   */
  get length(): number {
    return this.figures ? this.figures.length : 0;
  }

}
