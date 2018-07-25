import { Injectable } from "@angular/core";
import { Collection, Figure, FigureAccessory } from "src/entity";
import { ConnectionService } from "src/service/connection.service";
import { Repository, SelectQueryBuilder } from "typeorm/browser";

export interface FigureRange {
  name: string;
  series: string;
  startYear: string;
  endYear: string;
  figures: number;
  owned: number;
}

export interface FigureFilters {
  range?: string;
  series?: string;
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
      .leftJoinAndSelect('figure.properties', 'property')
      .leftJoinAndSelect('figure.accessories', 'accessory')
      .leftJoinAndSelect('accessory.images', 'accessory_images')
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
     .leftJoinAndSelect('figure.items', 'item')
     .leftJoinAndSelect('item.collection', 'collection')
     .leftJoinAndSelect('collection.image', 'collection_image')
     .loadRelationCountAndMap("collection.length", "collection.items")
      .whereInIds(figureId)
      .getOne()
    );
  }

  /**
   * List all highlighted figures.
   */
  getHighlights(): Promise<Figure[]> {

    return this.query.then(query => {
        return query
          .andWhere('figure.highlight = 1')
          .getMany();
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
          query.andWhere(`series = "${filters.series}"`);
        }

        if (filters.range) {
          query.andWhere(`range = "${filters.range}"`);
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
        .addSelect(' MIN(f.release)', 'startYear')
        .addSelect(' MAX(f.release)', 'endYear')
        .addSelect('f.series', 'series')
        .addSelect('sum(f.collected = 1)', 'owned')
        .addGroupBy('f.range')
        .addGroupBy('f.series')
        .addOrderBy('series')
        .addOrderBy('startYear')
        .addOrderBy('range')
        .andWhere('range is not null')
        .andWhere('range != ""')
        .andWhere('series is not null')
        .andWhere('series != ""')
        .getRawMany()
        .then((data: FigureRange[]) => data);
    });

  }

  /**
   * Create / update a figure.
   *
   * @param figure
   */
  save(figure: Figure): Promise<Figure> {
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
      .getMany());

  }

  /**
   * Add an accessory to an existing figure.
   * If the figure already has the accessory, it won't be added again.
   *
   * @param figureId
   * @param accessory
   */
  addAccessoryToFigure(figureId: number, accessory: FigureAccessory): Promise<Figure> {

    return this.getOne(figureId).then(figure => {

      if (!figure.accessories) {
        figure.accessories = [];
      }

      if (!figure.accessories.find(entry => entry.id === accessory.id)) {
        figure.accessories.push(accessory);
        return this.save(figure);
      }

    });

  }

}
