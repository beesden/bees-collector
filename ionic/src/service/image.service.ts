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
   * Opens an image and populates the image metadata from the file info.
   * Can be used when adding an image or restoring from a backup.
   *
   * @param imageUrl
   */
  createFromUrl(imageUrl: string): Promise<ItemImage> {

    const response = new ItemImage();
    response.url = imageUrl;

    // Open the file from the device as a data URL
    const parts = imageUrl.split('/');
    const fileName = parts.pop();
    const directory = parts.join('/') + '/';

    if (!this.platform.is('cordova')) {
      response.height = 1;
      response.width = 1;
      return Promise.resolve(response);
    }

    return this.file.readAsDataURL(directory, fileName).then(dataUrl => new Promise<ItemImage>((resolve, reject) => {

      const image = new Image();

      image.onerror = reject;
      image.onload = () => {
        response.height = image.height;
        response.width = image.width;
        resolve(response);
      };

      image.src = dataUrl;
    }));

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

}
