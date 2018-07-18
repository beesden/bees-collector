import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { Figure, FigureProperty } from "src/entity/figure";
import { FigureService, FigureRange } from "src/service/figure.service";

@Component({
  selector: 'figure-edit-page',
  styleUrls: ['./figure-edit-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>{{figure?.id ? 'Edit Figure' : 'Add Figure'}}</ion-title>

        <ion-buttons end>
          <button ion-button (click)="saveChanges()">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <form #form="ngForm" *ngIf="figure">

        <fieldset>
          <legend>Figure name</legend>

          <ion-item>
            <ion-label>Name</ion-label>
            <ion-input name="name" [(ngModel)]="figure.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Notes</ion-label>
            <ion-textarea name="notes" [(ngModel)]="figure.notes"></ion-textarea>
          </ion-item>

        </fieldset>

        <fieldset>
          <legend>Series / Range</legend>

          <ion-item>
            <ion-label>Series</ion-label>
            <ion-input name="series" [(ngModel)]="figure.series" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Range</ion-label>
            <ion-input name="range" [(ngModel)]="figure.range"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Release date</ion-label>
            <ion-datetime name="release" displayFormat="YYYY" [(ngModel)]="figure.release"></ion-datetime>
          </ion-item>

        </fieldset>

        <fieldset>
          <legend>Additional info</legend>

          <!-- TODO - component -->
          <ion-grid>
            <ion-row *ngFor="let property of figure.properties; let idx = index">
              <ion-col>
                <ion-item>
                  <ion-input [name]="'property_name_' + idx" [(ngModel)]="property.name" placeholder="Name"
                             required></ion-input>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-input [name]="'property_value_' + idx" [(ngModel)]="property.value" placeholder="Value"
                             required></ion-input>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-icon item-end name="trash" role="button" (click)="removeProperty(idx)"></ion-icon>
              </ion-col>
            </ion-row>
          </ion-grid>

          <div padding text-end>
            <button ion-button role="button" (click)="addProperty()">Add</button>
          </div>

        </fieldset>

      </form>

    </ion-content>
  `
})
export class FigureEditPageComponent {

  figure: Figure;

  constructor(private viewCtrl: ViewController,
              private figureService: FigureService,
              navParams: NavParams) {

    const figureId = navParams.get('figureId');
    if (figureId) {

      this.figureService.getOne(figureId)
        .then(figure => this.figure = figure);
    } else {
      this.figure = new Figure();

      const range = navParams.get('range') as FigureRange;
      if (range) {
        this.figure.range = range.name;
        this.figure.series = range.series;
      }
    }

  }

  /**
   * Add a custom property row to the form.
   */
  addProperty(): void {
    if (!this.figure.properties) {
      this.figure.properties = [];
    }

    const prop = new FigureProperty();
    this.figure.properties.push(prop);
  }

  /**
   * Remove a custom property row from the form.
   */
  removeProperty(idx: number): void {
    this.figure.properties.splice(idx, 1);
  }

  /**
   * Close the form.
   */
  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * Save any changes made in the form.
   */
  saveChanges(): void {
    this.figureService.saveFigure(this.figure).then(() => this.dismiss());
  }
}
