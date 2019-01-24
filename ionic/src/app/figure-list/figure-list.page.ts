import { Component, NgZone } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Figure } from "src/app/entity/figure";
import { IonViewDidEnter } from "src/app/ionic-lifecycle";
import { SearchPageComponent } from "src/app/pages";
import { FigureService } from "src/app/service";

@Component({
	selector: 'bp-figure-list',
	styleUrls: ['figure-list.page.scss'],
	template: `
		<ion-header>

			<ion-toolbar>

				<!-- todo
				<button menuToggle="menu">
				  <ion-icon name="menu"></ion-icon>
				</button>
				-->

				<ion-title>All Figures</ion-title>

				<!-- todo
				<ion-buttons end>
				  <button ion-nav-push="searchPage">
					<ion-icon name="search"></ion-icon>
				  </button>
				</ion-buttons>
				-->

			</ion-toolbar>

		</ion-header>

		<ion-content>

			<ion-spinner *ngIf="!figures"></ion-spinner>

			<header class="bc-header" *ngIf="figures">
				<h1 class="bc-type-title">All figures</h1>
				<hr/>
				<p>{{total}} figures</p>
			</header>

			<ng-container *ngIf="figures?.length > 0">

				<section>
					<bc-figure-card *ngFor="let figure of figures" [figure]="figure"></bc-figure-card>
				</section>

				<ion-infinite-scroll (ionInfinite)="paginate($event)" *ngIf="total > figures.length">
					<ion-infinite-scroll-content></ion-infinite-scroll-content>
				</ion-infinite-scroll>

			</ng-container>

			<article class="bc-empty" *ngIf="figures?.length === 0">
				<ion-icon name="person"></ion-icon>

				<h1 class="bc-type-title">You have not added any figures.</h1>
				<p class="bc-type-text">Track your action figure collection by added figures here, and assigning them to ranges or collections.</p>
			</article>

		</ion-content>

		<ion-fab horizontal="end" vertical="bottom">
			<ion-fab-button color="primary" *ngIf="figures" (click)="addFigure()">
				<ion-icon name="create"></ion-icon>
			</ion-fab-button>
		</ion-fab>
	`
})
export class FigureListPage implements IonViewDidEnter {

	private readonly perPage: number = 12;
	private page: number = 1;

	total: number;

	searchPage: {} = SearchPageComponent;
	figures: Figure[];

	constructor(private figureService: FigureService,
				private modalCtrl: ModalController,
				private zone: NgZone) {
	}

	ionViewDidEnter(): void {

		// Fetch all up to the current page.
		const refreshCount = this.perPage * this.page;

		this.figureService.getList(refreshCount, 0).then(response => {
			this.total = response.total;
			this.zone.run(() => this.figures = response.items);
		});

	}

	paginate(event: { target: { complete: Function } }): void {

		this.figureService.getList(this.perPage, this.page++).then(response => {
			this.figures = this.figures.concat(response.items);
			this.total = response.total;
			event.target.complete();
		});

	}

	addFigure(): void {
		// todo
		// const modal = this.modalCtrl.create(FigureEditPageComponent);
		// modal.onDidDismiss(() => this.ionViewDidEnter());
		// modal.present();
	}
}
