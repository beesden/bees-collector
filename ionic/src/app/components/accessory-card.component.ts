import { Component, HostBinding, Input } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from "@ionic/angular";
import { FigureAccessory } from "src/app/entity/figure-accessory";
import { AccessoryEditPageComponent } from "src/app/pages";
import { AccessoryService } from "src/app/service/accessory.service";

@Component({
  selector: 'bc-accessory-card',
  styleUrls: ['./accessory-card.component.scss'],
  template: `
    <header>
      <h2>{{accessory.name}}</h2>
      <p *ngIf="accessory.variant">{{accessory.variant}}</p>
    </header>

    <nav class="actions">
      <button (click)="showMenu()">
        <ion-icon name="more"></ion-icon>
      </button>
    </nav>
  `
})
export class AccessoryCardComponent {

  @HostBinding('class.deleted') deleted: boolean = false;
  @Input() accessory: FigureAccessory;

  constructor(private accessoryService: AccessoryService,
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController) {
  }

  /**
   * Show additional options.
   */
  showMenu(): void {

    this.actionSheetCtrl.create({
      buttons: [
        {icon: 'create', text: 'Edit', handler: () => this.editAccessory()},
        {icon: 'trash', text: 'Remove', handler: () => this.deleteAccessory()}
      ]
    }).then(actionSheet => actionSheet.present());

  }

  /**
   * Permanently remove the accessory.
   */
  deleteAccessory(): void {

    this.alertCtrl.create({
      message: `Delete ${this.accessory.name}?`,
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {
          text: 'Delete',
          handler: () => {
            this.accessoryService.deleteOne(this.accessory.id).then(() => this.deleted = true);
          }
        }
      ]
    }).then(alert => alert.present());

  }

  /**
   * Open the edit accessory page.
   */
  editAccessory(): void {
    this.modalCtrl.create({
      component: AccessoryEditPageComponent,
      componentProps: {accessoryId: this.accessory.id},
    }).then(modal => {
      // modal.onDidDismiss(accessory => this.accessory = accessory);
      modal.present();
    });
  }

}
