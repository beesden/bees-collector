import { Component } from '@angular/core';
import { Figure, FigureService } from "../figure/figure.service";
import { ModalController, NavParams } from "ionic-angular";
import { FigureEditPage } from "../figure/figure-edit.page";
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "../collection/collection";
import { Series } from "./series";

@Component({
  selector: 'page:collection-edit',
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>{{collection}}</ion-title>
      </ion-navbar>
      
    </ion-header>

    <ion-content>

      <ion-item *ngFor="let figure of figures" [navPush]="figureViewPage" [navParams]="{figure: figure}">
        <h2>{{figure.name}}</h2>
        <p>{{figure.description}}</p>
      </ion-item>
      

    </ion-content>
  `
})
export class SeriesEditPage {

  figureViewPage: Page = FigureEditPage;
  collection: Series;
  figures: Figure[];

  constructor(private modalCtrl: ModalController,
              figureService: FigureService,
              navParams: NavParams) {

    this.collection = navParams.get('collection');
    figureService.getList({series: this.collection}).then(figures => this.figures = figures);

  }

}
