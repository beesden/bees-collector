import { Figure } from "src/entity/figure";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class FigureIssue {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(type => Figure, figure => figure.issues, {onDelete: 'CASCADE'})
  figure: Figure;

}
