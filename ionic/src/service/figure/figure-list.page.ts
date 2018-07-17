import { Component, NgZone } from '@angular/core';
import { NavParams } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { Series } from "src/service/series/series";
import { FigureViewPage } from "./figure-view.page";
import { FigureService } from "./figure.service";

@Component({
  selector: 'page:figure-list',
  styleUrls: ['./figure-list.page.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title *ngIf="!searchToggle">{{series?.name || 'My Figures'}}</ion-title>
        <ion-searchbar *ngIf="searchToggle" [(ngModel)]="searchFilter"
                       (ionInput)="filterResults(searchFilter)"></ion-searchbar>

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
export class FigureListPage implements IonViewWillEnter {

  private figures: Figure[];
  series: Series;
  results: Figure[];

  figureViewPage: Page = FigureViewPage;
  searchToggle: boolean;

  searchFilter: string;
  limit: number;

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
      this.figures = figures;
      this.filterResults();
    });
  }

  /**
   * Apply search filters to the result set.
   *
   * @param search search string
   */
  filterResults(search: string = ''): void {
    this.zone.run(() => {
      this.limit = 12;
      console.log(this.figures);
      this.results = this.figures.filter(figure => figure.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
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
