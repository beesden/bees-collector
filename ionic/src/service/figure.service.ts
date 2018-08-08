import { Injectable } from "@angular/core";
import { CollectionItem } from "src/entity/collection-item";
import { Figure } from "src/entity/figure";
import { FigureAccessory } from "src/entity/figure-accessory";
import { ConnectionService } from "src/service/connection.service";
import { Repository, SelectQueryBuilder } from "typeorm/browser";

@Injectable()
export class FigureService {

  private repository: Promise<Repository<Figure>>;

  constructor(private connectionService: ConnectionService) {
    this.repository = connectionService.connection.then(connection => connection.getRepository(Figure));
  }

  private get query(): Promise<SelectQueryBuilder<Figure>> {

    return this.repository.then(repo => repo.createQueryBuilder('figure')
      .leftJoinAndSelect('figure.images', 'images')
    );

  }

  /**
   * Delete a figure from the database and remove from any collections.
   *
   * @param figureId
   */
  deleteOne(figureId: string) {

    return this.connectionService.connection.then(connection => connection.getRepository(CollectionItem)
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.figure', 'figure')
      .where('figure.id = :id', {id: figureId})
      .getMany()
      .then(items => connection.getRepository(CollectionItem).remove(items))
      .then(() => this.repository.then(repo => repo.delete(figureId)))
    );

  }

  /**
   * Fetch a single figure from the database.
   *
   * @param figureId
   */
  getOne(figureId: number): Promise<Figure> {

    return this.query.then(query => query
      .leftJoinAndSelect('figure.properties', 'property')
      .leftJoinAndSelect('figure.tags', 'tag')
      .leftJoinAndSelect('figure.accessories', 'accessory')
      .leftJoinAndSelect('accessory.images', 'accessory_images')
      .leftJoinAndSelect('figure.items', 'item')
      .leftJoinAndSelect('item.collection', 'collection')
      .leftJoinAndSelect('collection.images', 'collection_image')
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
   */
  getList(count: number, page: number): Promise<[Figure[], number]> {

    return this.query.then(query => {

      query = query.orderBy('figure.name');

      if (count) {
        query = query.take(count);
      }

      if (page) {
        query = query.skip(page * count);
      }

      return query.getManyAndCount();
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
  search(queryString: string, count: number, page: number): Promise<[Figure[], number]> {

    return this.query.then(query => query
      .andWhere(`figure.name LIKE '%${queryString}%'`)
      .orWhere(`figure.variant LIKE '%${queryString}%'`)
      .orWhere(`figure.notes LIKE '%${queryString}%'`)
      .skip(count * page)
      .take(count)
      .getManyAndCount());

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
