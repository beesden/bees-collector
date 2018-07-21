import { Component, NgZone } from '@angular/core';
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { ActionSheetController, AlertController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Image } from "src/entity";
import { Figure } from "src/entity/figure";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent } from "src/pages/figure-edit-page.component";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-view',
  styleUrls: ['./figure-view-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button (click)="addPhoto()">
            <ion-icon name="camera"></ion-icon>
          </button>
          <button (click)="deleteFigure()">
            <ion-icon name="trash"></ion-icon>
          </button>
          <button (click)="changeStatus()">
            <ion-icon [name]="figure.collected ? 'checkmark' : 'close'"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <ion-slides class="image-preview" [loop]="true" [pager]="true">
        <ion-slide *ngFor="let image of figure.images"><img [src]="image.url"/></ion-slide>
      </ion-slides>

      <header class="page-section">

        <!-- Main title -->
        <h1>{{figure.name}}</h1>
        <div [class]="'status-' + figure.status">{{figure.statusText}}</div>

        <!-- Notes -->
        <ng-container *ngIf="figure.notes">
          <hr/>
          <p>{{figure.notes}}</p>
        </ng-container>

        <hr/>

        <!-- Additional Info -->
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

        <!-- Action bar -->
        <ng-container *ngIf="!figure.collected">
          <hr/>
          <nav text-end>
            <button ion-button clear [navPush]="figureEditPage" [navParams]="{figureId: figure?.id}">Edit Details</button>
          </nav>
        </ng-container>

      </header>

      <h2 class="heading">Accessories</h2>

      <section class="scroller">

        <ion-item *ngFor="let accessory of figure.accessories">
          <img item-left [src]="accessory.images ? accessory.images[0].url : ''"/>
          <div>{{accessory.name}}</div>
        </ion-item>

        <ion-item>
          <button ion-button>Add</button>
        </ion-item>

      </section>


      <ng-container *ngIf="figure.collections?.length">
        <h2 class="heading">Collected in:</h2>

        <section class="scroller">
          <bc-collection-card *ngFor="let collection of figure.collections" [collection]="collection"></bc-collection-card>
        </section>
      </ng-container>

    </ion-content>
  `
})
export class FigureViewPageComponent implements IonViewDidEnter {

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
  ionViewDidEnter(): void {

    const figureId = this.navParams.get('figureId');

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
  changeStatus(): void {

    this.figure.collected = !this.figure.collected;
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
        image.name = path;
        this.figure.images.push(image)
        return this.figureService.saveFigure(this.figure);
      })
      .catch(err => console.log(err));

  }

}
