import { Injectable } from "@angular/core";
import { Entry, File } from "@ionic-native/file";
import { Platform } from "ionic-angular";

export enum FileFolder {
  BACKUP = 'Backups',
  COLLECTION = 'Collections',
  FIGURE = 'Figures',
}

@Injectable()
export class FileService {

  constructor(private file: File,
              private platform: Platform) {
  }

  getFolder(type: FileFolder): Promise<Entry> {

    const directoryRoot = this.platform.is('android') ? this.file.externalRootDirectory : this.file.documentsDirectory;
    const directoryName = 'Collections';

    return this.file.checkDir(directoryRoot, directoryName)
      .then(
        () => this.file.resolveDirectoryUrl(directoryRoot + directoryName),
        () => this.file.createDir(directoryRoot, directoryName, false)
      )
      .then(directory => this.file.checkDir(directory.name, type).then(
        () => this.file.resolveDirectoryUrl(directory.name + type),
        () => this.file.createDir(directory.name, type, false)
      ));

  }

  /**
   * Copy a file from the temporary camera location into the 'collections' shared folder.
   * Creates the folder if it does not exist.
   *
   * @param entry
   * @param type
   */
  copyToFolder(entry: Entry, type: FileFolder): Promise<Entry> {

    const currentDirectory = entry.nativeURL.slice(0, -entry.name.length);

    return this.getFolder(type)
      .then(directory => this.file.moveFile(currentDirectory, entry.name, directory.nativeURL, entry.name));

  }

}
