import { Component } from '@angular/core';
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { ActionSheetController, AlertController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Image } from "src/entity";
import { Figure } from "src/entity/figure";
import { FigureEditPage } from "src/figure/figure-edit.page";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'page:figure-view',
  styleUrls: ['./figure-view.page.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button ion-button [navPush]="figureEditPage" [navParams]="{figureId: figure.id}">
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

        <ol class="completion">
          <li [ngClass]="{complete: figure.owned}">Figure Owned</li>
          <li [ngClass]="{complete: figure.condition}">Good Condition</li>
        </ol>

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
          <series-card [series]="{name: 'Test 1'}"></series-card>
          <series-card [series]="{name: 'Test 2'}"></series-card>
          <series-card [series]="{name: 'Test 3'}"></series-card>
        </div>
      </section>

    </ion-content>
  `
})
export class FigureViewPage {

  figureEditPage: Page = FigureEditPage;
  figure: Figure;

  constructor(private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private camera: Camera,
              private figureService: FigureService,
              private viewCtrl: ViewController,
              navParams: NavParams) {

    this.figure = Object.assign({}, navParams.get('figure'));

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
          this.figureService.deleteFigure(this.figure.id).then(() => this.viewCtrl.dismiss());
        }
      })
      .present();

  }

  /**
   * Add an image to the figure.
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
