import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";
import { IonicApp, IonicModule } from "ionic-angular";

import { FigureCardComponent, SeriesCardComponent } from "src/components";
import {
  FigureEditPageComponent,
  FigureListPageComponent,
  FigureViewPageComponent, RangesPageComponent,
  SearchPageComponent,
  TabsPageComponent
} from "src/pages";
import { ConnectionService, FigureService, SeriesService } from "src/service";
import { AppRootComponent } from 'src/app-root.component';

const pages = [
  TabsPageComponent,
  SearchPageComponent,

  FigureListPageComponent,
  FigureEditPageComponent,
  FigureViewPageComponent,

  RangesPageComponent,
];

@NgModule({
  declarations: [
    AppRootComponent,
    SeriesCardComponent,
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
    SeriesService,
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
