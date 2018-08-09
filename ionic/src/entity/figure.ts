import { Collectible } from "src/entity/collectible";
import { Collection } from "src/entity/collection";
import { CollectionItem } from "src/entity/collection-item";
import { FigureAccessory } from "src/entity/figure-accessory";
import { Column, Entity, OneToMany } from "typeorm/browser";

@Entity()
export class Figure extends Collectible {

  @Column({nullable: true})
  release: string;

  @Column({nullable: true})
  manufacturer: string;

  @Column({nullable: true})
  highlight: boolean;

  @OneToMany(type => FigureAccessory, accessory => accessory.figure, {cascade: true, eager: true})
  accessories: FigureAccessory[];

  @OneToMany(type => CollectionItem, item => item.figure)
  items: CollectionItem[];

  get collections(): Collection[] {
    return this.items ? this.items.map(item => item.collection) : [];
  }

}
