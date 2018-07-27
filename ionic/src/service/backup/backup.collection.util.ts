import { Injectable } from '@angular/core';
import { File } from "@ionic-native/file";
import { Collection, Figure, Image } from "src/entity";
import { CollectionItem } from "src/entity/collection-item";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { ConnectionService } from "src/service/connection.service";

@Injectable()
export class BackupCollectionUtil {

  fromCollection(collection: Collection): CollectionData {
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      images: (collection.images || []).map(image => image.url),
      figures: (collection.items || [])
        .filter(item => item.figure)
        .map(item => item.figure.id)
    };
  }

  toCollection(data: CollectionData, figures: Figure[]): Collection {

    const collection = new Collection();
    collection.id = data.id;
    collection.name = data.name;
    collection.description = data.description;

    collection.images = data.images.map(url => {
      const image = new Image();
      image.url = url;
      return image;
    });

    collection.items = [];

    data.figures.forEach(figureId => {
      const item = new CollectionItem();
      item.figure = figures.find(figure => figure.id === figureId);
      if (item.figure) {
        collection.items.push(item);
      }
    });

    return collection;

  }

}
