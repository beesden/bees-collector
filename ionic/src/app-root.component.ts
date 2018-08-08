import { Component, OnInit } from '@angular/core';
import { SplashScreen } from "@ionic-native/splash-screen";
import { App, Header, MenuController, ViewController } from "ionic-angular";
import { Page } from "ionic-angular/navigation/nav-util";
import { CollectionListPageComponent, FigureListPageComponent } from "src/pages";
import { BackupRestorePageComponent } from "src/pages/backup-restore-page.component";
import { HighlightsPageComponent } from "src/pages/highlights-page.component";
import { ThemeService } from "src/service/theme.service";

@Component({
  selector: 'bc-app-root',
  template: `
    <ion-nav #nav [root]="rootPage"></ion-nav>

    <ion-menu id="menu" [content]="nav">

      <ion-header>
        <ion-toolbar>
          <button class="back-button show-back-button" menuToggle>
            <ion-icon name="arrow-back"></ion-icon>
          </button>
        </ion-toolbar>
      </ion-header>

      <ion-content>

        <!-- App navigation -->
        <button class="menu-item" [ngClass]="{selected: activePage === collectionListPage}" (click)="rootPage = collectionListPage">
          <ion-icon name="home"></ion-icon>
          <header>My Collections</header>
        </button>
        <button class="menu-item" [ngClass]="{selected: activePage === figureListPage}" (click)="rootPage = figureListPage">
          <ion-icon name="body"></ion-icon>
          <header>Tags</header>
        </button>
        <button class="menu-item" [ngClass]="{selected: activePage === figureListPage}" (click)="rootPage = figureListPage">
          <ion-icon name="body"></ion-icon>
          <header>All Figures</header>
        </button>
        <button class="menu-item" [ngClass]="{selected: activePage === highlightsPage}" (click)="rootPage = highlightsPage">
          <ion-icon name="star"></ion-icon>
          <header>Highlights</header>
        </button>

        <hr/>

        <button class="menu-item" (click)="rootPage = importExportPage">
          <ion-icon name="construct"></ion-icon>
          <header>Manage data</header>
        </button>

      </ion-content>

    </ion-menu>
  `
})
export class AppRootComponent implements OnInit {

  rootPage: Page = CollectionListPageComponent;
  activePage: Page;

  // Menu pages
  collectionListPage: Page = CollectionListPageComponent;
  figureListPage: Page = FigureListPageComponent;
  highlightsPage: Page = HighlightsPageComponent;
  importExportPage: Page = BackupRestorePageComponent;

  constructor(private app: App,
              private menuCtrl: MenuController,
              private splashScreen: SplashScreen,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {

    this.splashScreen.hide();

    this.app.viewWillEnter.subscribe(() => {
      this.menuCtrl.close();
    });

    this.app.viewDidEnter.subscribe((view: ViewController) => {

      this.activePage = view.component;

      if (view.getHeader()) {
        this.themeService.applyTheme(view.getHeader() as Header);
      }

    });

  }

}
