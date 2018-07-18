import { Component } from '@angular/core';
import { Page } from "ionic-angular/navigation/nav-util";
import { Collection } from "src/entity";
import { Figure } from "src/entity/figure";
import { FigureViewPageComponent } from "src/pages/figure-view-page.component";
import { CollectionService } from "src/service";
import { FigureService } from "src/service/figure.service";

@Component({
  selector: 'bp-search',
  styleUrls: ['./search-page.component.scss'],
  template: `
    <ion-header>

      <ion-navbar>
        <ion-searchbar [(ngModel)]="query" (ionChange)="search(query)" [showCancelButton]="true"
                       autofocus></ion-searchbar>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <section class="section" *ngIf="collections?.length">
        <h2>Collections</h2>
        <bc-collection-card *ngFor="let collection of collections"></bc-collection-card>
      </section>
      
      <section class="section" *ngIf="figures?.length">
        <h2>Figures</h2>
        <bc-figure-list [figures]="figures"></bc-figure-list>
      </section>
      
    </ion-content>
  `
})
export class SearchPageComponent {

  query: string;

  collections: Collection[];
  figures: Figure[];

  constructor(private figureService: FigureService,
              private collectionService: CollectionService) {
  }

  /**
   * Perform a search using the query string.
   *
   * @param query
   */
  search(query: string) {

    this.figureService.search(query).then(figures => {
      this.figures = figures;
    });

    this.collectionService.search(query).then(collections => {
      this.collections = collections;
    })

  }

}
