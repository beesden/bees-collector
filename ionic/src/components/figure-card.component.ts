import { Component, Input } from '@angular/core';
import { Figure } from "src/entity";
import { FigureService } from "src/service";

@Component({
  selector: 'bc-figure-card',
  styleUrls: ['./figure-card.component.scss'],
  template: `
    <figure [bc-image-view]="figure.images[0]"></figure>

    <header>
      <h2>{{figure.name}}</h2>
      <p class="range">{{figure.variant || figure.range}}</p>
    </header>

    <section class="status">
      <ion-icon class="highlight" (click)="toggleHighlight($event)" [ngClass]="{highlighted: figure.highlight}" [name]="figure.highlight ? 'star' : 'star-outline'"></ion-icon>      
      <bc-status-button (toggle)="toggleCollected($event)" [status]="figure.status"></bc-status-button>
    </section>
  `
})
export class FigureCardComponent {

  @Input() figure: Figure;

  constructor(private figureService: FigureService) {
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
