export interface Series {

  /**
   * Unique ID of the entry.
   */
  id: string;

  /**
   * Name of the collection
   */
  name: string;


  /**
   * Image of the collection
   */
  image?: string;

  /**
   * Starting year of collection
   */
  start?: Date;

  /**
   * Final year of collection.
   *
   */
  end?: Date;
}
