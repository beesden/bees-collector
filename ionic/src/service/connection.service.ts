import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Collection, Figure, Image } from "src/entity";
import { CollectionItem } from "src/entity/collection-item";
import { sampleData } from "src/entity/data";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
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

    if (platform.is('cordova')) {

      const connection: CordovaConnectionOptions = {
        type: 'cordova',
        database: "collections.db",
        location: "default",
        entities,
        logging: ['error'],
        synchronize: true
      };

      this.connection = platform.ready()
        .then(() => createConnection(connection))
        .then(connection => this.populate(connection));

    } else {

      const connection: SqljsConnectionOptions = {
        type: 'sqljs',
        location: "collections",
        autoSave: true,
        entities,
        logging: ['error'],
        synchronize: true
      };

      this.connection = platform.ready()
        .then(() => createConnection(connection))
        .then(connection => this.populate(connection));

    }

  }

  /**
   * Temp population script for debugging
   * @param {Connection} connection
   * @returns {Promise<Connection>}
   */
  private populate(connection: Connection): Promise<Connection> {

    if (localStorage.getItem('dataLoaded') === 'true') {
      return Promise.resolve(connection);
    }

    const figures: Figure[] = sampleData.map(item => {

      const figure = new Figure();
      figure.name = item.name;
      figure.series = 'Vintage Star Wars';
      figure.range = item.range;
      figure.variant = item.variant;

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

      figure.manufacturer = 'Kenner';

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
          prop.name = entry.name;
          prop.notes = entry.info;
          prop.figure = figure;
          return prop;
        });
      }

      return figure;
    });

    const figureRepo = connection.getRepository(Figure);
    const collectionRepo = connection.getRepository(Collection);

    return collectionRepo.clear()
      .then(() => figureRepo.clear())
      .then(() => figureRepo.save(figures))
      .then(figures => {

        const collection = new Collection();
        collection.name = 'Last 17';
        collection.images = [new Image()];
        collection.images[0].url = 'https://assets.catawiki.nl/assets/2017/12/12/e/7/8/e788e550-718b-4afe-81eb-ad4798f7ebfe.jpg';
        collection.images[0].name = 'Cover';

        const collection2 = new Collection();
        collection2.name = 'Kenner';
        collection2.images = [new Image()];
        collection2.images[0].url = 'http://i161.photobucket.com/albums/t222/cocofstar/early_bird_display_with_fig.jpg';
        collection2.images[0].name = 'Cover';

        const collection3 = new Collection();
        collection3.name = 'Droids';
        collection3.images = [new Image()];
        collection3.images[0].url = 'http://news.toyark.com/wp-content/uploads/sites/4/2013/10/Star-Wars-Jumbo-Kenner-Droid-Special-Set-056.jpg';
        collection3.images[0].name = 'Cover';

        collectionRepo.save([collection, collection2, collection3]);
      })
      .then(() => localStorage.setItem('dataLoaded', 'true'))
      .then(() => connection);

  }

}
