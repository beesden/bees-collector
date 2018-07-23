import { Figure, Image } from "src/entity";
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

  length: number;

  /**
   * Return how many of the figures in the collection have been collected.
   */
  get collected(): number {
    return this.figures ? this.figures.filter(figure => figure.collected).length : 0;
  }

}
