import { Injectable } from "@angular/core";
import { Figure } from "src/entity";
import { ConnectionService } from "src/service/connection.service";
import { Repository, SelectQueryBuilder } from "typeorm/browser";

export interface FigureRange {
  name: string;
  series: string;
  year: string;
  figures: number;
  owned: number;
}

export interface FigureFilters {
  range?: string;
  series?: string;
  sort?: string;
}

@Injectable()
export class FigureService {

  private repository: Promise<Repository<Figure>>;

  constructor(connectionService: ConnectionService) {
    this.repository = connectionService.connection.then(connection => connection.getRepository(Figure));
  }

  private get query(): Promise<SelectQueryBuilder<Figure>> {

    return this.repository.then(repo => repo.createQueryBuilder('figure')
      .leftJoinAndSelect('figure.images', 'images')
      .leftJoinAndSelect('figure.properties', 'properties')
      .leftJoinAndSelect('figure.accessories', 'accessories')
    );

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

    return this.query.then(query => query
      .leftJoinAndSelect('figure.collections', 'collection')
      .leftJoinAndSelect('collection.image', 'collection_image')
      .loadRelationCountAndMap("collection.length", "collection.figures")
      .whereInIds(figureId)
      .getOne()
    );

  }

  /**
   * List all figures marked as 'favourite'.
   */
  getFavourites(): Promise<Figure[]> {

    return this.query.then(query => {
        query.andWhere('figure.favourite = 1')
        return query.getMany();
      }
    );

  }

  /**
   * List all figures in the database.
   *
   * @param filters
   */
  getList(filters: FigureFilters = {}): Promise<Figure[]> {

    return this.query.then(query => {

        if (filters.series) {
          query.andWhere(`series = "${filters.series}"`)
        }

        if (filters.range) {
          query.andWhere(`range = "${filters.range}"`)
        }

        return query.getMany();
      }
    );

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
  saveFigure(figure ?: Figure): Promise<Figure> {
    return this.repository.then(repo => repo.save(figure));
  }

  /**
   * Search for figures by query string.
   *
   * Search results are returned based on both name and notes fields.
   */
  search(queryString: string): Promise<Figure[]> {

    return this.query.then(query => query
      .andWhere(`figure.name LIKE '%${queryString}%'`)
      .orWhere(`figure.notes LIKE '%${queryString}%'`)
      .getMany())

  }

}
