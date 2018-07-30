import { Injectable } from '@angular/core';
import { Figure } from "src/entity/figure";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { Image } from "src/entity/image";

@Injectable()
export class BackupFigureUtil {

  fromFigure(figure: Figure): FigureData {
    return {
      id: figure.id,
      name: figure.name,
      variant: figure.variant,
      notes: figure.notes,
      collected: figure.collected,
      manufacturer: figure.manufacturer,
      images: (figure.images || []).map(image => image.url),
      accessories: (figure.accessories || []).map(acc => ({name: acc.name, variant: acc.variant, collected: acc.collected})),
      properties: (figure.properties || []).map(prop => ({name: prop.name, value: prop.value})),
      release: figure.release,
      date_update: figure.dateUpdated.toISOString(),
      date_created: figure.dateCreated.toISOString()
    };
  }

  toFigure(data: FigureData): Figure {

    const figure = new Figure();
    figure.id = data.id;
    figure.name = data.name;
    figure.variant = data.variant;
    figure.release = data.release;
    figure.manufacturer = data.manufacturer;

    figure.images = data.images.map(url => {
      const image = new Image();
      image.url = url;
      return image;
    });

    figure.properties = data.properties.map(data => {
      const prop = new FigureProperty();
      prop.name = data.name;
      prop.value = data.value;
      return prop;
    });

    figure.accessories = data.accessories.map(entry => {
      const prop = new FigureAccessory();
      prop.name = entry.name;
      prop.variant = entry.variant;
      prop.figure = figure;
      return prop;
    });

    return figure;

  }

}
