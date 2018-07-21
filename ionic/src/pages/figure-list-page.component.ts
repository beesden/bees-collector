import { Component, NgZone } from '@angular/core';
import { MenuController, NavController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { CollectionListPageComponent } from "src/pages/collection-list-page.component";
import { FigureEditPageComponent } from "src/pages/figure-edit-page.component";
import { HighlightsPageComponent } from "src/pages/highlights-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
import { FigureFilters, FigureRange, FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-list',
  styleUrls: ['./figure-view-page.component.scss'],
  template: `
    <ion-header>

      <ion-navbar>

        <button menuToggle="menu2">
          <ion-icon name="menu"></ion-icon>
        </button>

        <ion-title>My Figures</ion-title>

        <ion-buttons end>
          <button [navPush]="searchPage">
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>

    </ion-header>

    <ion-content #content>

      <ion-spinner *ngIf="!figures"></ion-spinner>

      <ng-container *ngIf="figures?.length > 0">
        <header *ngIf="filters.range || filters.series">
          <h1>{{filters.series}}</h1>
          <p>{{filters.range || 'All figures'}}</p>
        </header>

        <bc-figure-list [figures]="figures"></bc-figure-list>
      </ng-container>


      <ng-container *ngIf="figures?.length === 0">

        <article class="emptyState">
          <ion-icon name="person"></ion-icon>

          <h1>You have not added any figures.</h1>
          <p>Track your action figure collection by added figures here, and assigning them to ranges or collections.</p>
        </article>

      </ng-container>

    </ion-content>

    <ion-menu id="menu2" [content]="content">

      <!-- App navigation -->
      <button class="menu-item" role="button" (click)="setFilter()" [ngClass]="{selected: !filters.range && !filters.series}">
        <ion-icon name="body"></ion-icon>
        <header>All Figures</header>
      </button>
      <button class="menu-item" (click)="openPage(highlightsPage)">
        <ion-icon name="star-outline"></ion-icon>
        <header>Highlights</header>
      </button>
      <button class="menu-item" (click)="openPage(collectionListPage)">
        <ion-icon name="bookmark"></ion-icon>
        <header>Collections</header>
      </button>

      <!-- Series -->
      <ng-container *ngFor="let group of groups">
        <hr/>
        <h2 class="menu-title">{{group.name}}</h2>

        <button class="menu-item" role="button" *ngFor="let range of group.ranges" (click)="setFilter(range.series, range.name)" [ngClass]="{selected: filters.range === range.name && filters.series === range.series}">
          <ion-icon name="albums"></ion-icon>
          <header>
            {{range.name}}
            <span *ngIf="range.year">{{range.year | date: 'yyyy'}}</span>
          </header>
          <aside>{{range.owned}} / {{range.figures}}</aside>
        </button>

        <!-- View all in series -->
        <button class="menu-item" role="button" (click)="setFilter(group.name)" [ngClass]="{selected: !filters.range && filters.series === group.name}">
          <ion-icon name="albums"></ion-icon>
          <header>All</header>
          <aside>{{group.owned}} / {{group.figures}}</aside>
        </button>

      </ng-container>

    </ion-menu>

    <button bc-fab *ngIf="figures" [navPush]="figureEditPage" [navParams]="{range: range}">
      <ion-icon name="add"></ion-icon>
    </button>
  `
})
export class FigureListPageComponent implements IonViewDidEnter {

  filters: FigureFilters = {};

  groups: { name: string, figures: number, owned: number, ranges: FigureRange[] }[];
  figures: Figure[];

  searchPage: Page = SearchPageComponent;
  collectionListPage: Page = CollectionListPageComponent;
  highlightsPage: Page = HighlightsPageComponent;
  figureEditPage: Page = FigureEditPageComponent;

  constructor(private figureService: FigureService,
              private menu: MenuController,
              private nav: NavController,
              private zone: NgZone) {
  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewDidEnter(): void {

    this.figureService.getList(this.filters).then(figures => {
      this.zone.run(() => this.figures = figures);
    });

    this.figureService.getRanges().then(ranges => this.groupRanges(ranges));
  }

  /**
   * Push a page into the parent navigation.
   *
   * @parma page
   */
  openPage(page: Page): void {

    this.menu.close().then(() => {
      this.nav.push(page)
    });

  }

  /**
   * Apply filters and refresh the content.
   *
   * @param {string} series
   * @param {string} range
   */
  setFilter(series ?: string, range ?: string) {

    this.menu.close().then(() => {
      this.filters.series = series;
      this.filters.range = range;
      this.ionViewDidEnter();
    });

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
        group.owned += range.owned;
        group.figures += range.figures;
        group.ranges.push(range);
      } else {
        this.groups.push({name: range.series, figures: range.figures, owned: range.owned, ranges: [range]});
      }
    });

  }

}
