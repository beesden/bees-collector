import { Component } from '@angular/core';
import { FigureListPageComponent } from "src/pages";

@Component({
  selector: 'bc-app-root',
  template: `
    <ion-nav #nav [root]="rootPage"></ion-nav>
  `
})
export class AppRootComponent {

  rootPage: object = FigureListPageComponent;
  //rootPage: object = StyleguidePageComponent;

}
