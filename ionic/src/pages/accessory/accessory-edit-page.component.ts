import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavParams, ViewController } from "ionic-angular";
import { FigureAccessory } from "src/entity/figure-accessory";
import { AccessoryService } from "src/service";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-accessory-edit',
  template: `
    <ion-header>
      <ion-navbar>

        <button class="close-button" (click)="viewCtrl.dismiss()">
          <ion-icon name="close"></ion-icon>
        </button>
        
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
            <ion-label>Variation</ion-label>
            <ion-input name="variant" [(ngModel)]="accessory.variant"></ion-input>
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

  accessory: FigureAccessory;

  constructor(private accessoryService: AccessoryService,
              private figureService: FigureService,
              private navParams: NavParams,
              public viewCtrl: ViewController) {

    const accessoryId = navParams.get('accessoryId');

    if (accessoryId) {
      this.accessoryService.getOne(accessoryId).then(accessory => this.accessory = accessory);
    } else {
      this.accessory = new FigureAccessory();
    }
  }

  /**
   * Save any changes made in the form.
   */
  saveChanges(form: NgForm): void {

    if (!form.valid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.accessoryService.save(this.accessory)
      .then(accessory => {
        const figureId = this.navParams.get('figureId');
        if (figureId) {
          return this.figureService.addAccessoryToFigure(figureId, accessory);
        }
      })
      .then(() => this.viewCtrl.dismiss());

  }

}
