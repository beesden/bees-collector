import { Component, NgZone } from '@angular/core';
import { AlertController, ModalController, NavParams } from "@ionic/angular";
import { Figure } from "src/app/entity/figure";
import { IonViewDidEnter } from "src/app/ionic-lifecycle";
import { ImageService } from "src/app/service";
import { FigureService } from "src/app/service/figure.service";
import { FileFolder } from "src/app/service/file.service";

@Component({
  selector: 'bp-figure-view',
  template: `
    <ion-header>
      <ion-toolbar>

        <ion-buttons end>
          <button class="highlight" (click)="toggleHighlight()" [ngClass]="{active: figure?.highlight}">
            <ion-icon [name]="figure?.highlight ? 'star' : 'star-outline'"></ion-icon>
          </button>
          <button (click)="moreOptions = !moreOptions">
            <ion-icon name="more"></ion-icon>
          </button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <nav class="bc-overflow" [ngClass]="{reveal: moreOptions}" (click)="moreOptions = false">
      <ion-backdrop></ion-backdrop>
      <div class="options">
        <button (click)="editFigure()">Edit</button>
        <button (click)="changeImage()">{{figure?.images?.length ? 'Change' : 'Add'}} image</button>
        <button (click)="deleteFigure()">Delete</button>
      </div>
    </nav>

    <ion-content *ngIf="figure">

      <bc-image-slider class="bc-figure-image" [images]="figure.images"></bc-image-slider>

      <header class="bc-section">

        <!-- Main title -->
        <h1 class="bc-type-title">{{figure.name}}</h1>
        <p class="bc-type-subtitle" *ngIf="figure.variant">{{figure.variant}}</p>
        <p class="bc-type-text" *ngIf="figure.notes">{{figure.notes}}</p>

        <hr/>

        <p class="bc-type-status" [ngClass]="figure.status">{{figure.statusText}}</p>

        <ng-container *ngIf="figure.manufacturer || figure.release">

          <hr/>

          <!-- Metadata -->
          <dl class="bc-type-definitions">

            <!-- Figure manufacturer -->
            <ng-container *ngIf="figure.manufacturer">
              <dt>Manufacturer</dt>
              <dd>{{figure.manufacturer}}</dd>
            </ng-container>

            <!-- Release date -->
            <ng-container *ngIf="figure.release">
              <dt>Release date</dt>
              <dd>{{figure.release | date: 'yyyy'}}</dd>
            </ng-container>
          </dl>

        </ng-container>

        <nav>
          <bc-status-button [checked]="figure.collected" (click)="toggleCollected()">Owned</bc-status-button>
          <bc-status-button *ngIf="figure.collected" [checked]="!figure.damaged" (click)="toggleDamaged()">Undamaged</bc-status-button>
          <bc-status-button *ngIf="figure.collected" [checked]="!figure.incomplete" (click)="toggleIncomplete()">Complete</bc-status-button>
        </nav>

      </header>

      <h2>
        Accessories
        <button class="bc-button bc-button--text" (click)="addAccessory()">Add</button>
      </h2>

      <section>
        <bc-accessory-card class="scroll-item" [accessory]="accessory" *ngFor="let accessory of figure.accessories"></bc-accessory-card>
      </section>

      <ng-container *ngIf="figure.tags?.length">
        <h2>Tags:</h2>

        <section class="page-section">
          <bc-tag-manager [(ngModel)]="figure.tags" [readonly]="true"></bc-tag-manager>
        </section>
      </ng-container>

    </ion-content>
  `
})
export class FigureViewPageComponent implements IonViewDidEnter {

  moreOptions: boolean;
  figure: Figure;

  constructor(private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private imageService: ImageService,
              private figureService: FigureService,
              private zone: NgZone,
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

  /**
   * Toggle the figure collected state.
   */
  toggleCollected(): void {
    this.figure.collected = !this.figure.collected;
    this.figure.damaged = this.figure.incomplete = !this.figure.collected;
    this.figureService.save(this.figure);
  }

  /**
   * Toggle the figure collected state.
   */
  toggleDamaged(): void {
    if (this.figure.collected) {
      this.figure.damaged = !this.figure.damaged;
      this.figureService.save(this.figure);
    }
  }

  /**
   * Toggle the figure collected state.
   */
  toggleIncomplete(): void {
    if (this.figure.collected) {
      this.figure.incomplete = !this.figure.incomplete;
      this.figureService.save(this.figure);
    }
  }

  /**
   * Toggle the figure highlight state.
   */
  toggleHighlight(): void {
    this.figure.highlight = !this.figure.highlight;
    this.figureService.save(this.figure);
  }

  async addAccessory() {
    // const modal = this.modalCtrl.create(AccessoryEditPageComponent, {figureId: this.figure.id});
    // modal.onWillDismiss(() => this.ionViewDidEnter());
    // modal.present();
  }

  editFigure(): void {
    // const modal = this.modalCtrl.create(FigureEditPageComponent, {figureId: this.figure.id});
    // modal.onWillDismiss(() => this.ionViewDidEnter());
    // modal.present();
  }

  /**
   * Opens the additional editing options menu.
   */
  changeImage(): void {

    this.imageService.create(FileFolder.FIGURE)
      .then(image => this.figure.images = [image])
      .then(() => this.figureService.save(this.figure));

  }

  /**
   * Delete the figure, with a confirmation.
   */
  deleteFigure(): void {

    this.alertCtrl.create({
      message: `Delete ${this.figure.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            // todo
            // this.figureService.deleteOne(this.figure.id).then(() => this.viewCtrl.dismiss());
          }
        }
      ]
    }).then(alert => alert.present());

  }

}
