import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ItemImage } from "src/entity/item-image";

@Directive({
  selector: '[bc-image-view]'
})
export class ImageViewDirective implements OnChanges {

  @HostBinding('style.background-image') background: SafeStyle;
  @Input('bc-image-view') image: ItemImage;

  private defaultImage: string = 'linear-gradient(to top, #888, #bbb, #bbb, #888)';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(): void {

    const imageUrl = this.image ? `url(${this.image.url}), ` : '';
    this.background = this.sanitizer.bypassSecurityTrustStyle(`${imageUrl}${this.defaultImage}`);

  }

}
