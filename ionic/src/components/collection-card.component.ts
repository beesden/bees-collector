import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Collection } from "src/entity";

@Component({
  selector: 'bc-collection-card',
  styleUrls: ['./collection-card.component.scss'],
  encapsulation: ViewEncapsulation.Native,
  template: `
    <figure [bc-image-view]="collection.image"></figure>

    <header>
      <h2>{{collection.name}}</h2>
      <p>{{collection.length}} figures</p>
    </header>
  `
})
export class CollectionCardComponent {

  @Input() collection: Collection;

}
