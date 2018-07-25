import { Component, NgZone } from '@angular/core';
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { ActionSheetController, AlertController, NavParams, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Image } from "src/entity";
import { Figure } from "src/entity/figure";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { AccessoryEditPageComponent } from "src/pages";
import { FigureEditPageComponent } from "src/pages/figure/figure-edit-page.component";
import { CollectionService } from "src/service";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-view',
  template: `
    <ion-header>
      <ion-navbar>

        <ion-buttons end>
          <button class="highlight" (click)="toggleHighlight()" [ngClass]="{active: figure.highlight}">
            <ion-icon [name]="figure.highlight ? 'star' : 'star-outline'"></ion-icon>
          </button>
          <button (click)="moreOptions = !moreOptions">
            <ion-icon name="more"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <nav class="bc-overflow" [ngClass]="{reveal: moreOptions}" (click)="moreOptions = false">
      <ion-backdrop></ion-backdrop>
      <div class="options">
        <button [navPush]="figureEditPage" [navParams]="{figureId: figure?.id}">Edit</button>
        <button [navPush]="accessoryEditPage" [navParams]="{figureId: figure?.id}">Add accessory</button>
        <button (click)="addToCollection()">Add to collection</button>
        <button (click)="deleteFigure()">Delete</button>
      </div>
    </nav>

    <ion-content>

      <aside class="bc-image-view" [bc-image-view]="figure.images ? figure.images[0] : ''"></aside>

      <header class="bc-info">

        <!-- Main title -->
        <h1>{{figure.name}}</h1>
        <p *ngIf="figure.notes">{{figure.notes}}</p>

        <hr/>

        <!-- Metadata -->
        <dl>

          <!-- Series -->
          <ng-container *ngIf="figure.series">
            <dt>Series</dt>
            <dd>{{figure.series}}</dd>
          </ng-container>

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

        <hr/>

        <nav>
          <bc-status-button [status]="figure.status" (toggle)="toggleCollected()"></bc-status-button>
        </nav>

      </header>

      <ng-container *ngIf="figure.accessories?.length">
        <h2 class="bc-type-subtitle">Accessories</h2>

        <section>
          <bc-accessory-card class="scroll-item" [accessory]="accessory" *ngFor="let accessory of figure.accessories"></bc-accessory-card>
        </section>
      </ng-container>


      <ng-container *ngIf="figure.collections?.length">
        <h2 class="bc-type-subtitle">In {{figure.collections?.length}} collections:</h2>

        <section class="bc-scroller">
          <bc-collection-card class="scroll-item" *ngFor="let collection of figure.collections" [collection]="collection"></bc-collection-card>
        </section>
      </ng-container>

    </ion-content>
  `
})
export class FigureViewPageComponent implements IonViewDidEnter {

  moreOptions: boolean;
  accessoryEditPage: Page = AccessoryEditPageComponent;
  figureEditPage: Page = FigureEditPageComponent;
  figure: Figure = new Figure();

  constructor(private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private camera: Camera,
              private figureService: FigureService,
              private collectionService: CollectionService,
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

  toggleCollected(): void {
    this.figure.collected = !this.figure.collected;
    this.figureService.save(this.figure);
  }

  toggleHighlight(): void {
    this.figure.highlight = !this.figure.highlight;
    this.figureService.save(this.figure);
  }


  addAccessory(): void {
    console.log('Add accessory');
  }

  /**
   * Add the figure to a collection.
   */
  addToCollection(): void {

    this.collectionService.getList().then(collections => {
      const options = this.alertCtrl.create()
        .setTitle('Add to collection')
        .addButton({text: 'Cancel', role: 'cancel'})
        .addButton({
          text: 'OK',
          handler: (collectionId: string) => {
            if (collectionId) {
              this.collectionService.addFigureToCollection(Number.parseInt(collectionId), this.figure)
                .then(() => this.ionViewDidEnter());
            }
          }
        });

      collections.forEach(collection => {
        options.addInput({
          type: 'radio',
          label: collection.name,
          value: collection.id.toString()
        });
      });

      return options.present();
    });
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
  toggleStatus(): void {

    this.figure.collected = !this.figure.collected;
    this.figureService.save(this.figure);

  }

  /**
   * Show a confimation to delete a figure - if confirmed, then remove the figure from the DB.
   */
  deleteFigure(): void {

    this.alertCtrl.create()
      .setMessage(`Delete ${this.figure.name}?`)
      .addButton({text: 'Cancel', role: 'cancel'})
      .addButton({
        text: 'Delete',
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
        this.figure.images.push(image);
        return this.figureService.save(this.figure);
      })
      .catch(err => console.log(err));

  }

}
