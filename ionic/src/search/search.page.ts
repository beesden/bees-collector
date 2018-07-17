import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { FigureViewPage } from "src/figure/figure-view.page";
import { FigureService } from "src/service/figure.service";
import { Series } from "src/service/series/series";

@Component({
  selector: 'page:figure-list',
  styleUrls: ['./search.page.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-searchbar [(ngModel)]="query" (ionChange)="search(query)" [showCancelButton]="true" autofocus></ion-searchbar>
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

      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>
  `
})
export class SearchPage {

  query: string;
  limit: number;

  figures: Figure[];
  series: Series;

  figureViewPage: Page = FigureViewPage;

  constructor(private figureService: FigureService) {

  }

  search(query: string) {

    this.limit = 12;

    this.figureService.search(query).then((figures) => {
      this.figures = figures;
    })
  }

  /**
   * Incremement number of results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.limit += 12;
    event.complete();
  }

}
