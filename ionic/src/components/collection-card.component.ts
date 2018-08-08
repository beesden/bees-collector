import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Collection } from "src/entity/collection";
import { ItemImage } from "src/entity/item-image";

@Component({
  selector: 'bc-collection-card',
  styleUrls: ['./collection-card.component.scss'],
  encapsulation: ViewEncapsulation.Native,
  template: `
    <figure [bc-image-view]="coverImage"></figure>

    <header>
      <h2>{{collection.name}}</h2>
      <p>{{collection.length}} figures</p>
    </header>
  `
})
export class CollectionCardComponent {

  @Input() collection: Collection;

  get coverImage(): ItemImage {
    return this.collection.images && this.collection.images.length ? this.collection.images[0] : null;
  }

}
