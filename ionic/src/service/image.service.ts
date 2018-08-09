import { Injectable } from "@angular/core";
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { ActionSheetController } from "ionic-angular";
import { ItemImage } from "src/entity/item-image";
import { FileFolder, FileService } from "src/service/file.service";

@Injectable()
export class ImageService {

  constructor(private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private file: File,
              private fileService: FileService) {
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
  private imageFromDevice(sourceType: PictureSourceType, type: FileFolder): Promise<ItemImage> {

    const cameraOptions: CameraOptions = {
      destinationType: DestinationType.NATIVE_URI,
      mediaType: MediaType.PICTURE,
      sourceType,
      correctOrientation: true
    };

    return this.camera.getPicture(cameraOptions)
      .then(imagePath => this.file.resolveLocalFilesystemUrl(imagePath))
      .then(entry => sourceType === PictureSourceType.CAMERA ? this.fileService.copyToFolder(entry, type) : entry)
      .then(entry => this.createFromUrl(entry.nativeURL));
  }


  create(type: FileFolder): Promise<ItemImage> {

    return new Promise<ItemImage>((resolve) => this.actionSheetCtrl.create()
      .addButton({
        icon: 'camera',
        text: 'Add new photo',
        handler: () => {
          resolve(this.imageFromDevice(PictureSourceType.CAMERA, type));
        }
      })
      .addButton({
        icon: 'images',
        text: 'Select image',
        handler: () => {
          resolve(this.imageFromDevice(PictureSourceType.SAVEDPHOTOALBUM, type));
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
      promise = this.file.resolveLocalFilesystemUrl(imageUrl).then(() => new Promise<string>((resolve, reject) => {

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

      }));
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
