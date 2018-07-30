import { Injectable } from '@angular/core';
import { File as FilePlugin } from "@ionic-native/file";
import { Platform } from "ionic-angular";
import { Collection } from "src/entity/collection";
import { CollectionItem } from "src/entity/collection-item";
import { Figure } from "src/entity/figure";
import { FigureAccessory } from "src/entity/figure-accessory";
import { FigureProperty } from "src/entity/figure-property";
import { BackupCollectionUtil } from "src/service/backup/backup.collection.util";
import { BackupFigureUtil } from "src/service/backup/backup.figure.util";
import { ConnectionService } from "src/service/connection.service";

@Injectable()
export class BackupService {

  private input: HTMLInputElement = document.createElement('input');

  constructor(private connectionService: ConnectionService,
              private platform: Platform,
              private file: FilePlugin,
              private collectionUtil: BackupCollectionUtil,
              private figureUtil: BackupFigureUtil) {

    this.input.type = 'file';
    this.input.accept = 'application/json';
    this.input.multiple = false;

  }

  get dataDirectory(): string {
    return this.platform.is('ios') ? this.file.syncedDataDirectory : this.file.externalDataDirectory;
  }

  private selectFile(): Promise<string> {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = err => {
        reader.abort();
        reject(err);
      };

      this.input.onchange = () => {
        const file = this.input.files[0];

        if (!file) {
          return;
        }

        if (file.size > (1024 * 1024)) {
          return reject('File size too big to import. Please select a file smaller than 1MB.');
        }

        if (file.type !== 'application/json') {
          return reject('Incorrect file format. Please select a .json file.');
        }

        reader.readAsText(file);
      };

      this.input.click();

    });

  }

  backupData(): Promise<void> {

    return this.connectionService.connection
      .then(connection => Promise.all([
        connection.manager.find(Figure),
        connection.getRepository(Collection).createQueryBuilder('collection')
          .leftJoinAndSelect('collection.images', 'image')
          .leftJoinAndSelect('collection.items', 'item')
          .leftJoinAndSelect('item.figure', 'item_figure')
          .getMany()
      ]))
      .then(([figures, collections]) => {

        const backupDate = new Date().toISOString();
        const dataBackup: DataBackup = {
          version: 1,
          date: backupDate,
          collections: collections.map(collection => this.collectionUtil.fromCollection(collection)),
          figures: figures.map(figure => this.figureUtil.fromFigure(figure))
        };

        // Download the backup
        const file = new Blob([JSON.stringify(dataBackup)], {type: 'application/json'});

        return this.file.writeFile(this.dataDirectory, `backup-latest.json`, file, {replace: true})
          .then(() => this.file.writeFile(this.file.externalDataDirectory, `backup-${Date.now()}.json`, file, {replace: true}));

      });

  }

  restoreData(latest: boolean = true): Promise<boolean> {

    const getFile = latest ? this.file.readAsText(this.dataDirectory, 'backup-latest.json') : this.selectFile();

    return getFile.then(file => {

        const backup = JSON.parse(file) as DataBackup;

        return this.connectionService.connection
          .then(connection => connection.manager.clear(Figure)
            .then(() => connection.manager.clear(FigureAccessory))
            .then(() => connection.manager.clear(FigureProperty))
            .then(() => connection.manager.clear(Collection))
            .then(() => connection.manager.clear(CollectionItem))
            .then(() => {
              const figures: Figure[] = backup.figures.map(figure => this.figureUtil.toFigure(figure));
              return connection.manager.save(figures);
            })
            .then(figures => {
              const collections: Collection[] = backup.collections.map(collection => this.collectionUtil.toCollection(collection, figures));
              return connection.manager.save(collections);
            })
            .then(() => true)
          );

      }
    );
  }

}
