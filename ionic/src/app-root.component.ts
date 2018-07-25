import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { CollectionManagePageComponent, FigureListPageComponent } from "src/pages";

@Component({
  selector: 'bc-app-root',
  template: `
    <ion-nav #nav [root]="rootPage"></ion-nav>
  `
})
export class AppRootComponent {

  // rootPage: Page = CollectionManagePageComponent;
  rootPage: object = FigureListPageComponent;
  //rootPage: object = StyleguidePageComponent;

}
