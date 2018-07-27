import { Component, HostBinding, Input } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from "ionic-angular";
import { FigureAccessory } from "src/entity/figure-accessory";
import { AccessoryEditPageComponent } from "src/pages";
import { ImageService } from "src/service";
import { AccessoryService } from "src/service/accessory.service";

@Component({
  selector: 'bc-accessory-card',
  styleUrls: ['./accessory-card.component.scss'],
  template: `
    <figure [bc-image-view]="accessory.images[0]"></figure>

    <header>
      <h2>{{accessory.name}}</h2>
      <p *ngIf="accessory.variant">{{accessory.variant}}</p>
    </header>

    <nav class="actions">
      <button (click)="showMenu()">
        <ion-icon name="more"></ion-icon>
      </button>

      <bc-status-button [status]="accessory.status" (toggle)="toggleCollected()"></bc-status-button>
    </nav>
  `
})
export class AccessoryCardComponent {

  @HostBinding('class.deleted') deleted: boolean = false;
  @Input() accessory: FigureAccessory;

  constructor(private accessoryService: AccessoryService,
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private imageService: ImageService,
              private navCtrl: NavController) {
  }

  /**
   * Show additional options.
   */
  showMenu(): void {

    this.actionSheetCtrl.create()
      .addButton({icon: 'create', text: 'Edit info', handler: () => this.editAccessory()})
      .addButton({icon: 'camera', text: 'Change image', handler: () => this.changeImage()})
      .addButton({icon: 'trash', text: 'Remove accessory', handler: () => this.deleteAccessory()})
      .present();

  }

  /**
   * Change the accessory image.
   */
  changeImage(): void {

    this.imageService.create()
      .then(image => this.accessory.images = [image])
      .then(() => this.accessoryService.save(this.accessory));

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
    this.navCtrl.push(AccessoryEditPageComponent, {accessoryId: this.accessory.id});
  }

  /**
   * Toggle if the accessory is collected.
   */
  toggleCollected(): void {
    this.accessory.collected = !this.accessory.collected;
    this.accessoryService.save(this.accessory);
  }

}
