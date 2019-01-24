import { Injectable } from "@angular/core";
import { FigureAccessory } from "src/app/entity/figure-accessory";
import { ConnectionService } from "src/app/service/connection.service";

@Injectable()
export class AccessoryService {


  constructor(connectionService: ConnectionService) {
    // this.repository = connectionService.connection.then(connection => connection.getRepository(FigureAccessory));
  }

  /**
   * Delete an accessory from the database.
   *
   * @param accessoryId
   */
  deleteOne(accessoryId: string) {
    return Promise.resolve(null);
    // return this.repository.then(repo => repo.delete(accessoryId));
  }

  /**
   * Fetch a single figure from the database.
   *
   * @param accessoryId
   */
  getOne(accessoryId: number): Promise<FigureAccessory> {
    return Promise.resolve(null);

    // return this.query.then(query => query
    //   .whereInIds(accessoryId)
    //   .getOne()
    // );

  }

  /**
   * Create / update an accessory.
   *
   * @param accessory
   */
  save(accessory: FigureAccessory): Promise<FigureAccessory> {
    return Promise.resolve(null);
    // return this.repository.then(repo => repo.save(accessory));
  }

}
