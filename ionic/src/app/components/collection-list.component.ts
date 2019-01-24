import { Component, Input } from '@angular/core';
import { Collection } from "src/app/entity/collection";

@Component({
  selector: 'bc-collection-list',
  styleUrls: ['./collection-list.component.scss'],
  template: `
    <bc-collection-card *ngFor="let collection of collections"
                        [collection]="collection"></bc-collection-card>
  `
})
export class CollectionListComponent {

  @Input() collections: Collection[];
  // collectionViewPage: Page = CollectionViewPageComponent;

}
