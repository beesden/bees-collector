import { Component, Input } from '@angular/core';
import { ItemImage } from "src/entity/item-image";

@Component({
  selector: 'bc-image-slider',
  styleUrls: ['./image-slider.component.scss'],
  template: `
    <ion-slides [ngClass]="{'has-image': images?.length}">
      <ion-slide *ngFor="let image of images" [bc-image-view]="image"></ion-slide>
      <button *ngIf="!images?.length">
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-slides>
  `
})
export class ImageSliderComponent {

  @Input() images: ItemImage[];

}
