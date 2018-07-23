import { Injectable } from "@angular/core";
import { FigureAccessory } from "src/entity/figure-accessory";
import { ConnectionService } from "src/service/connection.service";
import { Repository, SelectQueryBuilder } from "typeorm/browser";

@Injectable()
export class AccessoryService {

  private repository: Promise<Repository<FigureAccessory>>;

  constructor(connectionService: ConnectionService) {
    this.repository = connectionService.connection.then(connection => connection.getRepository(FigureAccessory));
  }

  private get query(): Promise<SelectQueryBuilder<FigureAccessory>> {

    return this.repository.then(repo => repo.createQueryBuilder('accessory')
      .leftJoinAndSelect('accessory.images', 'images')
    );

  }

  /**
   * Delete an accessory from the database.
   *
   * @param accessoryId
   */
  deleteOne(accessoryId: number) {
    return this.repository.then(repo => repo.delete(accessoryId));
  }

  /**
   * Fetch a single figure from the database.
   *
   * @param accessoryId
   */
  getOne(accessoryId: number): Promise<FigureAccessory> {

    return this.query.then(query => query
      .whereInIds(accessoryId)
      .getOne()
    );

  }

  /**
   * Create / update an accessory.
   *
   * @param accessory
   */
  save(accessory: FigureAccessory): Promise<FigureAccessory> {
    return this.repository.then(repo => repo.save(accessory));
  }

}
