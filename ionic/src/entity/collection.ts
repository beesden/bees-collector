import { CollectionItem } from "src/entity/collection-item";
import { Figure } from "src/entity/figure";
import { ItemImage } from "src/entity/item-image";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Collection {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  series: string;

  @Column({nullable: true})
  description: string;

  @ManyToMany(type => ItemImage, {cascade: true, eager: true})
  @JoinTable()
  images: ItemImage[];

  @OneToMany(type => CollectionItem, item => item.collection, {cascade: true, eager: true})
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
