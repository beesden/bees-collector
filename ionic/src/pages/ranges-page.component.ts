import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { FigureListPageComponent } from "src/pages/figure-list-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
import { FigureRange, FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-ranges',
  styleUrls: ['./ranges-page.component.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>Ranges</ion-title>

        <ion-buttons start>
          <button ion-button [navPush]="searchPage">
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <ion-list>
        <ng-container *ngFor="let entry of entries">

          <ion-list-header>{{entry.name}}</ion-list-header>

          <ion-item *ngFor="let range of entry.ranges" [navPush]="figureListPage" [navParams]="{range: range}">
            <ion-icon item-left name="albums"></ion-icon>
            <h2>{{range.name}} ({{range.owned}} / {{range.figures}})</h2>
            <p>{{range.year | date: 'yyyy'}}</p>
          </ion-item>

        </ng-container>
      </ion-list>

    </ion-content>
  `
})
export class RangesPageComponent {

  searchPage: Page = SearchPageComponent;
  figureListPage: Page = FigureListPageComponent;

  entries: { name: string, ranges: FigureRange[] }[];

  constructor(figureService: FigureService) {
    figureService.getRanges().then(ranges => this.groupRanges(ranges));
  }

  /**
   * Group the ranges by series name.
   *
   * @param ranges
   */
  private groupRanges(ranges: FigureRange[]) {

    this.entries = [];

    ranges.forEach(range => {
      const entry = this.entries.find(series => series.name === range.series);
      if (entry) {
        entry.ranges.push(range);
      } else {
        this.entries.push({name: range.series, ranges: [range]});
      }
    });

  }

}
