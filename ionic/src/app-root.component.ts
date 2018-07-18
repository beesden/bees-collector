import { Component } from '@angular/core';
import { TabsPageComponent } from "src/pages/tabs-page.component";

@Component({
  selector: 'bc-app-root',
  template: `
    <ion-nav #nav [root]="rootPage"></ion-nav>
  `
})
export class AppRootComponent {
  rootPage: object = TabsPageComponent;
}
