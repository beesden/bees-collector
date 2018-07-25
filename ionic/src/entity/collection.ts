import { Figure, Image } from "src/entity";
import { CollectionItem } from "src/entity/collection-item";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm/browser";

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

  @OneToMany(type => CollectionItem, item => item.collection, {cascade: true})
  items: CollectionItem[];

  length: number;

  /**
   * Return how many of the figures in the collection have been collected.
   */
  get collected(): number {
    return this.figures ? this.figures.filter(figure => figure.collected).length : 0;
  }

  /**
   * Get all items that have a figure.
   */
  get figures(): Figure[] {
    return this.items ? this.items
        .filter(item => item.figure)
        .sort((a, b) => a.idx - b.idx)
        .map(item => item.figure)
      : [];
  }

}
