import { Injectable } from "@angular/core";
import { Collection } from "src/app/entity/collection";
import { Figure } from "src/app/entity/figure";
import { ConnectionService } from "src/app/service/connection.service";

@Injectable()
export class CollectionService {

  constructor(connectionService: ConnectionService) {
    // this.repository = connectionService.connection.then(connection => connection.getRepository(Collection));
  }
  //
  // private get query(): Promise<SelectQueryBuilder<Collection>> {
  //
  //   return this.repository.then(repo => repo.createQueryBuilder('collection')
  //     .leftJoinAndSelect('collection.images', 'image')
  //     .loadRelationCountAndMap("collection.length", "collection.items")
  //   );
  //
  // }

  /**
   * Delete a collection from the database.
   *
   * @param collectionId
   */
  deleteOne(collectionId: number): Promise<void> {
    return Promise.resolve(null);
    // return this.repository.then(repo => repo.delete(collectionId));
  }

  /**
   * Fetch a single collection from the database.
   *
   * @param collectionId
   */
  getOne(collectionId: number): Promise<Collection> {

    return Promise.resolve(null);

    // return this.query.then(query => query
    //   .leftJoinAndSelect('collection.items', 'item')
    //   .leftJoinAndSelect('item.figure', 'figure')
    //   .leftJoinAndSelect('figure.images', 'figure_images')
    //   .leftJoinAndSelect('figure.accessories', 'figure_accessories')
    //   .whereInIds(collectionId)
    //   .getOne()
    // );

  }

  /**
   * List all collections in the database.
   */
  getList(count?: number, page?: number): Promise<[Collection[], number]> {

    return Promise.reject('no collections');

    // return this.query.then(query => {
    //
    //     if (count) {
    //       query = query.take(count);
    //     }
    //
    //     if (page) {
    //       query = query.skip(page * count);
    //     }
    //
    //     return query.getManyAndCount();
    //
    //   }
    // );
  }

  /**
   * Create / update a collection.
   *
   * @param collection
   */
  saveCollection(collection ?: Collection): Promise<Collection> {
    return Promise.resolve(null);
    // return this.repository.then(repo => repo.save(collection));
  }

  /**
   * Add a figure to an existing collection.
   * If the figure is already in the collection, it won't be added again.
   *
   * @param collectionId
   * @param figure
   */
  addFigureToCollection(collectionId: number, figure: Figure): Promise<Collection> {

    return Promise.resolve(null);

  //   return this.getOne(collectionId).then(collection => {
  //
  //     if (!collection.figures.find(entry => entry.id === figure.id)) {
  //
  //       const item = new CollectionItem();
  //       item.figure = figure;
  //       item.idx = collection.items.length;
  //       collection.items.push(item);
  //
  //       return this.saveCollection(collection);
  //     }
  //
  //   });
  //
  }

}
