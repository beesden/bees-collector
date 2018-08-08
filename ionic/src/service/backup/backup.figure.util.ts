import { Injectable } from '@angular/core';
import { Figure } from "src/entity/figure";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Tag } from "src/entity/tag";
import { ImageService } from "src/service/image.service";

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
      images: (figure.images || []).map(image => image.url),
      accessories: (figure.accessories || []).map(acc => ({name: acc.name, variant: acc.variant})),
      properties: (figure.properties || []).map(prop => ({name: prop.name, value: prop.value})),
      release: figure.release,
      tags: (figure.tags || []).map(tag => tag.name),
      date_update: figure.dateUpdated.toISOString(),
      date_created: figure.dateCreated.toISOString()
    };
  }

  toFigure(data: FigureData): Promise<Figure> {

    const figure = new Figure();
    figure.id = data.id;
    figure.name = data.name;
    figure.variant = data.variant;
    figure.collected = data.images.length > 0;
    figure.incomplete = data.images.length > 0 && !data.collected;
    figure.damaged = data.images.length > 0 && !data.collected;
    figure.release = data.release;
    figure.manufacturer = data.manufacturer;

    figure.properties = (data.properties || []).map(data => {
      const prop = new FigureProperty();
      prop.name = data.name;
      prop.value = data.value;
      return prop;
    });

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

    return Promise.all((data.images || []).map(url => this.imageService.createFromUrl(url)))
      .then(images => figure.images = images)
      .then(() => figure);

  }

}
