import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[bc-sortable-handle]'
})
export class SortableHandleDirective {

  constructor(public element: ElementRef) {
  }

}
