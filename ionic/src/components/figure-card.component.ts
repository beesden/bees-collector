import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Figure } from "src/entity";
import { FigureService } from "src/service";

@Component({
  selector: 'bc-figure-card',
  styleUrls: ['./figure-card.component.scss'],
  template: `
    <figure [style.backgroundImage]="image"></figure>

    <header>
      <h2>{{figure.name}}</h2>

      <p class="range">
        {{figure.range}}
        <span *ngIf="figure.release">({{figure.release | date: 'yyyy'}})</span>
      </p>

      <p class="series">{{figure.series}}</p>
    </header>

    <aside>
      <button class="highlight" (click)="toggleHighlight($event)" [ngClass]="{active: figure.highlight}">
        <ion-icon [name]="figure.highlight ? 'star' : 'star-outline'"></ion-icon>
      </button>
    </aside>

    <bc-status-button [status]="figure.status" (toggle)="toggleCollected()"></bc-status-button>
  `
})
export class FigureCardComponent {

  @Input() figure: Figure;

  constructor(private figureService: FigureService,
              private sanitizer: DomSanitizer) {
  }

  // todo - directive
  private defaultImage: string = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw0NDQ4NDg0NDQ4NDQ0NDQ8NDQ0NFREWFhURExMYHSggGBolGxUTIjEhJSkrLi4uFx8zODM4NygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBQQH/8QAMRABAQACAAMGBAUDBQAAAAAAAAECEQMEIRIxQVFSkWFxgbETFBUiMwUjMkJiocHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQG6NABpmmtBnZOyoBOjSgE6OyoBPZZpbATpugBlCgAAAAAAAAAAAAAAAAAABBsAaNBjdNbIDG6bI3QJ0aWzQJ0zTppmgQzS9MsBApgJrGsAAAAAAAAAAAAAAAAAAAbGNgKjZGLkAkbI2RUgMmKtKkVMQRo06SNmIOWk9l9WXL5ydqzU+Pf7OVgONxTY62JsBzsTYuxlgOdSqpAAAAAAAAAAAAAAAAAAAVilWILioyKgKkXIYY29JLb5SbfZweQzv+WsZ70HzSO3C4GWXdL8/B9/C5Xh4+Havneqs7xP9Mxnxt2DhhyUnXPL6TpPdX4vDw/wm78P/U5cDiXvsv1T+Vz+HuDtws/xccsbNeH0edljrp5XVehwODljlvpruvVPMcrcsrcdavnddQedYix9nF5TOS261Pi+WwHLKIsdKig5ZIXkigAAAAAAAAAAAAAAAAAAKxSrEHSLxRF4g+rkeJ2c55X9t+r6+eyzlk3ezZ3Tp1ebHq8T+5wpl4zr9Z3g3lrrhWzvnarljxuJem7fhqOnL/xZfLL7I5TiTG3fjO8G3i8Sd9s+cjPxs/P7L5riY3UnXXi4yb6TxBd42fq+ybx8/Vf+Hficv+2a62d/xfLxMbjdXvB9XauXCtt3dXr9XmZPRx/hvyy+7zqCMnLJ0yc8gc83OumTmAAAAAAAAAAAAAAAAAAArFKsQdIqIlVAdZXof0zid+F8es/7ebK7cDidnKZeVB6mOHZ4fEnl2tfLT4ZXpce/syv+2/Z5vB4mMu8pvXhsH04cvlZvuvhL5O3LcHXWzr4Tyc/z89N9z89PTfcH2Pi5/HrMvpW/n56b7uXMc3M8ddmy9LLsHXG/2L8svu8216GH8F+WX3ebaDK51WVRQc8kLqAAAAAAAAAAAAAAAAAAAGxjYClyobKDpKqVzlaD0uBz/ZxmNxts6b34Os/qU9N93lSqlB6n6jPTfc/UJ6L7x5mzYPT/AFGem+7P1Kem+7zdstB9/H5+ZY5Y9mzc1vb4LU2sAqbS1OwTUqqQAAAAAAAAAAAAAAAAAACBAU1LQU2VIC5Vbc9mwdNm0do2C7WbT2mbBdqbWbYBsYAxjawAAAAAAAAAAAAAAAAAAAgQGgA0Y0GjGgNYAAwGsAGAAVjawAAAAAAAAAAAAAAAAAAAAGwZG7ADZsGjNmwaM2bBozZsGsNmwA2bArCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==';

  get image(): SafeStyle {
    if (this.figure.images && this.figure.images.length) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.figure.images[0].url})`);
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.defaultImage})`);
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
