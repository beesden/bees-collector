import { Component, Input } from '@angular/core';
import { Figure } from "src/entity";
import { FigureService } from "src/service";

@Component({
  selector: 'bc-figure-card',
  styleUrls: ['./figure-card.component.scss'],
  template: `
    <figure [bc-image-view]="figure.images[0]"></figure>

    <header>
      <h2>{{figure.name}} <span *ngIf="figure.variant">{{figure.variant}}</span></h2>
      <p class="range">{{figure.range}}</p>
    </header>

    <aside>
      <button class="highlight" (click)="toggleHighlight($event)" [ngClass]="{active: figure.highlight}">
        <ion-icon [name]="figure.highlight ? 'star' : 'star-outline'"></ion-icon>
      </button>
    </aside>

    <section class="status">
      <div class="accessories" *ngIf="figure.accessories?.length">
        <ion-icon name="pricetags"></ion-icon>
        {{figure.collectedAccessories}} / {{figure.accessories.length}}
      </div>
      <bc-status-button [status]="figure.status" (toggle)="toggleCollected()"></bc-status-button>
    </section>
  `
})
export class FigureCardComponent {

  @Input() figure: Figure;

  constructor(private figureService: FigureService) {
  }

  toggleCollected(): void {
    this.figure.collected = !this.figure.collected;
    this.figureService.save(this.figure);
  }

  toggleHighlight($event): void {
    $event.stopPropagation();
    this.figure.highlight = !this.figure.highlight;
    this.figureService.save(this.figure);
  }


}
