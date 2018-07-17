import { Component, NgZone } from '@angular/core';
import { NavParams } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { FigureEditPage } from "src/figure/figure-edit.page";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { SearchPage } from "src/search/search.page";
import { FigureService } from "src/service/figure.service";
import { Series } from "src/service/series/series";
import { FigureViewPage } from "./figure-view.page";

@Component({
  selector: 'page:figure-list',
  styleUrls: ['./figure-list.page.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>All Figures</ion-title>

        <ion-buttons start>
          <button ion-button [navPush]="searchPage">
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <div class="content-grid">
        <card-figure *ngFor="let figure of figures | slice: 0: limit"
                     [figure]="figure"
                     [navPush]="figureViewPage"
                     [navParams]="{figure: figure}">
        </card-figure>
      </div>

      <ion-fab bottom right>
        <button ion-fab [navPush]="figureEditPage">
          <ion-icon name="add"></ion-icon>
        </button>
      </ion-fab>

      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>
  `
})
export class FigureListPage implements IonViewWillEnter {

  limit: number;

  figures: Figure[];
  series: Series;

  searchPage: Page = SearchPage;
  figureEditPage: Page = FigureEditPage;
  figureViewPage: Page = FigureViewPage;

  constructor(private figureService: FigureService,
              private zone: NgZone,
              navParams: NavParams) {

    this.series = navParams.get('series');

  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewWillEnter(): void {
    this.figureService.getList({series: this.series}).then(figures => {
      this.zone.run(() => {
        this.figures = figures;
      });
    });
  }

  /**
   * Incremement number of results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.limit += 12;
    event.complete();
  }

}
