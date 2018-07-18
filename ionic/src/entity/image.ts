import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Image {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
