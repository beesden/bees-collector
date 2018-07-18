import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { FigureViewPageComponent } from "src/pages/figure-view-page.component";
import { FigureService } from "src/service/figure.service";
import { Series } from "src/service/series/series";

@Component({
  selector: 'search-page',
  styleUrls: ['./search-page.component.scss'],
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
                     [navParams]="{figureId: figure.id}">
        </card-figure>
      </div>

      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>
  `
})
export class SearchPageComponent {

  query: string;
  limit: number;

  figures: Figure[];
  series: Series;

  figureViewPage: Page = FigureViewPageComponent;

  constructor(private figureService: FigureService) {
  }

  /**
   * Perform a search using the query string.
   *
   * @param query
   */
  search(query: string) {

    this.figureService.search(query).then((figures) => {
      this.limit = Math.min(figures.length, 12);
      this.figures = figures;
    })

  }

  /**
   * Incremement number of results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.limit = Math.min(this.figures.length, this.limit + 12);
    event.complete();
  }

}
