import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Figure } from "../figure/figure";
import { Series } from "./series";

// todo  -remove once device testing starts

const sampelData: Series[] = [
  {
    id: 'startwars',
    name: 'Kenner Star Wars',
    image: 'https://starwarsblog.starwars.com/wp-content/uploads/2015/11/header-tallshort3.jpg',
    start: new Date(1977, 5, 5),
    end: new Date(1985, 5, 5),
  },
  {
    id: 'batman',
    name: 'Batman',
    start: new Date(1989, 5, 5),
  },
  {
    id: 'ghostbusters',
    name: 'Ghostbusters',
    start: new Date(1983, 5, 5),
  },
  {
    id: 'pogs',
    name: 'Pogs',
    start: new Date(1998, 5, 5),
  }
];

@Injectable()
export class SeriesService {

  constructor(private sqlite: SQLite) {
  }

  /**
   * Create a new DB instance.
   */
  private create(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'collection.db', location: 'default'}).then((db: SQLiteObject) => {
      db.executeSql(`CREATE TABLE IF NOT EXISTS COLLECTIONS (NAME, START)`);
      return db;
    });

  };

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  getOne(range?: string): Promise<Series[]> {
    let query = `SELECT * FROM FIGURES`;
    if (range) {
      query += `WHERE RANGE = ${range}`;
    }
    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query))
      .catch(() => sampelData);

  }

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  getList(range?: string): Promise<Series[]> {
    let query = `SELECT * FROM FIGURES`;
    if (range) {
      query += `WHERE RANGE = ${range}`;
    }
    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query))
      .catch(() => sampelData);

  }

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  update(figure?: Series): Promise<Series[]> {

    let query = `UPDATE FIGURES SET name=${figure.name} WHERE ID=${figure.id}`;
    console.log(query);

    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query))
  }


}
