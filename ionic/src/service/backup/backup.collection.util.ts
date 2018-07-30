import { Injectable } from '@angular/core';
import { Collection } from "src/entity/collection";
import { CollectionItem } from "src/entity/collection-item";
import { Figure } from "src/entity/figure";
import { Image } from "src/entity/image";

@Injectable()
export class BackupCollectionUtil {

  fromCollection(collection: Collection): CollectionData {
    return {
      id: collection.id,
      name: collection.name,
      series: collection.series,
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
    collection.series = data.series;
    collection.description = data.description;

    collection.images = data.images.map(url => {
      const image = new Image();
      image.url = url;
      return image;
    });

    collection.items = [];

    data.figures.forEach((figureId, idx) => {
      const item = new CollectionItem();
      item.figure = figures.find(figure => figure.id === figureId);
      item.idx = idx;

      if (item.figure) {
        collection.items.push(item);
      }
    });

    return collection;

  }

}
