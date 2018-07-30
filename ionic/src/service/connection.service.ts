import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Collection } from "src/entity/collection";
import { CollectionItem } from "src/entity/collection-item";
import { Figure } from "src/entity/figure";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Image } from "src/entity/image";
import { Connection, createConnection } from "typeorm/browser";
import { CordovaConnectionOptions } from "typeorm/browser/driver/cordova/CordovaConnectionOptions";
import { SqljsConnectionOptions } from "typeorm/browser/driver/sqljs/SqljsConnectionOptions";

@Injectable()
export class ConnectionService {

  connection: Promise<Connection>;

  constructor(platform: Platform) {

    const entities = [
      Figure,
      FigureAccessory,
      FigureProperty,
      Collection,
      CollectionItem,
      Image
    ];

    let connection: CordovaConnectionOptions | SqljsConnectionOptions;

    if (platform.is('cordova')) {

      connection = {
        type: 'cordova',
        database: "collections.db",
        location: "default",
        entities,
        logging: ['error'],
        synchronize: true
      };

    } else {

      connection = {
        type: 'sqljs',
        location: "collections",
        autoSave: true,
        entities,
        logging: ['error'],
        synchronize: true
      };


    }

    this.connection = platform.ready().then(() => createConnection(connection));

  }

}
