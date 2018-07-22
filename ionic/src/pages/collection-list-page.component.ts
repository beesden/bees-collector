import { Component, NgZone } from "@angular/core";
import { Collection } from "src/entity";
import { CollectionService } from "src/service";


@Component({
  selector: 'bp-collection-list',
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>My Collections</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="!collections"></ion-spinner>
      
      <bc-collection-list *ngIf="collections?.length > 0" [collections]="collections"></bc-collection-list>

      <article class="bc-empty" *ngIf="collections?.length === 0">
        <ion-icon name="albums"></ion-icon>

        <h1 class="bc-type-title">You do not have any collections.</h1>
        <p class="bc-type-text">Collections can be used to categorise, group and organise your figures.</p>
      </article>

    </ion-content>
  `
})
export class CollectionListPageComponent {

  collections: Collection[];

  constructor(private collectionService: CollectionService,
              private zone: NgZone) {

    this.collectionService.getList().then(collections => {
      this.zone.run(() => this.collections = collections);
    });

  }

}
