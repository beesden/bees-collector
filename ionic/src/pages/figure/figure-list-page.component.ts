import { Component, NgZone } from '@angular/core';
import { ModalController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { IonViewWillEnter } from "src/ionic-lifecycle";
import { FigureEditPageComponent } from "src/pages/figure/figure-edit-page.component";
import { SearchPageComponent } from "src/pages/search-page.component";
import { FigureService } from "src/service/figure.service";

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

      <header class="bc-header" *ngIf="figures">
        <h1 class="bc-type-title">All figures</h1>
        <hr />
        <p>{{total}} figures</p>
      </header>

      <ng-container *ngIf="figures?.length > 0">

        <section>
          <bc-figure-card *ngFor="let figure of figures"
                          [figure]="figure"></bc-figure-card>
        </section>

        <ion-infinite-scroll (ionInfinite)="doInfinite($event)" [enabled]="total > figures.length">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ng-container>

      <article class="bc-empty" *ngIf="figures?.length === 0">
        <ion-icon name="person"></ion-icon>

        <h1 class="bc-type-title">You have not added any figures.</h1>
        <p class="bc-type-text">Track your action figure collection by added figures here, and assigning them to ranges or collections.</p>
      </article>

    </ion-content>

    <button class="bc-button bc-button--fab" *ngIf="figures" (click)="addFigure()">
      <ion-icon name="add"></ion-icon>
    </button>
  `
})
export class FigureListPageComponent implements IonViewWillEnter {

  private readonly perPage: number = 12;
  private page: number = 1;

  total: number;

  searchPage: Page = SearchPageComponent;
  figures: Figure[];

  constructor(private figureService: FigureService,
              private modalCtrl: ModalController,
              private zone: NgZone) {
  }

  ionViewWillEnter(): void {

    // Fetch all up to the current page.
    const refreshCount = this.perPage * this.page;

    this.figureService.getList(refreshCount, 0).then(([collections, total]) => {
      this.total = total;
      this.zone.run(() => this.figures = collections);
    });

  }

  doInfinite(event: { complete: Function }): void {
    this.figureService.getList(this.perPage, this.page++).then(([figures]) => {
      this.zone.run(() => this.figures = this.figures.concat(figures));
      event.complete();
    });

  }

  addFigure(): void {
    this.modalCtrl.create(FigureEditPageComponent).present();
  }

}
