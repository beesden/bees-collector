import { Injectable } from "@angular/core";
import { Collection, Figure } from "src/entity";
import { ConnectionService } from "src/service/connection.service";
import { Repository, SelectQueryBuilder } from "typeorm/browser";

@Injectable()
export class CollectionService {

  private repository: Promise<Repository<Collection>>;

  constructor(connectionService: ConnectionService) {
    this.repository = connectionService.connection.then(connection => connection.getRepository(Collection));
  }

  private get query(): Promise<SelectQueryBuilder<Collection>> {

    return this.repository.then(repo => repo.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.image', 'image')
    );

  }

  /**
   * Delete a collection from the database.
   *
   * @param collectionId
   */
  deleteOne(collectionId: number) {
    return this.repository.then(repo => repo.delete(collectionId));
  }

  /**
   * Fetch a single collection from the database.
   *
   * @param collectionId
   */
  getOne(collectionId: number): Promise<Collection> {

    return this.query.then(query => query
      .leftJoinAndSelect('collection.figures', 'figures')
      .whereInIds(collectionId)
      .getOne()
    );

  }

  /**
   * List all collections in the database.
   */
  getList(): Promise<Collection[]> {
    return this.query.then(query => query.getMany());
  }

  /**
   * Create / update a collection.
   *
   * @param collection
   */
  saveCollection(collection ?: Collection): Promise<Collection> {
    return this.repository.then(repo => repo.save(collection));
  }

  /**
   * Search for collections by query string.
   */
  search(queryString: string): Promise<Collection[]> {

    return this.query.then(query => query
      .andWhere(`collection.name LIKE '%${queryString}%'`)
      .getMany())

  }

}
