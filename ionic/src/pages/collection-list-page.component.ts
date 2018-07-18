import { Component, NgZone } from "@angular/core";
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { SearchPageComponent } from "src/pages/search-page.component";
import { CollectionService } from "src/service";


@Component({
  selector: 'collection-list-page',
  styleUrls: ['./figure-list-page.component.scss'],
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
        <collection-card *ngFor="let collection of collections | slice: 0: limit"
                     [collection]="collection"
                     [navPush]="collectionViewPage"
                     [navParams]="{collectionId: collection.id}">
        </collection-card>
      </div>

      <ion-fab bottom right>
        <button ion-fab [navPush]="" [navParams]="{range: range}">
          <ion-icon name="add"></ion-icon>
        </button>
      </ion-fab>

      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>
  `
})
export class CollectionListPageComponent implements IonViewWillEnter {

  limit: number;

  collections: Collection[];

  searchPage: Page = SearchPageComponent;
  collectionEditPage: Page = SearchPageComponent;
  collectionViewPage: Page = SearchPageComponent;

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

  /**
   * Incremement number of results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.limit = Math.min(this.collections.length, this.limit + 12);
    event.complete();
  }

}
