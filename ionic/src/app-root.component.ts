import { Component, OnInit } from '@angular/core';
import { App, Header, ViewController } from "ionic-angular";
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
              private themeService: ThemeService) {}

  ngOnInit(): void {

    this.app.viewDidEnter.subscribe((view: ViewController) => {
      this.themeService.applyTheme(view.getHeader() as Header);
    });

  }

}
