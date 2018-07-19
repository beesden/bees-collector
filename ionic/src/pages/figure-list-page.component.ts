import { Component, NgZone } from '@angular/core';
import { NavParams } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent } from "src/pages/figure-edit-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
import { FigureRange, FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-list',
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>{{range?.name || 'My Figures'}}</ion-title>

        <ion-buttons start>
          <button ion-button [navPush]="searchPage">
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="!figures"></ion-spinner>

      <bc-figure-list [figures]="figures" *ngIf="figures?.length > 0"></bc-figure-list>

      <ion-fab bottom right *ngIf="figures">
        <button ion-fab [navPush]="figureEditPage" [navParams]="{range: range}">
          <ion-icon name="add"></ion-icon>
        </button>
      </ion-fab>

      <ng-container *ngIf="figures?.length === 0">

        <article class="emptyState">
          <ion-icon name="person"></ion-icon>

          <h1>You have not added any figures.</h1>
          <p>Track your action figure collection by added figures here, and assigning them to ranges or collections.</p>
        </article>

      </ng-container>

    </ion-content>
  `
})
export class FigureListPageComponent implements IonViewDidEnter {

  range: FigureRange;
  limit: number;

  figures: Figure[];

  searchPage: Page = SearchPageComponent;
  figureEditPage: Page = FigureEditPageComponent;

  constructor(private figureService: FigureService,
              private zone: NgZone,
              navParams: NavParams) {

    this.range = navParams.get('range');

  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewDidEnter(): void {
    this.figureService.getList({range: this.range}).then(figures => {
      this.zone.run(() => {
        this.limit = Math.min(figures.length, 12);
        this.figures = figures;
      });
    });
  }

}
