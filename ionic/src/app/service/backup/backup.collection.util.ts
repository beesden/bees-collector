import { Injectable } from '@angular/core';
import { Collection } from "src/app/entity/collection";
import { CollectionItem } from "src/app/entity/collection-item";
import { Figure } from "src/app/entity/figure";
import { ImageService } from "src/app/service/image.service";

@Injectable()
export class BackupCollectionUtil {

  constructor(private imageService: ImageService) {
  }

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

  toCollection(data: CollectionData, figures: Figure[]): Promise<Collection> {

    const collection = new Collection();
    collection.id = data.id;
    collection.name = data.name;
    collection.series = data.series;
    collection.description = data.description;

    collection.items = [];

    data.figures.forEach((figureId, idx) => {
      const item = new CollectionItem();
      item.figure = figures.find(figure => figure.id === figureId);
      item.idx = idx;

      if (item.figure) {
        collection.items.push(item);
      }
    });

    return Promise.all((data.images || []).map(url => this.imageService.createFromUrl(url).catch(() => null)))
      .then(images => collection.images = images.filter(image => !!image))
      .then(() => collection);

  }

}
