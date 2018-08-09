import { Figure } from "src/entity/figure";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class FigureAccessory {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  variant: string;

  @Column({nullable: true})
  notes: string;

  @ManyToOne(type => Figure, figure => figure.accessories, {onDelete: 'CASCADE'})
  figure: Figure;

}
