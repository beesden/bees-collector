import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Image } from "src/entity/image";

@Directive({
  selector: '[bc-image-view]'
})
export class ImageViewDirective implements OnChanges {

  @HostBinding('style.background-image') background: SafeStyle;
  @Input('bc-image-view') images: Image[];

  private defaultImage: string = 'linear-gradient(to right bottom, #888, #bbb, #bbb, #888)';

  constructor(private element: ElementRef,
              private sanitizer: DomSanitizer) {
  }

  ngOnChanges(): void {

    const imageUrl = this.images && this.images.length ? this.images[0].url : '';
    this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${imageUrl}), ${this.defaultImage}`);

  }

}
