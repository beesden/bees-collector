import { AfterContentInit, ContentChild, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { Platform } from "ionic-angular";
import { UIEventManager } from "ionic-angular/gestures/ui-event-manager";
import { SortableHandleDirective } from "src/directives/reorder/sortable-handle.directive";

@Directive({
  selector: '[bc-sortable-item]'
})
export class SortableItemDirective implements AfterContentInit {

  @ContentChild(SortableHandleDirective) handle;

  @Output() dragStart: EventEmitter<void> = new EventEmitter();
  @Output() dragMove: EventEmitter<void> = new EventEmitter();
  @Output() dragEnd: EventEmitter<void> = new EventEmitter();

  private events: UIEventManager;
  private startPosition: number;
  private currentPosition: number;

  constructor(private platform: Platform,
              public element: ElementRef) {
  }

  /**
   * Distance the item has been dragged.
   */
  get distance(): number {
    return this.currentPosition - this.startPosition;
  }

  /**
   * Height of the item
   */
  get height(): number {
    return this.element.nativeElement.clientHeight;
  }

  /**
   * Relative position of the item within the container.
   */
  get position(): number {
    return this.element.nativeElement.offsetTop;
  }

  ngAfterContentInit(): void {

    const handle: HTMLElement = this.handle ? this.handle.element.nativeElement : this.element.nativeElement;

    this.events = new UIEventManager(this.platform);
    this.events.pointerEvents({
      element: handle,
      pointerDown: event => {
        event.preventDefault();
        this.startPosition = this.currentPosition = event.touches[0].clientY;
        this.dragStart.emit();
        return true;
      },
      pointerMove: event => {
        event.preventDefault();
        this.currentPosition = event.touches[0].clientY;
        this.dragMove.emit();
      },
      pointerUp: event => {
        event.preventDefault();
        this.dragEnd.emit();
      },
      zone: false
    });

  }

}
