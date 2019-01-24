import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FigureCardComponent } from "src/app/components";
import { ImageViewDirective } from "src/app/directives";
import { FigureListPage } from "src/app/figure-list/figure-list.page";
import { ConnectionService, FigureService, ImageService } from "src/app/service";
import { FileService } from "src/app/service/file.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [

		// Pages
		FigureListPage,

		// Components
		FigureCardComponent,

		// Directives
		ImageViewDirective,

		// Common
		AppComponent

	],
	entryComponents: [],
	imports: [
		BrowserModule,
		FormsModule,
		IonicModule.forRoot(),
		AppRoutingModule
	],
	providers: [

		// App data services
		ConnectionService,
		FigureService,
		FileService,
		ImageService,

		// Native plugins
		AndroidPermissions,
		Camera,
		File,
		StatusBar,
		SplashScreen,

		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
