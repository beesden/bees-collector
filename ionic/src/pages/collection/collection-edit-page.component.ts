import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { Collection } from "src/entity/collection";
import { CollectionViewPageComponent } from "src/pages/collection/collection-view-page.component";
import { CollectionService } from "src/service/collection.service";

@Component({
  selector: 'bp-collection-edit',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>{{collection?.id ? 'Edit Collection' : 'Add Collection'}}</ion-title>

        <ion-buttons end>
          <button (click)="saveChanges()">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <form #form="ngForm" *ngIf="collection">

        <fieldset>
          <legend>Collection name</legend>

          <ion-item>
            <ion-label>Name</ion-label>
            <ion-input name="name" [(ngModel)]="collection.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Notes</ion-label>
            <ion-textarea name="notes" [(ngModel)]="collection.description"></ion-textarea>
          </ion-item>

        </fieldset>

      </form>

    </ion-content>
  `
})
export class CollectionEditPageComponent {

  collection: Collection;

  constructor(private viewCtrl: ViewController,
              private collectionService: CollectionService,
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
   * Save any changes made in the form.
   */
  saveChanges(): void {

    this.collectionService.saveCollection(this.collection).then(collection => {

      const collectionId = this.navParams.get('collectionId');
      const nav = this.viewCtrl.getNav();

      this.viewCtrl.dismiss().then(() => {
        if (!collectionId) {
          nav.push(CollectionViewPageComponent, {collectionId: collection.id});
        }
      });

    });
  }
}
