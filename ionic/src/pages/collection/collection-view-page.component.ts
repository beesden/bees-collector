import { Component, NgZone } from '@angular/core';
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { ActionSheetController, AlertController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity/collection";
import { Image } from "src/entity";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { CollectionEditPageComponent } from "src/pages/collection/collection-edit-page.component";
import { CollectionManagePageComponent } from "src/pages/collection/collection-manage-page.component";
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
        <button [navPush]="collectionEditPage" [navParams]="{collectionId: collection?.id}">Edit</button>
        <button [navPush]="collectionManagePage" [navParams]="{collectionId: collection?.id}">Manage</button>
        <button (click)="changeImage()">Change image</button>
        <button (click)="deleteCollection()">Delete</button>
      </div>
    </nav>

    <ion-content>

      <aside class="bc-image-view" [bc-image-view]="collection.images ? collection.images[0] : ''">
        <button [class]="collection.images && collection.images.length ? 'has-image' : 'no-image'" (click)="changeImage()">
          <ion-icon name="camera"></ion-icon>
        </button>
      </aside>

      <section class="bc-info">
        <header class="info">

          <h1>{{collection.name}}</h1>
          <p *ngIf="collection.description">{{collection.description}}</p>
          
          <dl>
            <dt>Figures in Collection</dt>
            <dd>{{collection.length}}</dd>
            <dt>Owned</dt>
            <dd>{{collection.collected}}</dd>
          </dl>

        </header>
      </section>

      <bc-figure-list [figures]="collection.figures"></bc-figure-list>

    </ion-content>
  `
})
export class CollectionViewPageComponent implements IonViewDidEnter {

  moreOptions: boolean;
  collectionEditPage: Page = CollectionEditPageComponent;
  collectionManagePage: Page = CollectionManagePageComponent;
  collection: Collection = new Collection();

  constructor(private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
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
