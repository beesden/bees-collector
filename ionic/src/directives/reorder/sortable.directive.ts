import { AfterContentInit, ContentChildren, Directive, EventEmitter, Output, QueryList } from '@angular/core';
import { Platform } from "ionic-angular";
import { PointerEvents } from "ionic-angular/gestures/pointer-events";
import { UIEventManager } from "ionic-angular/gestures/ui-event-manager";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs/Subscription";
import { SortableItemDirective } from "src/directives/reorder/sortable-item.directive";

export interface SortableEvent {
  startIdx: number;
  targetIdx: number;
}

@Directive({
  selector: '[bc-sortable]'
})
export class SortableDirective implements AfterContentInit {

  @ContentChildren(SortableItemDirective) items: QueryList<SortableItemDirective>;

  @Output('bc-sortable') onComplete: EventEmitter<{ startIdx: number, targetIdx: number }> = new EventEmitter();

  ngAfterContentInit(): void {

    this.items.changes.pipe(take(1)).subscribe(items => items.forEach(item => {
      item.dragStart.subscribe(() => this.handleStart(item));
      item.dragMove.subscribe(() => this.handleMove(item));
      item.dragEnd.subscribe(() => this.handleEnd(item));
    }));

  }

  handleStart(draggedItem: SortableItemDirective): void {
    this.items
      .filter(sibling => sibling !== draggedItem)
      .forEach(sibling => sibling.element.nativeElement.style.transition = `transform 180ms`);

  }

  handleMove(draggedItem: SortableItemDirective): void {

    const currentPosition = draggedItem.position + draggedItem.distance;
    const itemHeight = draggedItem.height;

    // Move the dragged item the same amount as the movement
    draggedItem.element.nativeElement.style.transform = `translateY(${draggedItem.distance}px)`;
    draggedItem.element.nativeElement.style.zIndex = `1`;

    this.items
      .filter(sibling => sibling !== draggedItem)
      .forEach(sibling => {

        const siblingPosition = sibling.position;

        const isDownward = draggedItem.distance > 0;
        const siblingStartedAbove = sibling.position < draggedItem.position;
        const siblingStartedBelow = sibling.position > draggedItem.position;

        if (isDownward && siblingStartedBelow && currentPosition > siblingPosition) {
          sibling.element.nativeElement.style.transform = `translateY(${-itemHeight}px)`;
        } else if (!isDownward && siblingStartedAbove && currentPosition < siblingPosition) {
          sibling.element.nativeElement.style.transform = `translateY(${itemHeight}px)`;
        } else {
          sibling.element.nativeElement.style.transform = '';
        }

      });

  }

  handleEnd(draggedItem: SortableItemDirective): void {

    // Sort items by original vertical position
    const finalPosition = draggedItem.position + draggedItem.distance;
    const sortedArray = this.items.toArray().sort((a, b) => a.position - b.position);

    const startIdx = sortedArray.findIndex(item => item === draggedItem);
    const targetIdx = sortedArray.findIndex(item => {
      if (draggedItem.distance > 0) {
        return (item.position + item.height) > finalPosition;
      } else if (draggedItem.distance < 0) {
        return item.position > finalPosition;
      }
    });

    if (targetIdx !== -1 && targetIdx !== startIdx) {
      this.onComplete.emit({startIdx, targetIdx});
    }

    // Reset animation states
    this.items.forEach(item => {
      item.element.nativeElement.style.transform = '';
      item.element.nativeElement.style.transition = '';
    });

  }

}
