import { Component, Input } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity";
import { CollectionViewPageComponent } from "src/pages";

@Component({
  selector: 'bc-collection-list',
  styleUrls: ['./collection-list.component.scss'],
  template: `
    <bc-collection-card *ngFor="let collection of collections"
                        [collection]="collection"
                        [navPush]="collectionViewPage"
                        [navParams]="{collectionId: collection.id}"></bc-collection-card>
  `
})
export class CollectionListComponent {

  @Input() collections: Collection[];
  collectionViewPage: Page = CollectionViewPageComponent;

}
