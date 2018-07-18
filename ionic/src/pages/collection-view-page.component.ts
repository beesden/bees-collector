import { Component, NgZone } from '@angular/core';
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { ActionSheetController, AlertController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Image } from "src/entity";
import { Collection } from "src/entity/collection";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent } from "src/pages/figure-edit-page.component";
import { CollectionService } from "src/service/collection.service";

@Component({
  selector: 'collection-view-page',
  styleUrls: ['./figure-view-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button ion-button [navPush]="collectionEditPage" [navParams]="{collectionId: collection?.id}">
            <ion-icon name="create"></ion-icon>
          </button>
          <button ion-button (click)="deleteCollection()">
            <ion-icon name="trash"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <div class="image-preview">
        <button ion-button (click)="setPhoto()">
          <ion-icon name="camera"></ion-icon>
        </button>
        <img [src]="collection.image?.url"/>
      </div>

      <header class="page-section">
        <h1>{{collection.name}}</h1>

        <dl>
          <dt>Figures in Collection:</dt>
          <dd>{{collection.length}}</dd>
          <dt>Owned:</dt>
          <dd>{{collection.collected}}</dd>
        </dl>
      </header>

      <section class="page-section">
        <h2>Figures:</h2>

        <card-figure [figure]="{name: 'Test 1'}"></card-figure>
        <card-figure [figure]="{name: 'Test 2'}"></card-figure>
        <card-figure [figure]="{name: 'Test 3'}"></card-figure>
      </section>

    </ion-content>
  `
})
export class CollectionViewPageComponent implements IonViewWillEnter {

  collectionEditPage: Page = FigureEditPageComponent;
  collection: Collection = new Collection();

  constructor(private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private camera: Camera,
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
  ionViewWillEnter(): void {

    const collectionId = this.navParams.get('collectionId');
    if (!collectionId) {
      //  this.viewCtrl.dismiss();
    }

    this.collectionService.getOne(collectionId).then(collection => {
      this.zone.run(() => this.collection = collection);
    });

  }


  addFigure(): void {
    console.log('Add accessory');
  }

  /**
   * Opens the additional editing options menu.
   */
  setPhoto(): void {

    this.actionSheetCtrl.create()
      .addButton({icon: 'camera', text: 'Take photo', handler: () => this.photoUpload(PictureSourceType.CAMERA)})
      .addButton({
        icon: 'images',
        text: 'Select image',
        handler: () => this.photoUpload(PictureSourceType.SAVEDPHOTOALBUM)
      })
      .present();

  }

  /**
   * Show a confimation to delete a collection - if confirmed, then remove the collection from the DB.
   */
  deleteCollection(): void {

    this.alertCtrl.create()
      .setTitle('Delete Collection?')
      .setMessage(`Are you sure you wish to delete ${this.collection.name}?`)
      .addButton({text: 'Cancel', role: 'cancel'})
      .addButton({
        text: 'Yes I\'m Sure',
        handler: () => {
          this.collectionService.deleteOne(this.collection.id).then(() => this.viewCtrl.dismiss());
        }
      })
      .present();

  }

  /**
   * Saves an uploaded image URL to the collection entity.
   */
  private photoUpload(sourceType: PictureSourceType): void {

    const cameraOptions: CameraOptions = {
      destinationType: DestinationType.NATIVE_URI,
      mediaType: MediaType.PICTURE,
      sourceType,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions)
      .then(path => {
        this.collection.image = new Image();
        this.collection.image.url = path;
        this.collectionService.saveCollection(this.collection);
      })
      .catch(err => console.log(err));

  }

}
