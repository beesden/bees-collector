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
  template: `
    <ion-header>

      <ion-navbar>

        <button menuToggle="menu">
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
        <header class="bc-type-header" *ngIf="filters.range || filters.series">
          <h1 class="bc-type-title">{{filters.range || 'All figures'}}</h1>
          <p class="bc-type-text">{{filters.series}}</p>
        </header>

        <bc-figure-list [figures]="figures"></bc-figure-list>
      </ng-container>

      <article class="bc-empty" *ngIf="figures?.length === 0">
        <ion-icon name="person"></ion-icon>

        <h1 class="bc-type-title">You have not added any figures.</h1>
        <p class="bc-type-text">Track your action figure collection by added figures here, and assigning them to ranges or collections.</p>
      </article>

    </ion-content>

    <ion-menu id="menu" [content]="content">

      <ion-header>
        <ion-toolbar>
          <button class="back-button show-back-button" menuToggle>
            <ion-icon name="arrow-back"></ion-icon>
          </button>
        </ion-toolbar>
      </ion-header>

      <ion-content>

        <!-- App navigation -->
        <button class="menu-item" role="button" (click)="setFilter()" [ngClass]="{selected: !filters.range && !filters.series}">
          <ion-icon name="body"></ion-icon>
          <header>All Figures</header>
        </button>
        <button class="menu-item" (click)="openPage(highlightsPage)">
          <ion-icon name="star"></ion-icon>
          <header>Highlights</header>
        </button>
        <button class="menu-item" (click)="openPage(collectionListPage)">
          <ion-icon name="albums"></ion-icon>
          <header>Collections</header>
        </button>

        <!-- Series -->
        <ng-container *ngFor="let group of groups">
          <hr/>
          <h2 class="menu-title">{{group.name}}</h2>

          <!-- View all in series -->
          <button class="menu-item" role="button" (click)="setFilter(group.name)" [ngClass]="{selected: !filters.range && filters.series === group.name}">
            <ion-icon name="bookmark"></ion-icon>
            <header>All in series</header>
            <aside>{{group.owned}} / {{group.figures}}</aside>
          </button>

          <!-- Filter by range -->
          <button class="menu-item" role="button" *ngFor="let range of group.ranges" (click)="setFilter(range.series, range.name)" [ngClass]="{selected: filters.range === range.name && filters.series === range.series}">
            <ion-icon name="bookmark"></ion-icon>
            <header>
              {{range.name}}
              <div *ngIf="range.startYear">
                <span>{{range.startYear | date: 'yyyy'}} </span>
                <span *ngIf="range.endYear !== range.startYear">{{range.endYear | date: 'yyyy'}}</span>
              </div>
            </header>
            <aside>{{range.owned}} / {{range.figures}}</aside>
          </button>

        </ng-container>

      </ion-content>

    </ion-menu>

    <button class="bc-button bc-button--fab" *ngIf="figures" [navPush]="figureEditPage" [navParams]="{range: range}">
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
