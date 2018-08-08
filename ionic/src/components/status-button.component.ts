import { Component, Input } from '@angular/core';

@Component({
  selector: 'bc-status-button',
  styleUrls: ['./status-button.component.scss'],
  template: `
    <button [ngClass]="checked ? 'checked' : 'unchecked'" type="button">
      <span><ng-content></ng-content></span>
      <ion-icon name="checkmark"></ion-icon>
    </button>
  `
})
export class StatusButtonComponent {

  @Input() checked: boolean;

}
