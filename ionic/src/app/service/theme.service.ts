import { Injectable } from '@angular/core';
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from '@ionic/angular';

@Injectable()
export class ThemeService {

  constructor(private platform: Platform,
              private statusBar: StatusBar) {

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
    });

  }

  /**
   * Helper function to convert RGB values into HEX values.
   *
   * @param rgb
   */
  private toHex(rgb: string): string {
    return rgb.trim().replace(/rgb\((\d+), (\d+), (\d+)\)/, (match, r, g, b) => {
      return '#' + [r, g, b].map(x => {
        const hex = Number.parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }).replace(/^#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3');
  }

  /**
   * Update the page theme
   */
  applyTheme(): void {

    // todo
    const nativeElement = document.querySelector('ion-header');
    const statusBarBackground = getComputedStyle(nativeElement).getPropertyValue('--theme-statusbar-bg') || '#000';
    const lightContent = getComputedStyle(nativeElement).getPropertyValue('--theme-statusbar-style') === 'light' || true;

    if (!this.platform.is('cordova')) {
      console.info('Applying statusbar theme', {statusBarBackground, lightContent});
      return;
    }

    if (lightContent) {
      this.statusBar.styleLightContent();
    } else {
      this.statusBar.styleDefault();
    }

    this.statusBar.backgroundColorByHexString(this.toHex(statusBarBackground));

  }

}
