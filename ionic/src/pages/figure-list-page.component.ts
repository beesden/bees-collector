import { Component, NgZone } from '@angular/core';
import { NavParams } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent } from "src/pages/figure-edit-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
import { FigureService, FigureRange } from "src/service/figure.service";
import { FigureViewPageComponent } from "./figure-view-page.component";

@Component({
  selector: 'figure-list-page',
  styleUrls: ['./figure-list-page.component.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>{{range?.name || 'All Figures'}}</ion-title>

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
                     [navParams]="{figureId: figure.id}">
        </card-figure>
      </div>

      <ion-fab bottom right>
        <button ion-fab [navPush]="figureEditPage" [navParams]="{range: range}">
          <ion-icon name="add"></ion-icon>
        </button>
      </ion-fab>

      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>
  `
})
export class FigureListPageComponent implements IonViewWillEnter {

  range: FigureRange;
  limit: number;

  figures: Figure[];

  searchPage: Page = SearchPageComponent;
  figureEditPage: Page = FigureEditPageComponent;
  figureViewPage: Page = FigureViewPageComponent;

  constructor(private figureService: FigureService,
              private zone: NgZone,
              navParams: NavParams) {

    this.range = navParams.get('range');

  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewWillEnter(): void {
    this.figureService.getList({range: this.range}).then(figures => {
      this.zone.run(() => {
        this.limit = Math.min(figures.length, 12);
        this.figures = figures;
      });
    });
  }

  /**
   * Incremement number of results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.limit = Math.min(this.figures.length, this.limit + 12);
    event.complete();
  }

}
