import { Component, NgZone } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { SortableEvent } from "src/directives";
import { Figure } from "src/entity";
import { Collection } from "src/entity/collection";
import { CollectionViewPageComponent } from "src/pages/collection/collection-view-page.component";
import { CollectionService } from "src/service/collection.service";

@Component({
  selector: 'bp-collection-manage',
  styleUrls: ['./collection-manage-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Manage collection</ion-title>

        <ion-buttons end>
          <button (click)="saveChanges()">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>

    <ion-content>

      <h1 class="bc-type-title">{{collection?.name}}</h1>

      <section class="figure-list" (bc-sortable)="reorderItems($event)">
        <div bc-sortable-item *ngFor="let figure of collection?.figures; let idx = index;">

          <button bc-sortable-handle>
            <ion-icon name="reorder"></ion-icon>
          </button>

          <header>
            <h2>{{figure.name}}</h2>
            <p>{{figure.range}}</p>
          </header>

          <button class="remove" (click)="removeFigureFromCollection(idx)">
            <ion-icon name="close"></ion-icon>
          </button>

        </div>
      </section>

    </ion-content>
  `
})
export class CollectionManagePageComponent {

  collection: Collection;

  constructor(private collectionService: CollectionService,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private zone: NgZone) {

    const collectionId = this.navParams.get('collectionId');
    this.collectionService.getOne(collectionId)
      .then(collection => this.collection = collection);
  }

  /**
   * Remove a figure from the collection
   *
   * @param idx
   */
  removeFigureFromCollection(idx: number): void {
    this.collection.figures.splice(idx, 1);
  }

  /**
   * Event listener for changes made within the collection.
   *
   * @param indexes
   */
  reorderItems(indexes: SortableEvent) {

    const element = this.collection.figures[indexes.startIdx];

    this.zone.run(() => {
      this.collection.figures.splice(indexes.startIdx, 1);
      this.collection.figures.splice(indexes.targetIdx, 0, element);
    });

  }

  /**
   * Save the changes made to the collection.
   */
  saveChanges(): void {
    this.collectionService.saveCollection(this.collection).then(() => this.viewCtrl.dismiss());
  }

}
