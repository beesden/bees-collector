import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite } from "@ionic-native/sqlite";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicModule } from "ionic-angular";
import { AppRootComponent } from 'src/app-root.component';

import { CollectionCardComponent, FigureCardComponent, FigureListComponent, StatusButtonComponent } from "src/components";
import { AccessoryCardComponent } from "src/components/accessory-card.component";
import { CollectionListComponent } from "src/components/collection-list.component";
import { ImageViewDirective, SortableDirective, SortableHandleDirective, SortableItemDirective } from "src/directives";
import * as Pages from "src/pages";
import { AccessoryService, BackupService, CollectionService, ConnectionService, FigureService, ImageService, ThemeService } from "src/service";
import { BackupCollectionUtil } from "src/service/backup/backup.collection.util";
import { BackupFigureUtil } from "src/service/backup/backup.figure.util";

const pages = [

  Pages.HighlightsPageComponent,
  Pages.SearchPageComponent,
  Pages.BackupRestorePageComponent,
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

    // Data services
    ConnectionService,
    BackupService,
    FigureService,
    AccessoryService,
    CollectionService,
    ImageService,

    BackupFigureUtil,
    BackupCollectionUtil,

    // Other services
    ThemeService,

    // Ionic Native plugins
    Camera,
    File,
    SplashScreen,
    SQLite,
    StatusBar,

  ],
  bootstrap: [
    IonicApp
  ]
})
export class AppModule {
}
