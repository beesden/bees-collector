import { Component } from '@angular/core';
import { Figure } from "src/entity/figure";
import { CollectionService } from "src/service";
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

      <p class="bc-type-text" *ngIf="queryInput && figures && !figures?.length">No results found. Please try again.</p>
      <bc-figure-list *ngIf="figures?.length" [figures]="figures"></bc-figure-list>

    </ion-content>
  `
})
export class SearchPageComponent {

  queryInput: string;
  figures: Figure[];

  constructor(private figureService: FigureService) {
  }

  /**
   * Perform a search using the query string.
   *
   * @param query
   */
  search(query: string = '') {

    if (!query) {
      delete this.figures;
      return;
    }

    this.figureService.search(query).then(figures => {
      this.figures = figures;
    });

  }

}
