import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavParams, ViewController } from "ionic-angular";
import { Figure } from "src/entity/figure";
import { FigureProperty } from "src/entity/figure-property";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-figure-edit',
  styleUrls: ['./figure-edit-page.component.scss'],
  template: `
    <ion-header>
      <ion-navbar>

        <button class="close-button" (click)="viewCtrl.dismiss()">
          <ion-icon name="close"></ion-icon>
        </button>

        <ion-title>{{figure?.id ? 'Edit Figure' : 'Add Figure'}}</ion-title>

        <ion-buttons end>
          <button form="form">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <form #form="ngForm" id="form" *ngIf="figure" (ngSubmit)="saveChanges(form)">

        <p class="info">* indicates required fields</p>

        <fieldset>
          <legend>Figure name</legend>

          <ion-item>
            <ion-label>Character <span>*</span></ion-label>
            <ion-input name="name" [(ngModel)]="figure.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Variant</ion-label>
            <ion-input name="variant" [(ngModel)]="figure.variant"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Notes</ion-label>
            <ion-textarea name="notes" [(ngModel)]="figure.notes"></ion-textarea>
          </ion-item>

        </fieldset>

        <fieldset>
          <legend>Series / Range</legend>

          <ion-item>
            <ion-label>Release date</ion-label>
            <ion-datetime name="release" displayFormat="YYYY" [(ngModel)]="figure.release"></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-label>Manufacturer</ion-label>
            <ion-input name="manufacturer" [(ngModel)]="figure.manufacturer"></ion-input>
          </ion-item>

        </fieldset>

        <fieldset>
          <legend>Additional info</legend>

          <div class="figure-properties" *ngFor="let property of figure.properties; let idx = index">

            <ion-item>
              <ion-label>Label <span>*</span></ion-label>
              <ion-input [name]="'property_name_' + idx" [(ngModel)]="property.name" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Value <span>*</span></ion-label>
              <ion-input [name]="'property_value_' + idx" [(ngModel)]="property.value" required></ion-input>
            </ion-item>

            <button class="bc-button bc-button--text" type="button" (click)="removeProperty(idx)">
              <ion-icon name="close"></ion-icon>
            </button>

          </div>

          <div class="figure-property-add">
            <button class="bc-button bc-button--text" type="button" (click)="addProperty()">Add</button>
          </div>

        </fieldset>

        <fieldset>
          <legend>Tags:</legend>
          <bc-tag-manager name="tags" [(ngModel)]="figure.tags"></bc-tag-manager>
        </fieldset>
        
        {{figure.tags}}
        
      </form>

    </ion-content>
  `
})
export class FigureEditPageComponent {

  figure: Figure;

  constructor(private figureService: FigureService,
              private navParams: NavParams,
              public viewCtrl: ViewController) {

    const figureId = navParams.get('figureId');
    if (figureId) {

      // Edit an existing figure
      this.figureService.getOne(figureId).then(figure => {
        this.figure = figure;
        this.figure.properties = this.figure.properties || [];
      });

    } else {

      // Create a new figure
      this.figure = new Figure();
      this.figure.properties = [];

    }

  }

  /**
   * Add the new property into the form.
   */
  addProperty(): void {
    this.figure.properties.push(new FigureProperty());
  }

  /**
   * Remove a custom property row from the form.
   */
  removeProperty(idx: number): void {
    this.figure.properties.splice(idx, 1);
  }

  /**
   * Save any changes made in the form.
   */
  saveChanges(form: NgForm): void {

    if (!form.valid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.figureService.save(this.figure).then(figure => this.viewCtrl.dismiss(figure));

  }

}
