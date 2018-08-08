import { Component, ViewChild } from '@angular/core';
import { Content } from "ionic-angular";
import { Figure } from "src/entity/figure";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-search',
  template: `
    <ion-header>

      <ion-navbar>
        <ion-searchbar [(ngModel)]="queryInput" (ionChange)="search(queryInput)" (ionClear)="search()"></ion-searchbar>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="queryInput && !figures"></ion-spinner>
      <p class="bc-type-text" *ngIf="queryInput && figures && !figures?.length">No results found. Please try again.</p>
      
      <header class="bc-header" *ngIf="figures">
        <p>{{resultCount > 0 ? resultCount + ' results' : 'No results found.'}}</p>
      </header>

      <ng-container *ngIf="figures?.length">

        <section class="bc-figure-grid">
          <bc-figure-card *ngFor="let figure of figures"
                          [figure]="figure"></bc-figure-card>
        </section>

        <ion-infinite-scroll (ionInfinite)="doInfinite($event)" [enabled]="resultCount > figures.length">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ng-container>

    </ion-content>
  `
})
export class SearchPageComponent {

  @ViewChild(Content) content;

  private readonly perPage = 12;
  private page: number = 0;

  queryInput: string;
  resultCount: number;
  figures: Figure[];

  constructor(private figureService: FigureService) {
  }

  /**
   * Perform a search using the query string.
   *
   * @param query
   */
  search(query: string = '') {

    delete this.figures;
    delete this.resultCount;

    if (!query) {
      return;
    }

    this.figureService.search(query, this.perPage, 0).then(([figures, count]) => {
      this.figures = figures;
      this.resultCount = count;
      this.content.scrollToTop();
    });

  }

  /**
   * Increment number of visible results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.figureService.search(this.queryInput, this.perPage, this.page++).then(([figures]) => {
      this.figures = this.figures.concat(figures);
      event.complete();
    });

  }

}
