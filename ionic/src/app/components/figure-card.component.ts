import { Component, HostListener, Input } from '@angular/core';
import { Figure } from "src/app/entity/figure";
import { ItemImage } from "src/app/entity/item-image";
import { FigureService } from "src/app/service";

@Component({
  selector: 'bc-figure-card',
  styleUrls: ['./figure-card.component.scss'],
  template: `
    <figure [bc-image-view]="coverImage"></figure>

    <header>
      <h2>
        <span class="name">{{figure.data.name}}</span>
        <span class="variant" *ngIf="figure.data.variant">{{figure.data.variant}}</span>
      </h2>
    </header>

    <section class="status">
      <ion-icon class="highlight" (click)="toggleHighlight($event)" [ngClass]="{highlighted: figure.highlight}" [name]="figure.highlight ? 'star' : 'star-outline'"></ion-icon>
    </section>

    <p class="bc-type-status" [ngClass]="figure.status">{{figure.statusText}}</p>
  `
})
export class FigureCardComponent {

  @Input() figure: Figure;

  constructor(private figureService: FigureService) {
  }

  get coverImage(): ItemImage {
    return this.figure.images && this.figure.images.length ? this.figure.images[0] : null;
  }

  @HostListener('click') onClick(): void {
    // this.navCtrl.push(FigureViewPageComponent, {figureId: this.figure.id});
  }

  toggleCollected($event): void {
    $event.stopPropagation();
    this.figure.collected = !this.figure.collected;
    this.figureService.save(this.figure);
  }

  toggleHighlight($event): void {
    $event.stopPropagation();
    this.figure.highlight = !this.figure.highlight;
    this.figureService.save(this.figure);
  }


}
