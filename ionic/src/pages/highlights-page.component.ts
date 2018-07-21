import { Component } from '@angular/core';
import { Figure } from "src/entity/figure";
import { IonViewDidEnter } from "src/ionic-lifecycle";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-list',
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>Highlights</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <ion-spinner *ngIf="!figures"></ion-spinner>

      <ng-container *ngIf="figures?.length > 0">
        <bc-figure-list [figures]="figures"></bc-figure-list>
      </ng-container>

      <ng-container *ngIf="figures?.length === 0">

        <article class="emptyState">
          <ion-icon name="star"></ion-icon>

          <h1>You have not added any highlights.</h1>
          <p>Highlights can be used to temporarily mark a set of figures, for example to track figures that haven't been delivered yet.</p>
          <p>To more permanently add figures to a set, create a collection.</p>
        </article>

      </ng-container>

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
