import { Figure } from "src/entity/figure";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class FigureProperty {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Figure, figure => figure.properties, {onDelete:'CASCADE'})
  figure: Figure;

  @Column()
  name: string;

  @Column()
  value: string;

}
