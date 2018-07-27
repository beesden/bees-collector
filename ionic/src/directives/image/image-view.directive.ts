import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Image } from "src/entity";

@Directive({
  selector: '[bc-image-view]'
})
export class ImageViewDirective implements OnChanges {

  @HostBinding('style.background-image') background: SafeStyle;
  @Input('bc-image-view') image: Image;

  private defaultImage: string = 'linear-gradient(to right bottom, #888, #aaa, #aaa, #888)';

  constructor(private element: ElementRef,
              private sanitizer: DomSanitizer) {
  }

  ngOnChanges(): void {

    this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${this.image ? this.image.url : ''}), ${this.defaultImage}`);

  }

}
