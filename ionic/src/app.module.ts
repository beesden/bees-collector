import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";
import { IonicApp, IonicModule } from "ionic-angular";
import { AppRootComponent } from 'src/app-root.component';

import { CollectionCardComponent, FigureCardComponent, FigureListComponent } from "src/components";
import * as Pages from "src/pages";
import { CollectionService, ConnectionService, FigureService } from "src/service";

const pages = [
  Pages.HighlightsPageComponent,
  Pages.SearchPageComponent,

  Pages.CollectionEditPageComponent,
  Pages.CollectionListPageComponent,
  Pages.CollectionViewPageComponent,

  Pages.FigureListPageComponent,
  Pages.FigureEditPageComponent,
  Pages.FigureViewPageComponent
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
      mode: 'md',
      scrollAssist: true,
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
