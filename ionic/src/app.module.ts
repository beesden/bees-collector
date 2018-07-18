import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";
import { IonicApp, IonicModule } from "ionic-angular";

import { FigureCardComponent, CollectionCardComponent } from "src/components";
import {
  FigureEditPageComponent,
  FigureListPageComponent,
  FigureViewPageComponent, RangesPageComponent,
  SearchPageComponent,
  TabsPageComponent
} from "src/pages";
import { CollectionListPageComponent } from "src/pages/collection-list-page.component";
import { ConnectionService, FigureService, CollectionService } from "src/service";
import { AppRootComponent } from 'src/app-root.component';

const pages = [
  TabsPageComponent,
  SearchPageComponent,

  CollectionListPageComponent,

  FigureListPageComponent,
  FigureEditPageComponent,
  FigureViewPageComponent,

  RangesPageComponent,
];

@NgModule({
  declarations: [
    AppRootComponent,
    CollectionCardComponent,
    FigureCardComponent,
    ...pages
  ],
  entryComponents: [
    AppRootComponent,
    ...pages
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppRootComponent, {
      spinner: 'crescent',
      tabsHideOnSubPages: true
    })
  ],
  providers: [
    // Local services
    ConnectionService,
    CollectionService,
    FigureService,

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
