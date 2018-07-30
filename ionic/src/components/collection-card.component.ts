import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Collection } from "src/entity/collection";

@Component({
  selector: 'bc-collection-card',
  styleUrls: ['./collection-card.component.scss'],
  encapsulation: ViewEncapsulation.Native,
  template: `
    <figure [bc-image-view]="collection.images"></figure>

    <header>
      <h2>{{collection.name}}</h2>
      <p>{{collection.length}} figures</p>
    </header>
  `
})
export class CollectionCardComponent {

  @Input() collection: Collection;

}
