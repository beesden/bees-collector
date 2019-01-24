import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { timer } from "rxjs/internal/observable/timer";
import { Figure } from "src/app/entity/figure";
import { FigureService } from "src/app/service/figure.service";

@Component({
  selector: 'bp-search',
  template: `
    <ion-header>

      <!-- todo
      <ion-toolbar>
        <ion-searchbar [debounce]="0" [(ngModel)]="queryInput" (ionChange)="search(queryInput)" (ionClear)="search()"></ion-searchbar>
      </ion-toolbar>
      -->

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="queryInput && !figures"></ion-spinner>
      <p class="bc-type-text" *ngIf="queryInput && figures && !figures?.length">No results found. Please try again.</p>

      <header class="bc-header" *ngIf="figures">
        <p>{{resultCount > 0 ? resultCount + ' results' : 'No results found.'}}</p>
      </header>

      <ng-container *ngIf="figures?.length">

        <section>
          <bc-figure-card *ngFor="let figure of figures"
                          [figure]="figure"></bc-figure-card>
        </section>

        <!-- todo 
        <ion-infinite-scroll (ionInfinite)="doInfinite($event)" [enabled]="resultCount > figures.length">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
        -->
      </ng-container>

    </ion-content>
  `
})
export class SearchPageComponent {

  // @ViewChild(Content) content;

  private readonly perPage = 12;
  private page: number = 0;

  queryInput: string;
  resultCount: number;
  figures: Figure[];

  delay: Subscription;

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

    if (this.delay) {
      this.delay.unsubscribe();
    }

    if (!query) {
      return;
    }

    this.delay = timer(750).subscribe(() => {
      this.figureService.search(query, this.perPage, 0).then(([figures, count]) => {
        this.figures = figures;
        this.resultCount = count;
        // this.content.scrollToTop();
      });
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
