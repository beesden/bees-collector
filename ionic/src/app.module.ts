import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";
import { IonicApp, IonicModule } from "ionic-angular";
import { AppRootComponent } from 'src/app-root.component';

import { CollectionCardComponent, FigureCardComponent, FigureListComponent, StatusButtonComponent } from "src/components";
import { AccessoryCardComponent } from "src/components/accessory-card.component";
import { CollectionListComponent } from "src/components/collection-list.component";
import { ImageViewDirective, SortableDirective, SortableHandleDirective, SortableItemDirective } from "src/directives";
import * as Pages from "src/pages";
import { AccessoryService, CollectionService, ConnectionService, FigureService } from "src/service";

const pages = [

  Pages.HighlightsPageComponent,
  Pages.SearchPageComponent,
  Pages.StyleguidePageComponent,

  Pages.CollectionEditPageComponent,
  Pages.CollectionListPageComponent,
  Pages.CollectionViewPageComponent,
  Pages.CollectionManagePageComponent,

  Pages.FigureListPageComponent,
  Pages.FigureEditPageComponent,
  Pages.FigureViewPageComponent,

  Pages.AccessoryEditPageComponent,

];

@NgModule({
  declarations: [
    AppRootComponent,

    CollectionCardComponent,
    CollectionListComponent,
    FigureListComponent,
    FigureCardComponent,
    AccessoryCardComponent,
    StatusButtonComponent,

    ImageViewDirective,
    SortableDirective,
    SortableItemDirective,
    SortableHandleDirective,

    ...pages
  ],
  entryComponents: [
    AppRootComponent,
    ...pages
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppRootComponent, {
      mode: 'md',
      scrollAssist: true,
      spinner: 'crescent',
      tabsHideOnSubPages: true
    })
  ],
  providers: [
    // Local services
    ConnectionService,
    FigureService,
    AccessoryService,
    CollectionService,

    // Ionic Native
    Camera,
    SQLite

  ],
  bootstrap: [
    IonicApp
  ]
})
export class AppModule {
}
