import { Component, NgZone } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity/collection";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent, FigureViewPageComponent } from "src/pages";
import { CollectionEditPageComponent } from "src/pages/collection/collection-edit-page.component";
import { ImageService } from "src/service";
import { CollectionService } from "src/service/collection.service";

@Component({
  selector: 'bp-collection-view',
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button (click)="moreOptions = !moreOptions">
            <ion-icon name="more"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <nav class="bc-overflow" [ngClass]="{reveal: moreOptions}" (click)="moreOptions = false">
      <ion-backdrop></ion-backdrop>
      <div class="options">
        <button (click)="editCollection()">Edit</button>
        <button (click)="changeImage()">Replace image</button>
        <button (click)="deleteCollection()">Delete</button>
      </div>
    </nav>

    <ion-content>

      <ion-spinner *ngIf="!collection; else collectionContent"></ion-spinner>

      <ng-template #collectionContent>

        <header class="bc-header">
          <h1 class="bc-type-title">{{collection.name}}</h1>
          <h2 class="bc-type-subtitle">{{collection.series}}</h2>
          <p *ngIf="collection.description">{{collection.description}}</p>
        </header>

        <ng-container *ngIf="collection.figures?.length">

          <h2 class="bc-type-side">{{collection.collected}} / {{collection.length}} collected</h2>

          <section class="bc-figure-grid">
            <bc-figure-card *ngFor="let figure of collection.figures"
                            [figure]="figure"></bc-figure-card>
          </section>
        </ng-container>

        <article class="bc-empty" *ngIf="collection.figures?.length === 0">
          <ion-icon name="body"></ion-icon>

          <h1 class="bc-type-title">You have not added any figures to this collection.</h1>
          <p class="bc-type-text">Track collected figures by adding them to a collection.</p>
        </article>

      </ng-template>

      <button class="bc-button bc-button--fab" *ngIf="collection" (click)="addFigure()">
        <ion-icon name="add"></ion-icon>
      </button>

    </ion-content>
  `
})
export class CollectionViewPageComponent implements IonViewDidEnter {

  moreOptions: boolean;
  collection: Collection;

  constructor(private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private imageService: ImageService,
              private collectionService: CollectionService,
              private zone: NgZone,
              private viewCtrl: ViewController,
              private navParams: NavParams) {
  }

  /**
   *  Update data whenever the view is opened or returned to.
   *
   *  e.g. If we want to refresh the collection after editing.
   */
  ionViewDidEnter(): void {

    const collectionId = this.navParams.get('collectionId');
    this.collectionService.getOne(collectionId).then(collection => {
      this.zone.run(() => this.collection = collection);
    });

  }

  addFigure(): void {

    const modal = this.modalCtrl.create(FigureEditPageComponent);
    modal.onDidDismiss(figure => {
      if (figure) {
        this.collectionService.addFigureToCollection(this.collection.id, figure).then(() => this.ionViewDidEnter());
      }
    });
    modal.present();

  }

  editCollection(): void {
    const modal = this.modalCtrl.create(CollectionEditPageComponent, {collectionId: this.collection.id});
    modal.onWillDismiss(() => this.ionViewDidEnter());
    modal.present();
  }

  /**
   * Opens the additional editing options menu.
   */
  changeImage(): void {

    this.imageService.create()
      .then(image => this.collection.images = [image])
      .then(() => this.collectionService.saveCollection(this.collection));

  }

  /**
   * Show a confimation to delete a collection - if confirmed, then remove the collection from the DB.
   */
  deleteCollection(): void {

    this.alertCtrl.create()
      .setMessage(`Delete ${this.collection.name}?`)
      .addButton({text: 'Cancel', role: 'cancel'})
      .addButton({
        text: 'Delete',
        handler: () => {
          this.collectionService.deleteOne(this.collection.id).then(() => this.viewCtrl.dismiss());
        }
      })
      .present();

  }

}
