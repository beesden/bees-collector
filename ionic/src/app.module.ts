import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";
import { IonicApp, IonicModule } from "ionic-angular";
import { AppRootComponent } from './app-root.component';
import { TabsPage } from "./pages/tabs.page";
import { FigureCardComponent } from "./service/figure/figure-card.component";
import { FigureEditPage } from "./service/figure/figure-edit.page";
import { FigureListPage } from "./service/figure/figure-list.page";
import { FigureViewPage } from "./service/figure/figure-view.page";
import { FigureService } from "./service/figure/figure.service";
import { SeriesCardComponent } from "./service/series/series-card.component";
import { SeriesEditPage } from "./service/series/series-edit.page";
import { SeriesListPage } from "./service/series/series-list.page";
import { SeriesService } from "./service/series/series.service";

const pages = [
  TabsPage,

  FigureListPage,
  FigureEditPage,
  FigureViewPage,

  SeriesListPage,
  SeriesEditPage,
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
