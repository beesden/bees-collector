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

      <ion-spinner *ngIf="!groups"></ion-spinner>

      <dl class="groups" *ngIf="groups?.length > 0">
        <ng-container *ngFor="let group of groups">

          <dt class="series">{{group.name}}</dt>

          <dd class="range" *ngFor="let range of group.ranges" [navPush]="figureListPage" [navParams]="{range: range}">
            <ion-icon item-left name="albums"></ion-icon>

            <header>
              <h2>{{range.name}}</h2>
              <p *ngIf="range.year">{{range.year | date: 'yyyy'}}</p>
            </header>
            
            <div>{{range.owned}} / {{range.figures}}</div>
          </dd>

        </ng-container>
      </dl>

      <ng-container *ngIf="groups?.length === 0">

        <article class="emptyState">
          <ion-icon name="folder-open"></ion-icon>

          <h1>You currently have not added any ranges.</h1>
          <p>Set the series / range fields when adding or editing a Figure to group them.</p>
        </article>

      </ng-container>

    </ion-content>
  `
})
export class RangesPageComponent {

  searchPage: Page = SearchPageComponent;
  figureListPage: Page = FigureListPageComponent;

  groups: { name: string, ranges: FigureRange[] }[];

  constructor(figureService: FigureService) {
    figureService.getRanges().then(ranges => this.groupRanges(ranges));
  }

  /**
   * Group the ranges by series name.
   *
   * @param ranges
   */
  private groupRanges(ranges: FigureRange[]) {

    this.groups = [];

    ranges.forEach(range => {
      const group = this.groups.find(series => series.name === range.series);
      if (group) {
        group.ranges.push(range);
      } else {
        this.groups.push({name: range.series, ranges: [range]});
      }
    });

  }

}
