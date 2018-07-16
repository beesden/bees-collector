import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { FigureListPage } from "../figure/figure-list.page";
import { Series } from "./series";
import { SeriesService } from "./series.service";

@Component({
  selector: 'page:collection-list',
  styleUrls: ['./series-list.page.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>My Collections</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content>
      <div class="content-grid">
        <series-card *ngFor="let series of seriesList"
                         [series]="series"
                         [navPush]="figureListPage"
                         [navParams]="{series: series}"></series-card>
      </div>
    </ion-content>
  `
})
export class SeriesListPage {

  figureListPage: Page = FigureListPage;
  seriesList: Series[];

  constructor(seriesService: SeriesService) {
    seriesService.getList().then(series => this.seriesList = series);
  }

}
