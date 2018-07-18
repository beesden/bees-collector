import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Collection, Figure, Image } from "src/entity";
import { sampleData } from "src/entity/data";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Connection, createConnection } from "typeorm/browser";
import { CordovaConnectionOptions } from "typeorm/browser/driver/cordova/CordovaConnectionOptions";
import { SqljsConnectionOptions } from "typeorm/browser/driver/sqljs/SqljsConnectionOptions";

@Injectable()
export class ConnectionService {

  connection: Promise<Connection>;

  private populate(connection: Connection): Promise<Connection> {

    const figures: Figure[] = sampleData.map(item => {

      const figure = new Figure();
      figure.name = item.name;
      figure.series = item.series;
      figure.range = item.range;
      figure.collected = item.owned && item.condition;

      if (item.images) {
        figure.images = item.images.map(url => {
          const image = new Image();
          image.name = 'Image';
          image.url = url;
          return image;
        });
      }

      if (item.release) {
        figure.release = item.release.toISOString();
      }

      figure.properties = Object.entries(item.properties).map(entry => {
        const prop = new FigureProperty();
        prop.name = entry[0];
        prop.value = entry[1].toString();
        prop.figure = figure;
        return prop;
      });

      if (item.accessories) {
        figure.accessories = item.accessories.map(entry => {
          const prop = new FigureAccessory();
          prop.name = entry;
          prop.figure = figure;
          return prop;
        });
      }

      return figure;
    });

    const collection = new Collection();
    collection.name = 'Last 17';
    collection.images = [];
    collection.images.push(new Image());
    collection.images[0].url = 'https://assets.catawiki.nl/assets/2017/12/12/e/7/8/e788e550-718b-4afe-81eb-ad4798f7ebfe.jpg';
    collection.images[0].name = 'Cover';

    const figureRepo = connection.getRepository(Figure);
    const collectionRepo = connection.getRepository(Collection);

    return figureRepo.clear()
      .then(() => figureRepo.save(figures))
      .then(() => collectionRepo.clear())
      .then(() => collectionRepo.save(collection))
      .then(() => connection);

  };

  constructor(platform: Platform) {

    const entities = [
      Collection,
      Figure,
      FigureAccessory,
      FigureProperty,
      Image
    ];

    if (platform.is('cordova')) {
      const connection: CordovaConnectionOptions = {
        type: 'cordova',
        database: "collections.db",
        location: "default",
        entities,
        logging: true,
        synchronize: true
      };
      this.connection = createConnection(connection).then(connection => this.populate(connection));
    } else {
      const connection: SqljsConnectionOptions = {
        type: 'sqljs',
        location: "collections",
        autoSave: true,
        entities,
        logging: ['error'],
        synchronize: true
      };
      this.connection = createConnection(connection).then(connection => this.populate(connection));
    }

  }

}
