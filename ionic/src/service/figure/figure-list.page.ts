import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Series } from "../series/series";
import { FigureViewPage } from "./figure-view.page";
import { Figure, FigureService } from "./figure.service";

@Component({
  selector: 'page:figure-list',
  styleUrls: ['./figure-list.page.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title *ngIf="!searchToggle">{{series?.name || 'My Figures'}}</ion-title>
        <ion-searchbar *ngIf="searchToggle" [(ngModel)]="searchFilter" (ionInput)="filterResults(searchFilter)"></ion-searchbar>

        <ion-buttons start>
          <button (click)="searchToggle = !searchToggle" ion-button>
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <div class="content-grid">
        <card-figure *ngFor="let figure of results | slice: 0: limit"
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
export class FigureListPage {

  private figures: Figure[];
  series: Series;
  results: Figure[];

  figureViewPage: Page = FigureViewPage;
  searchToggle: boolean;

  searchFilter: string;
  limit: number;


  constructor(private figureService: FigureService,
              navParams: NavParams) {

    this.series = navParams.get('series');
    this.figureService.getList({series: this.series}).then(figures => {
      this.figures = figures;
      this.filterResults();
    });
  }

  filterResults(search: string = ''): void {
    this.limit = 12;
    this.results = this.figures.filter(figure => figure.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  doInfinite(event: {complete: Function} ): void {
    this.limit += 12;
    event.complete();
  }

}
