import { Component } from '@angular/core';
import { ToastController } from "ionic-angular";
import { BackupService } from "src/service/backup/backup.service";

@Component({
  selector: 'bp-figure-list',
  template: `
    <ion-header>

      <ion-navbar>
        <button menuToggle="menu">
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Import / Export</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content>

      <section class="bc-header">
        <h1 class="bc-type-title">Manage your data</h1>
        <p class="bc-type-text">You can backup or restore your collection from external files here.</p>
      </section>

      <h2>Restore data</h2>

      <section class="bc-section">

        <p class="bc-type-text">Restore collection from a previous backup.</p>
        <p class="bc-type-text"><strong>Please note</strong> importing an incorrect file may result in loss of data.</p>

        <button class="bc-button bc-button--block" (click)="restore(true)">
          <ion-icon name="cloud-download"></ion-icon>
          <span>Restore latest</span>
        </button>
        
        <br />

        <button class="bc-button bc-button--text" (click)="restore(false)">
          <ion-icon name="cloud-download"></ion-icon>
          <span>Restore specific</span>
        </button>

      </section>

      <h2>Backup</h2>

      <section class="bc-section">

        <p class="bc-type-text">Download a backup of your collection.</p>
        <p class="bc-type-text">This will be backed up into </p>

        <button class="bc-button bc-button--block" (click)="backup()">
          <ion-icon name="cloud-upload"></ion-icon>
          <span>Backup</span>
        </button>

      </section>


    </ion-content>
  `
})
export class BackupRestorePageComponent {

  constructor(private backupService: BackupService,
              private toastCtrl: ToastController) {
  }

  private showMessage(message: string, error?: string): void {

    if (error) {
      console.error(error);
    }

    const toast = this.toastCtrl.create({message, duration: 5000});
    toast.dismissAll();
    toast.present();

  }

  backup(): void {
    this.backupService.backupData().then(
      () => this.showMessage('Collection successfully backed up.'),
      error => this.showMessage(error ? error.message || error : 'Something went wrong. Please try again.', error)
    );
  }

  restore(latest: boolean): void {
    this.backupService.restoreData(latest).then(
      () => this.showMessage('Collection successfully restored.'),
      error => this.showMessage(error ? error.message || error : 'Something went wrong. Please try again.', error)
    );
  }

}
