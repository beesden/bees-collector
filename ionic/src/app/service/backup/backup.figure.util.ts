import { Injectable } from '@angular/core';
import { Figure } from "src/app/entity/figure";
import { FigureAccessory } from "src/app/entity/figure-accessory";
import { Tag } from "src/app/entity/tag";
import { ImageService } from "src/app/service/image.service";

@Injectable()
export class BackupFigureUtil {

  constructor(private imageService: ImageService) {
  }

  fromFigure(figure: Figure): FigureData {
    return {
      id: figure.id,
      name: figure.name,
      variant: figure.variant,
      notes: figure.notes,
      collected: figure.collected,
      damaged: figure.damaged,
      incomplete: figure.incomplete,
      manufacturer: figure.manufacturer,
      highlight: figure.highlight,
      images: (figure.images || []).map(image => image.url),
      accessories: (figure.accessories || []).map(acc => ({name: acc.name, variant: acc.variant})),
      release: figure.release,
      tags: (figure.tags || []).map(tag => tag.name),
      date_update: figure.dateUpdated.toISOString(),
      date_created: figure.dateCreated.toISOString()
    };
  }

  toFigure(data: FigureData): Promise<Figure> {

    const figure = new Figure(null);
    figure.id = data.id;
    figure.name = data.name;
    figure.variant = data.variant;
    figure.highlight = data.highlight;
    figure.collected = data.collected;
    figure.incomplete = data.incomplete;
    figure.damaged = data.damaged;
    figure.release = data.release;
    figure.manufacturer = data.manufacturer;

    figure.tags = (data.tags || []).map(value => {
      const tag = new Tag();
      tag.name = value;
      return tag;
    });

    figure.accessories = (data.accessories || []).map(entry => {
      const prop = new FigureAccessory();
      prop.name = entry.name;
      prop.variant = entry.variant;
      prop.figure = figure;
      return prop;
    });

    figure.images = [];
    return Promise.all((data.images || []).map(url => this.imageService.createFromUrl(url).catch(error => {
      console.error(error);
      return null;
    })))
      .then(images => figure.images = images.filter(image => !!image))
      .then(() => figure);

  }

}
