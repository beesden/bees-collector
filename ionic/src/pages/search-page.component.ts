import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity";
import { Figure } from "src/entity/figure";
import { FigureViewPageComponent } from "src/pages/figure-view-page.component";
import { CollectionService } from "src/service";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'search-page',
  styleUrls: ['./search-page.component.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-searchbar [(ngModel)]="query" (ionChange)="search(query)" [showCancelButton]="true"
                       autofocus></ion-searchbar>
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

  collections: Collection[];
  figures: Figure[];

  figureViewPage: Page = FigureViewPageComponent;

  constructor(private figureService: FigureService,
              private collectionService: CollectionService) {
  }

  /**
   * Perform a search using the query string.
   *
   * @param query
   */
  search(query: string) {

    this.figureService.search(query).then(figures => {
      this.figures = figures;
    });

    this.collectionService.search(query).then(collections => {
      this.collections = collections;
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
