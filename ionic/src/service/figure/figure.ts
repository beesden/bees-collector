import { Collection } from "../collection/collection";

export interface Figure {

  /**
   * Unique ID of the entry.
   */
  id: string;

  /**
   * Name of the figure
   *
   */
  name: string;

  /**
   * Name of the figure
   *
   */
  description?: string;

  /**
   * Figure collection name.
   * e.g. 'Star Wars'
   *
   */
  series: string;

  /**
   * Range / collection name.
   * e.g. 'Power of the Force'
   *
   */
  range?: string;

  /**
   * Figure release date
   */
  release?: Date;

  /**
   * Figure collection ID.
   * e.g. 'Kenner Star Wars'
   */
  collection?: Collection[];

  /**
   * Figure images
   *
   */
  image?: string[];

  /**
   * Flag to indicate if the figure is owned.
   */
  owned?: boolean;

  /**
   * Flag to indicate if figure has all accessories.
   */
  accessories?: boolean;

  /**
   * Flag to indicate the figure / accessories are acceptable condition.
   */
  condition?: boolean;

  /**
   * Additional properties, e.g. year, wave, price estimate, comments
   */
  properties?: {};
}
