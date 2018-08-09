import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ItemImage } from "src/entity/item-image";
import { ImageService } from "src/service";

@Directive({
  selector: '[bc-image-view]'
})
export class ImageViewDirective implements OnChanges {

  @HostBinding('style.background-image') background: SafeStyle;
  @Input('bc-image-view') image: ItemImage;

  private defaultImage: string = 'linear-gradient(to top, #ccc, #fafafa, #fafafa, #ccc)';

  constructor(private element: ElementRef,
              private imageService: ImageService,
              private sanitizer: DomSanitizer) {
  }

  ngOnChanges(): void {

    if (this.image && this.image.url) {

      this.background = null;
      this.imageService.loadImage(this.image.url, this.element.nativeElement.clientWidth, this.element.nativeElement.clientHeight)
        .then(dataUrl => this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${dataUrl}), ${this.defaultImage}`));

    } else {
      this.background = this.sanitizer.bypassSecurityTrustStyle(`${this.defaultImage}`);
    }

  }

}
