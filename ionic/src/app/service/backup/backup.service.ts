import { Injectable } from '@angular/core';
import { File as FilePlugin } from "@ionic-native/file/ngx";
import { LoadingController, Platform } from "@ionic/angular";
import { BackupCollectionUtil } from "src/app/service/backup/backup.collection.util";
import { BackupFigureUtil } from "src/app/service/backup/backup.figure.util";
import { CollectionService } from "src/app/service/collection.service";
import { FigureService } from "src/app/service/figure.service";
import { FileFolder, FileService } from "src/app/service/file.service";

export * from './backup.collection.util';
export * from './backup.figure.util';

@Injectable()
export class BackupService {

  private input: HTMLInputElement = document.createElement('input');
  private loading: HTMLIonLoadingElement;

  constructor(private figureService: FigureService,
              private collectionService: CollectionService,
              private platform: Platform,
              private loadingCtrl: LoadingController,
              private file: FilePlugin,
              private fileService: FileService,
              private collectionUtil: BackupCollectionUtil,
              private figureUtil: BackupFigureUtil) {

    this.input.type = 'file';
    this.input.multiple = false;

  }

  /**
   * Can't reuse a loading instance. Because ionic hates you.
   */
  startLoad(): Promise<void> {
    return this.loadingCtrl.create().then(loading => {
      this.loading = loading;
      this.loading.present();
    });
  }

  private selectFile(): Promise<string> {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = () => {
        this.input.onchange = null;
        this.input.value = null;
        resolve(reader.result.toString());
      };

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

  backupData(): Promise<boolean> {

    return this.startLoad()
    // .then(() => this.connectionService.connection)
    // .then(connection => Promise.all([
    //   connection.manager.find(Figure),
    //   connection.getRepository(Collection).createQueryBuilder('collection')
    //     .leftJoinAndSelect('collection.images', 'image')
    //     .leftJoinAndSelect('collection.items', 'item')
    //     .leftJoinAndSelect('item.figure', 'item_figure')
    //     .getMany()
    // ]))
    // .then(([figures, collections]) => {
    //
    //   const backupDate = new Date().toISOString();
    //   const dataBackup: DataBackup = {
    //     version: 1,
    //     date: backupDate,
    //     collections: collections.map(collection => this.collectionUtil.fromCollection(collection)),
    //     figures: figures.map(figure => this.figureUtil.fromFigure(figure))
    //   };
    //
    //   // Download the backup
    //   const file = new Blob([JSON.stringify(dataBackup)], {type: 'application/json'});
    //
    //   return this.fileService.getFolder(FileFolder.BACKUP)
    //     .then(directory => Promise.all([
    //       this.file.writeFile(directory.nativeURL, `backup-latest.json`, file, {replace: true}),
    //       this.file.writeFile(directory.nativeURL, `backup-${Date.now()}.json`, file, {replace: true})
    //     ]));
    //
    // })
      .then(() => this.loading.dismiss());

  }

  restoreData(latest: boolean = true): Promise<boolean> {

    let getFile: Promise<string>;

    if (latest) {
      getFile = this.fileService.getFolder(FileFolder.BACKUP)
        .then(directory => this.file.readAsText(directory.nativeURL, 'backup-latest.json'))
        .catch(() => this.selectFile());
    } else {
      getFile = this.selectFile();
    }

    return getFile.then(file => this.startLoad().then(() => file))
      .then(file => JSON.parse(file) as DataBackup)
      // .then(backup => this.connectionService.connection
      //   .then(connection => connection.manager.clear(ItemImage)
      //     .then(() => connection.manager.clear(Tag))
      //     .then(() => connection.manager.clear(FigureAccessory))
      //     .then(() => connection.manager.clear(CollectionItem))
      //     .then(() => connection.manager.clear(Figure))
      //     .then(() => connection.manager.clear(Collection))
      //     .then(() => Promise.all(backup.figures.map(figure => this.figureUtil.toFigure(figure))))
      //     .then(figures => connection.manager.save(figures))
      //     .then(figures => Promise.all(backup.collections.map(collection => this.collectionUtil.toCollection(collection, figures))))
      //     .then(collections => connection.manager.save(collections))
      //   )
      // )
      .then(() => this.loading.dismiss());
  }

}
