import { Component, NgZone } from "@angular/core";
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { CollectionEditPageComponent } from "src/pages/collection-edit-page.component";
import { CollectionViewPageComponent } from "src/pages/collection-view-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
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

      <div class="content-grid" *ngIf="collections?.length > 0">
        <bc-collection-card *ngFor="let collection of collections"
                            [collection]="collection"
                            [navPush]="collectionViewPage"
                            [navParams]="{collectionId: collection.id}">
        </bc-collection-card>
      </div>

      <article class="emptyState" *ngIf="collections?.length === 0">
        <ion-icon name="albums"></ion-icon>

        <h1>You do not have any collections.</h1>
        <p>Collections can be used to categorise, group and organise your figures.</p>
      </article>

    </ion-content>
  `
})
export class CollectionListPageComponent implements IonViewDidEnter {

  limit: number;

  collections: Collection[];

  searchPage: Page = SearchPageComponent;
  collectionEditPage: Page = CollectionEditPageComponent;
  collectionViewPage: Page = CollectionViewPageComponent;

  constructor(private collectionService: CollectionService,
              private zone: NgZone) {
  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewDidEnter(): void {
    this.collectionService.getList().then(collections => {
      this.zone.run(() => {
        this.limit = Math.min(collections.length, 12);
        this.collections = collections;
      });
    });
  }

}
