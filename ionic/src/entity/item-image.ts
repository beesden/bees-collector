import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class ItemImage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  height: number;

  @Column()
  width: number;
}
