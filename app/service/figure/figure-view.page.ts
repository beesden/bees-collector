import { Component } from '@angular/core';
import { Figure, FigureService } from "./figure.service";
import { ActionSheetController, ModalController, NavParams, ViewController } from "ionic-angular";

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

      <ion-slides class="image-preview" (click)="openImageBrowser()" [loop]="true" [pager]="true">
        <ion-slide *ngFor="let image of figure.image"><img [src]="image"/></ion-slide>
      </ion-slides>

      <header class="page-section">
        <h1>{{figure.name}}</h1>
        <p>{{figure.description}}</p>
      </header>

      <section class="page-section">

        <ol class="completion">
          <li [ngClass]="{complete: figure.owned}">Figure Owned</li>
          <li [ngClass]="{complete: figure.condition}">Good Condition</li>
          <li [ngClass]="{complete: figure.accessories}">All Accessories</li>
        </ol>

        <h2>More info</h2>
      </section>

      <section class="page-section">
        <dl>
          <dt>Series</dt>
          <dd>{{figure.series}}</dd>
          <ng-container *ngIf="figure.range">
            <dt>Range</dt>
            <dd>{{figure.range}}</dd>
          </ng-container>
          <ng-container *ngIf="figure.release">
            <dt>Release date</dt>
            <dd>{{figure.release | date: 'yyyy'}}</dd>
          </ng-container>
          <ng-container *ngFor="let property of properties">
            <dt>{{property.key}}</dt>
            <dd>{{property.value}}</dd>
          </ng-container>
        </dl>
      </section>

      <section class="page-section">
        <h2>Collections:</h2>

        <div class="grid">
          <card-collection [collection]="{}"></card-collection>
          <card-collection [collection]="{}"></card-collection>
          <card-collection [collection]="{}"></card-collection>
        </div>
      </section>

    </ion-content>
  `
})
export class FigureViewPage {

  figure: Figure;

  constructor(private viewCtrl: ViewController,
              private actionSheetCtrl: ActionSheetController,
              private figureService: FigureService,
              navParams: NavParams) {

    this.figure = Object.assign({}, navParams.get('figure'));

  }

  get properties(): Array<{ key: string, value: string }> {
    return Object.entries<string>(this.figure.properties)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => ({key, value}));
  }

  openMenu(): void {

   this.actionSheetCtrl.create()
      .addButton({icon: 'camera', text: 'Upload image'})
      .present()

  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  update(): void {
    this.figureService.update(this.figure);
  }
}
