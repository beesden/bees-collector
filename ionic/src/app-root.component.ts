import { Component, OnInit } from '@angular/core';
import { SplashScreen } from "@ionic-native/splash-screen";
import { App, Header, Platform, ViewController } from "ionic-angular";
import { FigureListPageComponent } from "src/pages";
import { ThemeService } from "src/service";

@Component({
  selector: 'bc-app-root',
  template: `
    <ion-nav #nav [root]="rootPage"></ion-nav>
  `
})
export class AppRootComponent implements OnInit {

  // rootPage: Page = CollectionManagePageComponent;
  rootPage: object = FigureListPageComponent;
  //rootPage: object = StyleguidePageComponent;

  constructor(private app: App,
              private splashScreen: SplashScreen,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {

    this.splashScreen.hide();

    this.app.viewDidEnter.subscribe((view: ViewController) => {
      if (view.getHeader()) {
        this.themeService.applyTheme(view.getHeader() as Header);
      }
    });

  }

}
