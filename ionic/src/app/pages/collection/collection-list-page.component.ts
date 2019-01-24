import { Component, NgZone } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Collection } from "src/app/entity/collection";
import { IonViewDidEnter } from "src/app/ionic-lifecycle";
import { CollectionService } from "src/app/service";


@Component({
  selector: 'bp-collection-list',
  template: `
    <ion-header>

      <ion-toolbar>

        <button menuToggle="menu">
          <ion-icon name="menu"></ion-icon>
        </button>

        <ion-title>My Collections</ion-title>

        <ion-buttons end>
          <!--
          <button [navPush]="searchPage">
            <ion-icon name="search"></ion-icon>
          </button>
          -->
        </ion-buttons>

      </ion-toolbar>

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="!collections"></ion-spinner>

      <ng-container *ngIf="collections?.length > 0">
        <bc-collection-list [collections]="collections"></bc-collection-list>

        <!--
        <ion-infinite-scroll (ionInfinite)="doInfinite($event)" [enabled]="total > collections.length">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
        -->
      </ng-container>

      <button class="bc-button bc-button--fab" *ngIf="collections" (click)="addCollection()">
        <ion-icon name="add"></ion-icon>
      </button>

      <article class="bc-empty" *ngIf="collections?.length === 0">
        <ion-icon name="albums"></ion-icon>

        <h1 class="bc-type-title">You do not have any collections.</h1>
        <p class="bc-type-text">Collections can be used to categorise, group and organise your figures.</p>
      </article>

    </ion-content>
  `
})
export class CollectionListPageComponent implements IonViewDidEnter {

  private readonly perPage: number = 12;
  private page: number = 1;

  total: number;
  collections: Collection[];
  // searchPage: Page = SearchPageComponent;

  constructor(private collectionService: CollectionService,
              private modalCtrl: ModalController,
              private zone: NgZone) {
  }

  ionViewDidEnter(): void {

    // Fetch all up to the current page.
    const refreshCount = this.perPage * this.page;

    this.collectionService.getList(refreshCount, 0).then(([collections, total]) => {
      this.total = total;
      this.zone.run(() => this.collections = collections);
    });

  }

  /**
   * Increment number of visible results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.collectionService.getList(this.perPage, this.page++).then(([collections]) => {
      this.zone.run(() => this.collections = this.collections.concat(collections));
      event.complete();
    });

  }

  addCollection(): void {
    // const modal = this.modalCtrl.create(CollectionEditPageComponent)
    // modal.onDidDismiss(() => this.ionViewDidEnter());
    // modal.present();
  }

}
