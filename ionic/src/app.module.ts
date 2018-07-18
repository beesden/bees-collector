import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";
import { IonicApp, IonicModule } from "ionic-angular";
import { AppRootComponent } from 'src/app-root.component';

import { CollectionCardComponent, FigureCardComponent, FigureListComponent } from "src/components";
import { CollectionViewPageComponent, FigureEditPageComponent, FigureListPageComponent, FigureViewPageComponent, RangesPageComponent, SearchPageComponent, TabsPageComponent } from "src/pages";
import { CollectionListPageComponent } from "src/pages/collection-list-page.component";
import { CollectionService, ConnectionService, FigureService } from "src/service";

const pages = [
  TabsPageComponent,
  SearchPageComponent,

  CollectionListPageComponent,
  CollectionViewPageComponent,

  FigureListPageComponent,
  FigureEditPageComponent,
  FigureViewPageComponent,

  RangesPageComponent,
];

@NgModule({
  declarations: [
    AppRootComponent,
    CollectionCardComponent,
    FigureListComponent,
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
