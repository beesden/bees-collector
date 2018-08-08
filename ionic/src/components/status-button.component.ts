import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectibleState } from "src/entity/collectible";

@Component({
  selector: 'bc-status-button',
  styleUrls: ['./status-button.component.scss'],
  template: `
    <button [ngClass]="'status-' + status + ' layout-' + layout" (click)="onClick($event)" type="button">
      <span *ngIf="statusText">{{statusText}}</span>
      <ion-icon [name]="checked ? 'checkmark' : 'square-outline'"></ion-icon>
    </button>
  `
})
export class StatusButtonComponent {

  @Input() status: CollectibleState;
  @Input() statusText: string;
  @Input() layout: 'button' | 'chip' = 'button';
  @Output() toggle: EventEmitter<Event> = new EventEmitter();

  /**
   * Return true if the checkbox should appear checked.
   */
  get checked(): boolean {
    return this.status !== CollectibleState.UNOWNED;
  }

  /**
   * Handle on click events
   *
   * @param $event
   */
  onClick($event): void {
    $event.stopPropagation();
    this.toggle.emit($event);
  }

}
