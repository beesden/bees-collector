import { Component } from '@angular/core';
import { FigureListPageComponent } from "src/pages/figure-list-page.component";
import { RangesPageComponent } from "src/pages/ranges-page.component";

@Component({
  selector: 'tabs-page',
  template: `
    <ion-tabs tabsPlacement="top" tabsLayout="icon-hide">
      <ion-tab tabTitle="Ranges" [root]="rangesPage"></ion-tab>
      <ion-tab tabTitle="Figures" [root]="figuresPage"></ion-tab>
      <ion-tab tabTitle="Collections" [root]="collectionsPage"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPageComponent {

  collectionsPage = RangesPageComponent;
  rangesPage = RangesPageComponent;
  figuresPage = FigureListPageComponent;

}
