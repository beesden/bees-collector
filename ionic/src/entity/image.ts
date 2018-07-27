import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Image {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
