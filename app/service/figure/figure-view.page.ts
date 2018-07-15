import { Component } from '@angular/core';
import { Figure, FigureService } from "./figure.service";
import { ActionSheetController, ModalController, NavParams, ViewController } from "ionic-angular";
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";

@Component({
  selector: 'page:figure-view',
  styleUrls: ['./figure-view.page.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button ion-button (click)="openMenu()">
            <ion-icon name="more"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <ion-slides class="image-preview" [loop]="true" [pager]="true">
        <ion-slide *ngFor="let image of figure.image"><img [src]="image"/></ion-slide>
      </ion-slides>

      <header class="page-section">
        <h1>{{figure.name}}</h1>
        <p>{{figure.description}}</p>
      </header>

      <section class="page-section">

        <ol class="completion">
          <li [ngClass]="{complete: figure.owned}" (click)="this.update({owned: !figure.owned})">Figure Owned</li>
          <li [ngClass]="{complete: figure.condition}" (click)="this.update({condition: !figure.condition})">Good Condition</li>
          <li [ngClass]="{complete: figure.accessories}" (click)="this.update({accessories: !figure.accessories})">All Accessories</li>
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
          <ng-container *ngFor="let property of properties">
            <dt>{{property.key}}</dt>
            <dd>{{property.value}}</dd>
          </ng-container>
        </dl>
      </section>

      <section class="page-section" *ngIf="figure.collection?.length">
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

  figure: Figure;

  get properties(): Array<{ key: string, value: string }> {
    return Object.entries<string>(this.figure.properties)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => ({key, value}));
  }

  constructor(private viewCtrl: ViewController,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private figureService: FigureService,
              navParams: NavParams) {

    this.figure = Object.assign({}, navParams.get('figure'));

  }

  /**
   * Opens the additional editing options menu.
   */
  openMenu(): void {

   this.actionSheetCtrl.create()
      .addButton({icon: 'create', text: 'Edit information', handler: () => this.editFigure()})
      .addButton({icon: 'camera', text: 'Add new photo', handler: () => this.uploadImage(PictureSourceType.CAMERA)})
      .addButton({icon: 'images', text: 'Select image', handler: () => this.uploadImage(PictureSourceType.SAVEDPHOTOALBUM)})
      .present()

  }

  /**
   * Opens the edit figure dialog.
   */
  editFigure(): void {
    this.figureService.update(this.figure);
  }

  /**
   * Add an image to the figure.
   */
  uploadImage(sourceType: PictureSourceType ): void {

    const cameraOptions: CameraOptions = {
      destinationType: DestinationType.FILE_URL,
      mediaType: MediaType.PICTURE,
      sourceType,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions)
      .then(path =>  this.figure.image.push(path))
      .then(() =>  this.update())
      .catch(err => console.log(err));

  }

  /**
   * Saves changes to the db
   */
  update(merge: {} = {}): void {
    this.figure = Object.assign(this.figure, merge);
    this.figureService.update(this.figure);
  }
}
