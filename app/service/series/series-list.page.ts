import { Component } from '@angular/core';
import { Figure, FigureService } from "../figure/figure.service";
import { ModalController, NavParams } from "ionic-angular";
import { FigureEditPage } from "../figure/figure-edit.page";
import { Page } from "ionic-angular/navigation/nav-util";
import { Series } from "./series";
import { SeriesService } from "./series.service";
import { CollectionViewPage } from "./collection-view.page";
import { FigureListPage } from "../figure/figure-list.page";

@Component({
  selector: 'page:collection-list',
  styleUrls: ['./series-list.page.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-title>My Collections</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content>
      <div class="content-grid">
        <card-collection *ngFor="let collection of collections"
                         [collection]="collection"
                         [navPush]="figureListPage"
                         [navParams]="{collection: collection}"></card-collection>
      </div>
    </ion-content>
  `
})
export class SeriesListPage {

  figureListPage: Page = FigureListPage;
  collections: Series[];

  constructor(collectionService: SeriesService) {
    collectionService.getList().then(collections => this.collections = collections);
  }

}
