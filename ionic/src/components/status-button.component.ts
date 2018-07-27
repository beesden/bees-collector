import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectableState } from "src/entity/collectable";

@Component({
  selector: 'bc-status-button',
  styleUrls: ['./status-button.component.scss'],
  template: `
    <button [ngClass]="'status-' + status" (click)="onClick($event)" type="button">
      <span *ngIf="withText">{{statusText}}</span>
      <ion-icon [name]="checked ? 'checkbox-outline' : 'square-outline'"></ion-icon>
    </button>
  `
})
export class StatusButtonComponent {

  @Input() status: CollectableState;
  @Input() withText: boolean;
  @Output() toggle: EventEmitter<Event> = new EventEmitter();

  /**
   * Return true if the checkbox should appear checked.
   */
  get checked(): boolean {
    return this.status !== CollectableState.UNOWNED;
  }

  /**
   * Return appropriate text for the current status.
   */
  get statusText(): string {
    switch (this.status) {
      case CollectableState.COMPLETE:
        return 'Owned';
      case CollectableState.INCOMPLETE:
        return 'Partially Owned';
      case CollectableState.UNOWNED:
        return 'Not Owned';
      default:
        return '???';
    }
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
