import { Injectable } from "@angular/core";
import { Camera, CameraOptions, DestinationType, MediaType, PictureSourceType } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { ActionSheetController } from "ionic-angular";
import { Image } from "src/entity/image";
import { ConnectionService } from "src/service/connection.service";
import { Repository } from "typeorm/browser";

@Injectable()
export class ImageService {

  private repository: Promise<Repository<Image>>;

  constructor(private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private file: File,
              connectionService: ConnectionService) {

    this.repository = connectionService.connection.then(connection => connection.getRepository(Image));

  }

  /**
   * Saves an uploaded image URL to the figure entity.
   */
  private imageFromDevice(sourceType: PictureSourceType): Promise<Image> {

    const cameraOptions: CameraOptions = {
      destinationType: DestinationType.FILE_URL,
      mediaType: MediaType.PICTURE,
      sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    return this.camera.getPicture(cameraOptions)
      // todo - move file to custom folder
      .then((path: string) => {
        const image = new Image();
        image.url = path;
        return image;
      });

  }

  create(): Promise<Image> {

    return new Promise<Image>((resolve) => this.actionSheetCtrl.create()
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
