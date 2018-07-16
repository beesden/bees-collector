import { Component } from '@angular/core';
import { TabsPage } from "./pages/tabs.page";

@Component({
  selector: 'app-root',
  template: `
    <ion-nav #nav [root]="rootPage"></ion-nav>
  `
})
export class AppRootComponent {
  rootPage = TabsPage;
}
