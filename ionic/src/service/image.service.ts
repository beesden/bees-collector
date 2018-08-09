import { Injectable } from "@angular/core";
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { Entry, File } from "@ionic-native/file";
import { ActionSheetController, Platform } from "ionic-angular";
import { ItemImage } from "src/entity/item-image";

@Injectable()
export class ImageService {

  constructor(private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private file: File,
              private platform: Platform) {
  }

  /**
   * Copy a file from the temporary camera location into the 'collections' shared folder.
   * Creates the folder if it does not exist.
   *
   * @param entry
   */
  private copyToFolder(entry: Entry): Promise<Entry> {

    const currentDirectory = entry.nativeURL.slice(0, -entry.name.length);
    const directoryRoot = this.platform.is('android') ? this.file.externalRootDirectory : this.file.documentsDirectory;
    const directoryName = 'Collections';

    return this.file.checkDir(directoryRoot, directoryName)
      .then(
        () => this.file.resolveDirectoryUrl(directoryRoot + directoryName),
        () => this.file.createDir(directoryRoot, directoryName, false)
      )
      .then(directory => this.file.moveFile(currentDirectory, entry.name, directory.nativeURL, entry.name));

  }

  /**
   * Originally used for opening an image and populates the image metadata (e.g. width / height) from a file.
   * However since height and width aren't needed currently, this has been deprecated.
   *
   * Can be used when adding an image or restoring from a backup.
   *
   * @param imageUrl
   */
  createFromUrl(imageUrl: string): Promise<ItemImage> {

    const response = new ItemImage();
    response.url = imageUrl;
    return Promise.resolve(response);

  }

  /**
   * Saves an uploaded image URL to the figure entity.
   */
  private imageFromDevice(sourceType: PictureSourceType): Promise<ItemImage> {

    const cameraOptions: CameraOptions = {
      destinationType: DestinationType.NATIVE_URI,
      mediaType: MediaType.PICTURE,
      sourceType,
      correctOrientation: true
    };

    return this.camera.getPicture(cameraOptions)
      .then(imagePath => this.file.resolveLocalFilesystemUrl(imagePath))
      .then(entry => sourceType === PictureSourceType.CAMERA ? this.copyToFolder(entry) : entry)
      .then(entry => this.createFromUrl(entry.nativeURL));
  }


  create(): Promise<ItemImage> {

    return new Promise<ItemImage>((resolve) => this.actionSheetCtrl.create()
      .addButton({
        icon: 'camera',
        text: 'Add new photo',
        handler: () => {
          resolve(this.imageFromDevice(PictureSourceType.CAMERA));
        }
      })
      .addButton({
        icon: 'images',
        text: 'Select image',
        handler: () => {
          resolve(this.imageFromDevice(PictureSourceType.SAVEDPHOTOALBUM));
        }
      })
      .present()
    );

  }

  private loadQueue: Function[] = [];
  private images = {};

  /**
   * Load an image, and reduce the size.
   * Uses a queue to prevent too many images being resized at once.
   * Returns Data URL string.
   *
   * @param {string} url
   * @param {number} targetWidth
   * @param {number} targetHeight
   */
  loadImage(url: string, targetWidth: number, targetHeight: number): Promise<string> {

    const imageUrl = `${url}@${targetWidth}x${targetHeight}`;
    const stored = this.images[imageUrl];

    let promise: Promise<string>;

    if (stored) {
      promise = Promise.resolve(stored);
    } else {
      promise = new Promise<string>((resolve, reject) => {

        const init = () => {

          const img = new Image();
          img.onerror = error => reject(error);
          img.onload = () => {

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            this.images[imageUrl] = canvas.toDataURL();
            resolve(this.images[imageUrl]);

          };

          img.src = url;
          return url;

        };

        this.loadQueue.push(init);
        if (this.loadQueue.length === 1) {
          init();
        }

      });
    }

    return promise.then(dataUrl => {

      this.loadQueue.shift();

      const next = this.loadQueue[0];
      if (next) {
        next();
      }

      return dataUrl;
    });

  }

}
