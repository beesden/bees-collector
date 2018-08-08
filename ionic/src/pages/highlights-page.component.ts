import { Component } from '@angular/core';
import { Figure } from "src/entity/figure";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-list',
  template: `
    <ion-header>

      <ion-navbar>

        <button menuToggle="menu">
          <ion-icon name="menu"></ion-icon>
        </button>

        <ion-title>Highlights</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="!figures"></ion-spinner>

      <ng-container *ngIf="figures?.length > 0">
        <section class="bc-figure-grid">
          <bc-figure-card *ngFor="let figure of figures"
                          [figure]="figure"></bc-figure-card>
        </section>

      </ng-container>

      <article class="bc-empty" *ngIf="figures?.length === 0">
        <ion-icon name="star"></ion-icon>

        <h1 class="bc-type-title">You have not added any highlights.</h1>
        <p class="bc-type-text">Highlights can be used to temporarily mark a set of figures, for example to track figures that haven't been delivered yet.</p>
        <p class="bc-type-text">To more permanently add figures to a set, create a collection.</p>
      </article>

    </ion-content>
  `
})
export class HighlightsPageComponent implements IonViewDidEnter {

  figures: Figure[];

  constructor(private figureService: FigureService) {

  }

  /**
   *  Update data whenever the view is opened or returned to.
   */
  ionViewDidEnter(): void {
    this.figureService.getHighlights().then(figures => this.figures = figures);
  }

}
