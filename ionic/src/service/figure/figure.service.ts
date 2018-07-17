import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Connection, createConnection } from "typeorm/browser";
import { CordovaConnectionOptions } from "typeorm/browser/driver/cordova/CordovaConnectionOptions";
import { SqljsConnectionOptions } from "typeorm/browser/driver/sqljs/SqljsConnectionOptions";
import { Collection, Figure, FigureAccessory, FigureProperty, Image } from "src/entity";
import { sampleData } from "src/entity/data";
import { Series } from "src/service/series/series";

@Injectable()
export class FigureService {

  private database: Promise<Connection>;

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
      this.database = createConnection(connection);
    } else {
      const connection: SqljsConnectionOptions = {
        type: 'sqljs',
        location: "collections",
        autoSave: true,
        entities,
        logging: ['query', 'schema'],
        synchronize: true
      };
      this.database = createConnection(connection);
    }

    // Load sample data
    this.database.then(connection => {
      const figures: Figure[] = sampleData.map(item => {

        const figure = new Figure();
        figure.name = item.name;
        figure.series = item.series;
        figure.range = item.range;

        return figure;
      });

      const repo = connection.getRepository(Figure);
      repo.clear();
      repo.save(figures);
    });

  }

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  getOne(figureId?: number): Promise<Figure> {

    return this.database.then(connection => {
      const repo = connection.getRepository(Figure);
      return repo.findOne(figureId);
    });

  }

  /**
   * List all figures
   */
  getList(filters: { series?: Series } = {}): Promise<Figure[]> {

    return this.database.then(connection => {
      const repo = connection.getRepository(Figure);
      return repo.find();
    });

  }

  /**
   * List all figures
   *
   * @param figure figure to update
   */
  saveFigure(figure?: Figure): Promise<Figure> {

    return this.database.then(connection => {
      const repo = connection.getRepository(Figure);
      return repo.save(figure);
    });

  }

}
