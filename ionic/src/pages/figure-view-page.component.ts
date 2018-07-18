import { Component, NgZone } from '@angular/core';
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { ActionSheetController, AlertController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Image } from "src/entity";
import { Figure } from "src/entity/figure";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent } from "src/pages/figure-edit-page.component";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'figure-view-page',
  styleUrls: ['./figure-view-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button ion-button [navPush]="figureEditPage" [navParams]="{figureId: figure?.id}">
            <ion-icon name="create"></ion-icon>
          </button>
          <button ion-button (click)="addPhoto()">
            <ion-icon name="camera"></ion-icon>
          </button>
          <button ion-button (click)="deleteFigure()">
            <ion-icon name="trash"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <ion-slides class="image-preview" [loop]="true" [pager]="true">
        <ion-slide *ngFor="let image of figure.images"><img [src]="image.url"/></ion-slide>
      </ion-slides>

      <header class="page-section">
        <h1>{{figure.name}}</h1>
        <p>{{figure.series}} | {{figure.range}}</p>
      </header>

      <section class="page-section">
        <button ion-button block *ngIf="!figure.collected" (click)="addToCollection()">Add to Collection</button>
        <h2>More info</h2>
      </section>

      <section class="page-section">
        <dl>
          <dt>Series</dt>
          <dd>{{figure.series}}</dd>
          <!-- Figure range -->
          <ng-container *ngIf="figure.range">
            <dt>Range</dt>
            <dd>{{figure.range}}</dd>
          </ng-container>
          <!-- Release date -->
          <ng-container *ngIf="figure.release">
            <dt>Release date</dt>
            <dd>{{figure.release | date: 'yyyy'}}</dd>
          </ng-container>
          <!-- Extra info -->
          <ng-container *ngFor="let property of figure.properties">
            <dt>{{property.name}}</dt>
            <dd>{{property.value}}</dd>
          </ng-container>
        </dl>
      </section>

      <section class="page-section">
        <h2>Accessories</h2>

        <div class="scroller">
          <div class="accessory" *ngFor="let accessory of figure.accessories">
            {{accessory.name}}
          </div>
          <div class="add-button" (click)="addAccessory()">
            Add
          </div>
        </div>

      </section>

      <section class="page-section" *ngIf="figure.collections?.length">
        <h2>Collections:</h2>

        <div class="grid">
          <collection-card [collection]="{name: 'Test 1'}"></collection-card>
          <collection-card [collection]="{name: 'Test 2'}"></collection-card>
          <collection-card [collection]="{name: 'Test 3'}"></collection-card>
        </div>
      </section>

    </ion-content>
  `
})
export class FigureViewPageComponent implements IonViewWillEnter {

  figureEditPage: Page = FigureEditPageComponent;
  figure: Figure = new Figure();

  constructor(private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private camera: Camera,
              private figureService: FigureService,
              private zone: NgZone,
              private viewCtrl: ViewController,
              private navParams: NavParams) {
  }

  /**
   *  Update data whenever the view is opened or returned to.
   *
   *  e.g. If we want to refresh the figure after editing.
   */
  ionViewWillEnter(): void {

    const figureId = this.navParams.get('figureId');
    if (!figureId) {
      //  this.viewCtrl.dismiss();
    }

    this.figureService.getOne(figureId).then(figure => {
      this.zone.run(() => this.figure = figure);
    });

  }


  addAccessory(): void {
    console.log('Add accessory');
  }

  /**
   * Opens the additional editing options menu.
   */
  addPhoto(): void {

    this.actionSheetCtrl.create()
      .addButton({icon: 'camera', text: 'Add new photo', handler: () => this.photoUpload(PictureSourceType.CAMERA)})
      .addButton({
        icon: 'images',
        text: 'Select image',
        handler: () => this.photoUpload(PictureSourceType.SAVEDPHOTOALBUM)
      })
      .present();

  }

  /**
   * Toggles the 'colected' field and saves the change to the DB.
   */
  addToCollection(): void {

    this.figure.collected = true;
    this.figureService.saveFigure(this.figure);

  }

  /**
   * Show a confimation to delete a figure - if confirmed, then remove the figure from the DB.
   */
  deleteFigure(): void {

    this.alertCtrl.create()
      .setTitle('Delete Figure?')
      .setMessage(`Are you sure you wish to delete ${this.figure.name}?`)
      .addButton({text: 'Cancel', role: 'cancel'})
      .addButton({
        text: 'Yes I\'m Sure',
        handler: () => {
          this.figureService.deleteOne(this.figure.id).then(() => this.viewCtrl.dismiss());
        }
      })
      .present();

  }

  /**
   * Saves an uploaded image URL to the figure entity.
   */
  private photoUpload(sourceType: PictureSourceType): void {

    const cameraOptions: CameraOptions = {
      destinationType: DestinationType.FILE_URL,
      mediaType: MediaType.PICTURE,
      sourceType,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions)
      .then(path => {
        const image = new Image();
        image.url = path;
        this.figure.images.push(image)
        // todo - image repo?
        this.figureService.saveFigure(this.figure);
      })
      .catch(err => console.log(err));

  }

}
