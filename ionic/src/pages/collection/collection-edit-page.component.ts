import { Component, NgZone } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavParams, ViewController } from "ionic-angular";
import { SortableEvent } from "src/directives";
import { Collection } from "src/entity/collection";
import { CollectionViewPageComponent } from "src/pages/collection/collection-view-page.component";
import { CollectionService } from "src/service/collection.service";

@Component({
  selector: 'bp-collection-edit',
  styleUrls: ['./collection-manage-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <button class="close-button" (click)="viewCtrl.dismiss()">
          <ion-icon name="close"></ion-icon>
        </button>

        <ion-title>{{collection?.id ? 'Edit Collection' : 'Add Collection'}}</ion-title>

        <ion-buttons end>
          <button form="collectionForm">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <form #form="ngForm" id="collectionForm" *ngIf="collection" (submit)="saveChanges(form)">

        <p class="info">* indicates required fields</p>

        <fieldset>
          <legend>Collection name</legend>

          <ion-item>
            <ion-label>Name <span>*</span></ion-label>
            <ion-input name="name" [(ngModel)]="collection.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Series <span>*</span></ion-label>
            <ion-input name="series" [(ngModel)]="collection.series" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Notes</ion-label>
            <ion-textarea name="notes" [(ngModel)]="collection.description"></ion-textarea>
          </ion-item>

        </fieldset>

        <h2 *ngIf="collection.figures?.length">Figures</h2>

        <section class="figure-list" (bc-sortable)="reorderItems($event)">
          <div bc-sortable-item *ngFor="let figure of collection?.figures; let idx = index;">

            <button bc-sortable-handle>
              <ion-icon name="reorder"></ion-icon>
            </button>

            <header>
              <h2>{{figure.name}}</h2>
              <p>{{figure.variant}}</p>
            </header>

            <button class="remove" (click)="removeFigureFromCollection(idx)">
              <ion-icon name="close"></ion-icon>
            </button>

          </div>
        </section>

      </form>

    </ion-content>
  `
})
export class CollectionEditPageComponent {

  collection: Collection;

  constructor(public viewCtrl: ViewController,
              private collectionService: CollectionService,
              private zone: NgZone,
              private navParams: NavParams) {

    const collectionId = this.navParams.get('collectionId');
    if (collectionId) {
      this.collectionService.getOne(collectionId)
        .then(collection => this.collection = collection);
    } else {
      this.collection = new Collection();
    }

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

    const element = this.collection.items[indexes.startIdx];

    this.zone.run(() => {

      this.collection.items.splice(indexes.startIdx, 1);
      this.collection.items.splice(indexes.targetIdx, 0, element);
      this.collection.items.forEach((item, idx) => item.idx = idx);

    });

  }

  /**
   * Save any changes made in the form.
   */
  saveChanges(form: NgForm): void {

    if (!form.valid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.collectionService.saveCollection(this.collection).then(() => this.viewCtrl.dismiss());

  }
}
