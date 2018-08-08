import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ItemImage } from "src/entity/item-image";

@Directive({
  selector: '[bc-image-view]'
})
export class ImageViewDirective implements OnChanges {

  @HostBinding('style.background-image') background: SafeStyle;
  @Input('bc-image-view') image: ItemImage;

  private defaultImage: string = 'linear-gradient(to top, #ccc, #fafafa, #fafafa, #ccc)';

  constructor(private element: ElementRef,
              private sanitizer: DomSanitizer) {
  }

  ngOnChanges(): void {

    this.background = this.sanitizer.bypassSecurityTrustStyle(`${this.defaultImage}`);

    if (this.image && this.image.url) {

      const img = new Image();

      img.onload = () => {

        const hostElement = this.element.nativeElement as HTMLElement;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const ratio = Math.min(hostElement.clientWidth / img.width, hostElement.clientHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${canvas.toDataURL()}), ${this.defaultImage}`);

      };

      img.src = this.image.url;

    }

  }

}
