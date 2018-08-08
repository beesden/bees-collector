import { Component, HostListener, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { Figure } from "src/entity/figure";
import { ItemImage } from "src/entity/item-image";
import { FigureViewPageComponent } from "src/pages";
import { FigureService } from "src/service";

@Component({
  selector: 'bc-figure-card',
  styleUrls: ['./figure-card.component.scss'],
  template: `
    <figure [bc-image-view]="coverImage"></figure>

    <header>
      <h2>{{figure.name}}</h2>
      <p class="variant" *ngIf="figure.variant">{{figure.variant}}</p>
    </header>

    <section class="status">
      <ion-icon class="highlight" (click)="toggleHighlight($event)" [ngClass]="{highlighted: figure.highlight}" [name]="figure.highlight ? 'star' : 'star-outline'"></ion-icon>
      <bc-status-button (toggle)="toggleCollected($event)" [status]="figure.status" [statusText]="figure.statusText" layout="chip"></bc-status-button>
    </section>
  `
})
export class FigureCardComponent {

  @Input() figure: Figure;

  constructor(private navCtrl: NavController,
              private figureService: FigureService) {
  }

  get coverImage(): ItemImage {
    return this.figure.images && this.figure.images.length ? this.figure.images[0] : null;
  }

  @HostListener('click') onClick(): void {
    this.navCtrl.push(FigureViewPageComponent, {figureId: this.figure.id});
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
