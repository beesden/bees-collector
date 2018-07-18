import { Injectable } from "@angular/core";
import { Figure } from "src/entity";
import { ConnectionService } from "src/service/connection.service";
import { Repository } from "typeorm/browser";

export interface FigureRange {
  name: string;
  series: string;
  year: string;
  figures: number;
  owned: number;
}

@Injectable()
export class FigureService {

  private repository: Promise<Repository<Figure>>;

  constructor(connectionService: ConnectionService) {
    this.repository = connectionService.connection.then(connection => connection.getRepository(Figure));
  }

  /**
   * Delete a figure from the database.
   *
   * @param figureId
   */
  deleteOne(figureId: number) {
    return this.repository.then(repo => repo.delete(figureId));
  }

  /**
   * Fetch a single figure from the database.
   *
   * @param figureId
   */
  getOne(figureId: number): Promise<Figure> {
    return this.repository.then(repo => repo.findOne(figureId, {relations: ["images", 'properties', 'accessories']}));
  }

  /**
   * List all figures in the database.
   *
   * @param filters
   * @param filters.range
   */
  getList(filters: { range?: FigureRange } = {}): Promise<Figure[]> {

    return this.repository.then(repo => {
      const query = repo.createQueryBuilder('figure')
        .leftJoinAndSelect('figure.images', 'images')
        .leftJoinAndSelect('figure.properties', 'properties')
        .leftJoinAndSelect('figure.accessories', 'accessories');

      if (filters.range) {
        query
          .andWhere(`series = "${filters.range.series}"`)
          .andWhere(`range = "${filters.range.name}"`)
      }

      return query.getMany();
    });

  }

  /**
   * Get a list of all the distinct figure ranges.
   */
  getRanges(): Promise<FigureRange[]> {

    return this.repository.then(repo => {
      return repo.createQueryBuilder('f')
        .select('count(*)', 'figures')
        .addSelect('f.range', 'name')
        .addSelect(' MIN(f.release)', 'year')
        .addSelect('f.series', 'series')
        .addSelect('sum(f.collected = 1)', 'owned')
        .addGroupBy('f.range')
        .addGroupBy('f.series')
        .addOrderBy('series')
        .addOrderBy('year')
        .addOrderBy('range')
        .getRawMany()
        .then((data: FigureRange[]) => data);
    });

  }

  /**
   * Create / update a figure.
   *
   * @param figure
   */
  saveFigure(figure?: Figure): Promise<Figure> {

    return this.repository.then(repo => repo.save(figure));

  }

  /**
   * Search for figures by query string.
   *
   * Search results are returned based on both name and notes fields.
   */
  search(query: string): Promise<Figure[]> {

    return this.repository.then(repo => repo.createQueryBuilder('figure')
      .andWhere(`figure.name LIKE '%${query}%'`)
      .orWhere(`figure.notes LIKE '%${query}%'`)
      .getMany())

  }

}
