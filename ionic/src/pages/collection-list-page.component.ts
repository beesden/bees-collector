import { Component, NgZone } from "@angular/core";
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { CollectionViewPageComponent } from "src/pages/collection-view-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
import { CollectionService } from "src/service";


@Component({
  selector: 'bp-collection-list',
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>My Collections</ion-title>

        <ion-buttons start>
          <button ion-button [navPush]="searchPage">
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <div class="content-grid">
        <bc-collection-card *ngFor="let collection of collections"
                     [collection]="collection"
                     [navPush]="collectionViewPage"
                     [navParams]="{collectionId: collection.id}">
        </bc-collection-card>
      </div>

      <ion-fab bottom right>
        <button ion-fab [navPush]="" [navParams]="{range: range}">
          <ion-icon name="add"></ion-icon>
        </button>
      </ion-fab>

    </ion-content>
  `
})
export class CollectionListPageComponent implements IonViewWillEnter {

  limit: number;

  collections: Collection[];

  searchPage: Page = SearchPageComponent;
  collectionEditPage: Page = SearchPageComponent;
  collectionViewPage: Page = CollectionViewPageComponent;

  constructor(private collectionService: CollectionService,
              private zone: NgZone) {
  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewWillEnter(): void {
    this.collectionService.getList().then(collections => {
      this.zone.run(() => {
        this.limit = Math.min(collections.length, 12);
        this.collections = collections;
      });
    });
  }

}
