import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite } from "@ionic-native/sqlite";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicModule } from "ionic-angular";
import { AppRootComponent } from 'src/app-root.component';

import { AccessoryCardComponent, CollectionCardComponent, FigureCardComponent, StatusButtonComponent, TagManagerComponent } from "src/components";
import { CollectionListComponent } from "src/components/collection-list.component";
import { ImageSliderComponent } from "src/components/image-slider.component";
import { ImageViewDirective, SortableDirective, SortableHandleDirective, SortableItemDirective } from "src/directives";
import * as Pages from "src/pages";
import { AccessoryService, BackupCollectionUtil, BackupFigureUtil, BackupService, CollectionService, ConnectionService, FigureService, ImageService, ThemeService } from "src/service";
import { FileService } from "src/service/file.service";

const pages = [

  Pages.HighlightsPageComponent,
  Pages.SearchPageComponent,
  Pages.BackupRestorePageComponent,
  Pages.StyleguidePageComponent,

  Pages.CollectionEditPageComponent,
  Pages.CollectionListPageComponent,
  Pages.CollectionViewPageComponent,

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
    FigureCardComponent,
    AccessoryCardComponent,
    ImageSliderComponent,
    StatusButtonComponent,
    TagManagerComponent,

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
    FigureService,
    AccessoryService,
    CollectionService,

    FileService,
    ImageService,

    BackupService,
    BackupFigureUtil,
    BackupCollectionUtil,

    // Other services
    ThemeService,

    // Ionic Native cordova
    AndroidPermissions,
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
