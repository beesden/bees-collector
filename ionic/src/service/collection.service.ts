import { Injectable } from "@angular/core";
import { Collection } from "src/entity";
import { ConnectionService } from "src/service/connection.service";
import { Repository } from "typeorm/browser";

@Injectable()
export class CollectionService {

  private repository: Promise<Repository<Collection>>;

  constructor(connectionService: ConnectionService) {
    this.repository = connectionService.connection.then(connection => connection.getRepository(Collection));
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
    return this.repository.then(repo => repo.findOne(collectionId, {relations: ["images", 'properties', 'accessories']}));
  }

  /**
   * List all collections in the database.
   */
  getList(): Promise<Collection[]> {

    return this.repository.then(repo => {
      return repo.createQueryBuilder('collection')
        .leftJoinAndSelect('collection.images', 'images')
        .getMany();
    });

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
   *
   * Search results are returned based on both name and notes fields.
   */
  search(query: string): Promise<Collection[]> {

    return this.repository.then(repo => repo.createQueryBuilder('collection')
      .andWhere(`collection.name LIKE '%${query}%'`)
      .orWhere(`collection.notes LIKE '%${query}%'`)
      .getMany())

  }

}
