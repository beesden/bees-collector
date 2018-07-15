import { Component } from '@angular/core';
import { FigureListPage } from "../service/figure/figure-list.page";
import { SeriesListPage } from "../service/series/series-list.page";

@Component({
  selector: 'page:tabs',
  template: `
    <ion-tabs tabsPlacement="top" tabsLayout="icon-hide">
      <ion-tab tabTitle="Figures" [root]="tabPage3"></ion-tab>
      <ion-tab tabTitle="Series" [root]="tabPage1"></ion-tab>
      <ion-tab tabTitle="Collections" [root]="tabPage2"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {

  tabPage1 = SeriesListPage;
  tabPage2 = SeriesListPage;
  tabPage3 = FigureListPage;

}
