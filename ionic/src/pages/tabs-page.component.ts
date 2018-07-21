import { Component } from '@angular/core';
import { CollectionListPageComponent } from "src/pages/collection-list-page.component";
import { FigureListPageComponent } from "src/pages/figure-list-page.component";
import { RangesPageComponent } from "src/pages/ranges-page.component";

@Component({
  selector: 'bp-tabs',
  template: `
    <ion-tabs>
      <ion-tab tabIcon="person" tabTitle="Figures" [root]="figuresPage"></ion-tab>
      <ion-tab tabIcon="photos" tabTitle="Collections" [root]="collectionsPage"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPageComponent {

  rangesPage = RangesPageComponent;
  figuresPage = FigureListPageComponent;
  collectionsPage = CollectionListPageComponent;

}
