import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Collection } from "./collection";

// todo  -remove once device testing starts

const sampelData: Collection[] = [
  {
    id: 'ewoks',
    name: 'Kenner Ewoks',
    image: 'http://theswca.com/images-boots/bootleg-scary-ewok-3.jpg'
  }
];

@Injectable()
export class CollectionService {

  constructor(private sqlite: SQLite) {
  }

  /**
   * Create a new DB instance.
   */
  private create(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'collection.db', location: 'default'}).then((db: SQLiteObject) => {
      // noinspection JSIgnoredPromiseFromCall
      db.executeSql(`CREATE TABLE IF NOT EXISTS COLLECTIONS (NAME, START)`);
      return db;
    });

  }

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  getOne(range?: string): Promise<Collection[]> {
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
  getList(range?: string): Promise<Collection[]> {
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
  update(figure?: Collection): Promise<Collection[]> {

    const query = `UPDATE FIGURES SET name=${figure.name} WHERE ID=${figure.id}`;
    console.log(query);

    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query));
  }


}
