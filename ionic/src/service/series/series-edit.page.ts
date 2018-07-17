import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { FigureEditPage } from "src/figure/figure-edit.page";
import { FigureService } from "src/service/figure.service";
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
        <p>{{figure.notes}}</p>
      </ion-item>
      

    </ion-content>
  `
})
export class SeriesEditPage {

  figureViewPage: Page = FigureEditPage;
  collection: Series;
  figures: Figure[];

  constructor(figureService: FigureService,
              navParams: NavParams) {

    this.collection = navParams.get('collection');
    figureService.getList({series: this.collection}).then(figures => this.figures = figures);

  }

}
