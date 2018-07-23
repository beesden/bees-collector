import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ActionSheetController, AlertController, NavController } from "ionic-angular";
import { FigureAccessory } from "src/entity/figure-accessory";
import { AccessoryEditPageComponent } from "src/pages";
import { FigureService } from "src/service";
import { AccessoryService } from "src/service/accessory.service";

@Component({
  selector: 'bc-accessory-card',
  styleUrls: ['./accessory-card.component.scss'],
  template: `
    <figure [style.backgroundImage]="image"></figure>

    <header>
      <h2>{{accessory.name}}</h2>
      <p *ngIf="accessory.notes">{{accessory.notes}}</p>
    </header>

    <nav class="more">
      <button (click)="showMenu()">
        <ion-icon name="more"></ion-icon>
      </button>

    </nav>

    <nav class="status">
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
              private navCtrl: NavController,
              private sanitizer: DomSanitizer) {
  }

  // todo - directive
  private defaultImage: string = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw0NDQ4NDg0NDQ4NDQ0NDQ8NDQ0NFREWFhURExMYHSggGBolGxUTIjEhJSkrLi4uFx8zODM4NygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBQQH/8QAMRABAQACAAMGBAUDBQAAAAAAAAECEQMEIRIxQVFSkWFxgbETFBUiMwUjMkJiocHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQG6NABpmmtBnZOyoBOjSgE6OyoBPZZpbATpugBlCgAAAAAAAAAAAAAAAAAABBsAaNBjdNbIDG6bI3QJ0aWzQJ0zTppmgQzS9MsBApgJrGsAAAAAAAAAAAAAAAAAAAbGNgKjZGLkAkbI2RUgMmKtKkVMQRo06SNmIOWk9l9WXL5ydqzU+Pf7OVgONxTY62JsBzsTYuxlgOdSqpAAAAAAAAAAAAAAAAAAAVilWILioyKgKkXIYY29JLb5SbfZweQzv+WsZ70HzSO3C4GWXdL8/B9/C5Xh4+Havneqs7xP9Mxnxt2DhhyUnXPL6TpPdX4vDw/wm78P/U5cDiXvsv1T+Vz+HuDtws/xccsbNeH0edljrp5XVehwODljlvpruvVPMcrcsrcdavnddQedYix9nF5TOS261Pi+WwHLKIsdKig5ZIXkigAAAAAAAAAAAAAAAAAAKxSrEHSLxRF4g+rkeJ2c55X9t+r6+eyzlk3ezZ3Tp1ebHq8T+5wpl4zr9Z3g3lrrhWzvnarljxuJem7fhqOnL/xZfLL7I5TiTG3fjO8G3i8Sd9s+cjPxs/P7L5riY3UnXXi4yb6TxBd42fq+ybx8/Vf+Hficv+2a62d/xfLxMbjdXvB9XauXCtt3dXr9XmZPRx/hvyy+7zqCMnLJ0yc8gc83OumTmAAAAAAAAAAAAAAAAAAArFKsQdIqIlVAdZXof0zid+F8es/7ebK7cDidnKZeVB6mOHZ4fEnl2tfLT4ZXpce/syv+2/Z5vB4mMu8pvXhsH04cvlZvuvhL5O3LcHXWzr4Tyc/z89N9z89PTfcH2Pi5/HrMvpW/n56b7uXMc3M8ddmy9LLsHXG/2L8svu8216GH8F+WX3ebaDK51WVRQc8kLqAAAAAAAAAAAAAAAAAAAGxjYClyobKDpKqVzlaD0uBz/ZxmNxts6b34Os/qU9N93lSqlB6n6jPTfc/UJ6L7x5mzYPT/AFGem+7P1Kem+7zdstB9/H5+ZY5Y9mzc1vb4LU2sAqbS1OwTUqqQAAAAAAAAAAAAAAAAAACBAU1LQU2VIC5Vbc9mwdNm0do2C7WbT2mbBdqbWbYBsYAxjawAAAAAAAAAAAAAAAAAAAgQGgA0Y0GjGgNYAAwGsAGAAVjawAAAAAAAAAAAAAAAAAAAAGwZG7ADZsGjNmwaM2bBozZsGsNmwA2bArCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==';

  get image(): SafeStyle {
    if (this.accessory.images && this.accessory.images.length) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.accessory.images[0].url})`);
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.defaultImage})`);
  }

  /**
   * Show additional options.
   */
  showMenu(): void {

    this.actionSheetCtrl.create()
      .addButton({icon: 'create', text: 'Edit', handler: () => this.editAccessory()})
      .addButton({icon: 'trash', text: 'Delete', handler: () => this.deleteAccessory()})
      .addButton({icon: 'photo', text: 'Update image', handler: () => this.changeImage()})
      .present();

  }

  /**
   * Change the accessory image.
   */
  changeImage(): void {
    // todo - camera
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
