import { Component, HostBinding, Input } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from "ionic-angular";
import { FigureAccessory } from "src/entity/figure-accessory";
import { AccessoryEditPageComponent } from "src/pages";
import { AccessoryService } from "src/service/accessory.service";

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

    this.actionSheetCtrl.create()
      .addButton({icon: 'create', text: 'Edit', handler: () => this.editAccessory()})
      .addButton({icon: 'trash', text: 'Remove', handler: () => this.deleteAccessory()})
      .present();

  }

  /**
   * Permanently remove the accessory.
   */
  deleteAccessory(): void {

    this.alertCtrl.create()
      .setMessage(`Delete ${this.accessory.name}?`)
      .addButton({text: 'Cancel', role: 'cancel'})
      .addButton({
        text: 'Delete',
        handler: () => {
          this.accessoryService.deleteOne(this.accessory.id).then(() => this.deleted = true);
        }
      })
      .present();

  }

  /**
   * Open the edit accessory page.
   */
  editAccessory(): void {
    const modal = this.modalCtrl.create(AccessoryEditPageComponent, {accessoryId: this.accessory.id});
    modal.onDidDismiss(accessory => this.accessory = accessory);
    modal.present();
  }

}
