import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { Figure } from "src/entity/figure";
import { FigureService } from "./figure.service";

@Component({
  selector: 'page:figure-view',
  template: `
    <ion-header>      
      <ion-navbar>        
        <ion-title>{{figure.name}}</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>

      <form #form="ngForm">

        <ion-list>

          <ion-item>
            <ion-label>Figure name</ion-label>
            <ion-input name="name" [(ngModel)]="figure.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Description</ion-label>
            <ion-textarea name="variant" [(ngModel)]="figure.notes"></ion-textarea>
          </ion-item>

          <ion-item>
            <ion-label>Series</ion-label>
            <ion-input name="range" [(ngModel)]="figure.series"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Range</ion-label>
            <ion-input name="range" [(ngModel)]="figure.range"></ion-input>
          </ion-item>
        </ion-list>
        
        <ion-list>
          
          <ion-item>
            <ion-label>Owned</ion-label>
            <ion-checkbox name="owned" [(ngModel)]="figure.owned"></ion-checkbox>
            <ion-icon name="checkmark" item-right></ion-icon>
          </ion-item>

          <ion-item>
            <ion-label>All Accessories</ion-label>
            <ion-checkbox name="accessories" [(ngModel)]="figure.accessories"></ion-checkbox>
            <ion-icon name="briefcase" item-right></ion-icon>
          </ion-item>

          <ion-item>
            <ion-label>Acceptable Condition</ion-label>
            <ion-checkbox name="quality" [(ngModel)]="figure.condition"></ion-checkbox>
            <ion-icon name="bulb" item-right></ion-icon>
          </ion-item>

        </ion-list>

      </form>

    </ion-content>

    <ion-footer padding>
      <button ion-button block (click)="update()" [disabled]="form.invalid">Save</button>
    </ion-footer>
  `
})
export class FigureEditPage {

  figure: Figure;

  constructor(private viewCtrl: ViewController,
              private figureService: FigureService,
              navParams: NavParams) {

    this.figure = Object.assign({}, navParams.get('figure'));

  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  update(): void {
    this.figureService.saveFigure(this.figure);
  }
}
