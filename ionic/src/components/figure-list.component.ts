import { Component, Input, OnChanges } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { Figure } from "src/entity/figure";
import { FigureViewPageComponent } from "src/pages";

@Component({
  selector: 'bc-figure-list',
  styleUrls: ['./figure-list.component.scss'],
  template: `
    <bc-figure-card *ngFor="let figure of figures | slice: 0: limit"
                 [figure]="figure"
                 [navPush]="figureViewPage"
                 [navParams]="{figureId: figure.id}"></bc-figure-card>

    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  `
})
export class FigureListComponent implements OnChanges {

  @Input() figures: Figure[];
  @Input() perPage = 12;

  figureViewPage: Page = FigureViewPageComponent;
  limit: number = 1;

  /**
   * Reset the limit whenever data is loaded.
   */
  ngOnChanges(): void {
    if (this.figures) {
      this.limit = Math.min(this.figures.length, this.perPage);
    }
  }

  /**
   * Increment number of visible results shown on scroll.
   */
  doInfinite(event: { complete: Function }): void {
    this.limit = Math.min(this.figures.length, this.limit + this.perPage);
    event.complete();
  }

}
