import { Component } from '@angular/core';

@Component({
  selector: 'bp-search',
  styles: [`
    .page-section {
      border-bottom: 1px solid #ddd;
      padding: 12px;
    }

    .page-section > h1 {
      font-weight: 300;
      font-size: 2rem;
      margin: 12px 0;
    }

    .page-section > p {
      margin: 12px 0;
    }

    .page-section > h2 {
      font-weight: 300;
      font-size: 1.3rem;
    }

    .page-section > ul {
      margin: 12px 0;
    }

    .page-section > ul > li {
      list-style: none;
      margin: 6px 0;
    }

    .page-section > .container {
      position: relative;
      border: 1px solid #ddd;
      height: 150px;
      width: 150px;
    }
  `],
  template: `
    <ion-header>

      <ion-toolbar>
        <ion-title>Component Styleguide</ion-title>
      </ion-toolbar>

    </ion-header>

    <ion-content>

      <section class="page-section">

        <h1>Styleguide</h1>

        <p>This page is simply to demonstrate all variations of the app's styleguide.</p>
        <p>This page should not reach production.</p>

      </section>

      <section class="page-section">
        
        <div class="bc-text">
          <h1>This is a title</h1>
          <p>This is some text</p>
          
          <h2>This is a subtitle</h2>
          <p>This is some more text</p>
        </div>
        
      </section>

      <section class="page-section">

        <h2>Forms</h2>

        <fieldset>
          <legend>Basic fields</legend>

          <ion-item>
            <ion-label>Text Input</ion-label>
            <ion-input name="name" [(ngModel)]="formInput" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Textarea</ion-label>
            <ion-textarea name="notes" [(ngModel)]="formInput"></ion-textarea>
          </ion-item>

        </fieldset>

        <fieldset>
          <legend>Other fields</legend>

          <ion-item>
            <ion-label>Year selector</ion-label>
            <ion-datetime name="release" displayFormat="YYYY"></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-label>Date selector</ion-label>
            <ion-datetime name="release" displayFormat="DD/MMM/YYYY"></ion-datetime>
          </ion-item>

        </fieldset>

      </section>
      
      <section class="page-section">

        <h2>Buttons</h2>

        <ul>
          <li>
            <button class="bc-button">Filled Button</button>
          </li>
          <li>
            <button class="bc-button bc-button--outline">Outline Button</button>
          </li>
          <li>
            <button class="bc-button bc-button--text">Link Button</button>
          </li>
          <li>
            <button class="bc-button bc-button--block">Block Button</button>
          </li>
        </ul>

        <div class="container" style="position: relative; border: 1px solid #ddd; height: 6rem; width: 100%;">
          <button class="bc-button bc-button--fab">
            <ion-icon name="add"></ion-icon>
          </button>
        </div>

      </section>

    </ion-content>
  `
})
export class StyleguidePageComponent {

  formInput: string;

}
