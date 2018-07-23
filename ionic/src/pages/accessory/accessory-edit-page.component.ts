import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavParams, ViewController } from "ionic-angular";
import { Figure } from "src/entity/figure";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-accessory-edit',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>{{accessory?.id ? 'Edit Accessory' : 'Add Accessory'}}</ion-title>

        <ion-buttons end>
          <button form="form">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </ion-buttons>

      </ion-navbar>
    </ion-header>

    <ion-content>

      <form #form="ngForm" id="form" *ngIf="accessory" (ngSubmit)="saveChanges(form)">

        <p class="info">* indicates required fields</p>

        <fieldset>
          <legend>Figure name</legend>

          <ion-item>
            <ion-label>Name <span>*</span></ion-label>
            <ion-input name="name" [(ngModel)]="accessory.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Notes</ion-label>
            <ion-textarea name="notes" [(ngModel)]="accessory.notes"></ion-textarea>
          </ion-item>

        </fieldset>

      </form>

    </ion-content>
  `
})
export class AccessoryEditPageComponent {

  private figure: Figure;
  accessory: FigureAccessory;

  constructor(private viewCtrl: ViewController,
              private figureService: FigureService,
              private navParams: NavParams) {

    const figureId = navParams.get('figureId');
    const accessoryId = navParams.get('accessoryId');

    this.figureService.getOne(figureId).then(figure => {

      this.figure = figure;
      this.figure.accessories = this.figure.accessories || [];

      if (accessoryId) {
        this.accessory = figure.accessories.find(accessory => accessory.id === accessoryId);
      } else {
        this.accessory = new FigureAccessory();
        this.figure.accessories.push(this.accessory);
      }
    });

  }

  /**
   * Save any changes made in the form.
   */
  saveChanges(form: NgForm): void {

    if (!form.valid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.figureService.save(this.figure)
      .then(() => this.viewCtrl.dismiss());

  }

}
