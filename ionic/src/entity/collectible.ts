import { ItemImage } from "src/entity/item-image";
import { Tag } from "src/entity/tag";
import { Column, CreateDateColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm/browser";

export enum CollectibleState {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
  DAMAGED = 'damaged',
  UNOWNED = 'unowned'
}

export abstract class Collectible {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  variant: string;

  @Column({nullable: true})
  notes: string;

  @ManyToMany(type => ItemImage, {cascade: true, eager: true})
  @JoinTable()
  images: ItemImage[];

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToMany(type => Tag, tag => tag.figure, {cascade: true, eager: true})
  tags: Tag[];

  @Column({nullable: true})
  collected: boolean;

  @Column({nullable: true})
  damaged: boolean;

  @Column({nullable: true})
  incomplete: boolean;

  /**
   * Return the current collection status of the figure.
   */
  get status(): CollectibleState {

    if (!this.collected) {
      return CollectibleState.UNOWNED;
    } else if (this.incomplete) {
      return CollectibleState.INCOMPLETE;
    } else if (this.damaged) {
      return CollectibleState.DAMAGED;
    } else {
      return CollectibleState.COMPLETE;
    }

  }

  /**
   * Return appropriate text for the current status.
   */
  get statusText(): string {
    switch (this.status) {
      case CollectibleState.COMPLETE:
        return 'Complete';
      case CollectibleState.INCOMPLETE:
        return 'Incomplete';
      case CollectibleState.DAMAGED:
        return 'Damaged';
      case CollectibleState.UNOWNED:
        return 'Not Owned';
      default:
        return '???';
    }
  }

}
