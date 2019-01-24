import { Injectable } from "@angular/core";

export enum Store {
  COLLECTION = 'collections',
  FIGURE = 'figure',
  ACCESSORY = 'accessories'
}

export interface StoreTransaction {
  store: IDBObjectStore;
  tx: IDBTransaction;
}

@Injectable()
export class ConnectionService {

  connection: Promise<IDBDatabase>;

  constructor() {
    this.connection = new Promise((resolve, reject) => {

      const request = indexedDB.open('bees_collections', 1);

      request.onsuccess = () => resolve(request.result);
      request.onerror = error => reject(error);

      request.onupgradeneeded = () => {

        const db = request.result;
        console.log('Upgrade needed...');

        const collectionStore = db.createObjectStore(Store.COLLECTION, {keyPath: 'id', autoIncrement: true});
        this.backup.collections.forEach(collection => collectionStore.put(collection));

        const figureStore = db.createObjectStore(Store.FIGURE, {keyPath: 'id', autoIncrement: true});
        this.backup.figures.forEach(figure => figureStore.put(figure));

        const accessoryStore = db.createObjectStore(Store.ACCESSORY, {keyPath: 'id', autoIncrement: true});
        accessoryStore.createIndex('figure', 'figure', {unique: false});

      };

    });
  }

  transaction(store: Store): Promise<StoreTransaction> {
    return this.connection.then(database => {

      const tx: IDBTransaction = database.transaction(store, 'readwrite');
      const objectStore: IDBObjectStore = tx.objectStore(store);

      return {tx, store: objectStore};
    });
  }

  private get backup(): DataBackup {
    return {
      "version": 1,
      "date": "2019-01-23T15:52:18.228Z",
      "collections": [
        {
          "id": 1,
          "name": "Star Wars",
          "series": "Star Wars - Kenner",
          "description": null,
          "images": [],
          "figures": [
            "3889aea1-006e-44b7-b620-cbbecde568a3",
            "37db0756-3075-4ce0-845d-66418f14c7d6",
            "ae91a48d-d8bf-4e65-82f6-8490e017e05b",
            "9ea0f319-3569-4fde-ac9f-adfa5f918274",
            "579359c7-e0f9-40fe-b249-06ade04619ce",
            "0c7c4066-5315-426b-af16-72d6e211fa9f",
            "8a6673c7-9889-41af-929c-e5ca9ab4b390",
            "ec5d8dbe-eff0-4e5b-a55b-71f53c66394d",
            "075f5089-a912-4752-a7fa-767d9f80a0ec",
            "7a657c82-922c-4b1b-8ba0-489ed882609c",
            "fbfc5950-e47b-4ae8-bfc1-5a8b1b81d7d8",
            "28f9433b-2588-4718-8706-f80385ff7732",
            "f1b4b679-6c5e-4af3-bf9e-bdeeb6c71ede",
            "b329eda7-144c-4ac7-8062-04168e6e7c73",
            "f033c26a-ab12-4bb2-b2bb-b42007b9b193",
            "779b5c74-2439-4af2-8407-c731a9ffe67c",
            "8441c391-aa78-4fe6-976a-ba6e1ed7f999",
            "03326f4a-a708-49e7-a76d-e25089999bf2",
            "fa3f4f88-aef9-4ec8-9a36-4e12289c2593",
            "6d997122-07e6-4521-8a14-ae688b5b362b",
            "6996b2b8-cead-40a1-8235-f87de46bddae",
            "6e973111-6607-4ea9-8040-0427653bfaf7"
          ]
        },
        {
          "id": 2,
          "name": "Empire Strikes Back",
          "series": "Star Wars - Kenner",
          "description": null,
          "images": [],
          "figures": [
            "339107be-8ec1-4118-ab45-be6ec44f99d8",
            "5f9d7dfd-7778-4a07-bacb-70abaa28e4f3",
            "4248a07d-10b2-4b4d-900b-1c0215133a0a",
            "45ec360b-b7d7-4161-aa67-3d3fe50839d9",
            "68c80b69-fe49-4e92-83b8-ed759f5c3725",
            "2f9953b8-856a-4cd3-a4e7-4ca652aac029",
            "2452a3ad-a795-4c55-9d14-a696859fbd55",
            "762f0fd3-e707-46f3-9548-d3410021538f",
            "1da3e592-1dbe-491a-a125-b61df1c13982",
            "77e450da-62fc-4f78-9d96-8ab831993ea0",
            "e8a88daf-df33-483b-8f85-c8daed41d604",
            "3da76664-5b3e-459d-bab5-b1bb4d4246bd",
            "d26d514a-b25f-4e7d-beb6-d5008d2d7fd1",
            "b3b30528-fb02-4ebc-9b30-3a07935cb118",
            "9e38d54f-3806-49aa-a5d8-939a789a7d07",
            "a0e883af-d897-49de-8bf0-4fd91e8e9468",
            "0cc9dfc1-f49e-41ae-b24d-97beb484bc1e",
            "de435c01-a1d5-4484-9595-1ceaa4b1071f",
            "3f1b3b0d-7cd2-4619-8f79-342754443d32",
            "71505f91-8d8b-4e0a-a2fd-a564bc566ce1",
            "6625583a-bfec-48cc-aadb-960f3634106c",
            "6468d366-6537-4f9b-b00a-a9e648062681",
            "21c99be8-99ec-4013-bbad-12545e70b9d2",
            "8790a867-6b64-4fad-84ce-5e8c31111f3c",
            "2e538e73-f7b3-40d1-85fd-582afa446e9e",
            "0936dde6-525b-40e4-8e2c-2e85d2ae3fdc",
            "8ec0e8f6-a3a7-4a5a-961e-2a1714e97d8f",
            "9c86ff64-769f-4df1-8a7c-01f638cfd281",
            "8a48e8bb-73da-41de-8acb-b0fe9bb89712"
          ]
        },
        {
          "id": 3,
          "name": "Return of the Jedi",
          "series": "Star Wars - Kenner",
          "description": null,
          "images": [],
          "figures": [
            "fd6adfc6-fa46-4101-8032-464efe45a88f",
            "a83b1388-c882-43b1-beb3-51d030b38e6b",
            "a30c9349-e460-4028-be8d-c5328eaab255",
            "d8aa9659-b2c6-4052-92b0-2f8d7b672eaf",
            "0aca2777-03ee-4a90-8f7b-913dd1d1c359",
            "bd326165-61f1-42e7-9bc7-6747f2d8d434",
            "9ddb2967-22af-429a-ad83-aa710033efc2",
            "280039a9-e60f-4fc1-b90c-30cd24c332d3",
            "9bcad5dd-65d2-42b0-99c1-93a36d08bd75",
            "8ce18afe-0f9c-4c11-a669-a901a8a29e73",
            "a3c44199-d8a9-4146-a158-9f88ab32b4c0",
            "c57d1b38-77c7-46cc-b81d-3f7b0cf3d330",
            "9efc7ec4-45a6-46ec-afa9-0b5c282f153a",
            "3e0da7f2-0a56-4d9f-9418-f3b6497f0cee",
            "ebd4b564-0e98-423e-8655-8518c1d2a0ea",
            "b4d658ef-9c34-4265-b4cb-397cab58fe75",
            "94f2db71-8501-4e60-acb0-72f2a03eb81a",
            "df567afb-40ce-4814-9739-150b8daabaad",
            "fd9afffb-8349-4ce5-9e7b-754d98058431",
            "329329b6-467d-4b19-a53a-96dcfa35db40",
            "2d1f241e-f7b1-459d-a75f-064a3148d1b7",
            "7d727765-4ac4-4177-a4fd-10786d68f032",
            "f2fc6fd3-0aa9-4592-8768-9615a69e5e90",
            "c8a66489-1344-42da-b61c-80b0533fb248",
            "1545b2a9-8d59-4488-ae47-24b4e94ce254",
            "c9316285-dcc2-49c7-9c76-5990903ba1a8",
            "743e5e8b-4bfe-4190-89f3-b105960118cf",
            "893c5a4f-460e-4c9b-aa42-55505c339167",
            "3ae333d5-142c-452e-b7fe-36739871a173",
            "b4078e98-1fd5-4f9e-b242-0ddd584d93ac",
            "0ec44724-2d08-4a57-b8cc-6e8d3f45827f"
          ]
        },
        {
          "id": 4,
          "name": "Power of the Force",
          "series": "Star Wars - Kenner",
          "description": null,
          "images": [],
          "figures": [
            "1ceb34ca-b729-42b5-ad3a-8b72d0bd3817",
            "1d2b104a-f18f-4135-be66-c795ee084ba6",
            "44fc762f-1a4a-4e9c-a3d1-17724705550e",
            "59e7be35-1cd7-425d-ad43-eeabccab8b6b",
            "7e4947b4-5a37-403c-a87c-79c9dd2d209b",
            "8daa9fa6-8283-4739-8d2b-b6077b2400af",
            "901b1c8e-5d8a-4d95-8462-685fdcf5e234",
            "9d987af8-a294-413b-ac2e-636d9dff2225",
            "9e331ba3-32fe-454c-bca8-205ffa9a31aa",
            "b4078e98-1fd5-4f9e-b242-0ddd584d93ac",
            "bad8c6b5-d2fe-4152-b3a3-4a639b7e8a13",
            "cebf3f73-e04f-4e83-98d8-d64b6d0282b2",
            "e9dc2da8-0e9b-4d12-b544-ff697a252643",
            "faa71596-2ec3-4472-8c28-03a74da8b916",
            "fb978d76-43ba-468a-8b39-c9afbb6438c6"
          ]
        }
      ],
      "figures": [
        {
          "id": "3889aea1-006e-44b7-b620-cbbecde568a3",
          "name": "Luke Skywalker",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_122805.jpg"
          ],
          "accessories": [
            {
              "name": "Telescoping Lightsaber",
              "variant": "Yellow w/ tip"
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-17T19:07:40.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "37db0756-3075-4ce0-845d-66418f14c7d6",
          "name": "Princess Leia Organa",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_122843.jpg"
          ],
          "accessories": [
            {
              "name": "Leia Blaster",
              "variant": "Black"
            },
            {
              "name": "Vinyl Cloak",
              "variant": null
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "ae91a48d-d8bf-4e65-82f6-8490e017e05b",
          "name": "R2-D2",
          "variant": "Solid Dome",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2019-01-23T11:27:13.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "9ea0f319-3569-4fde-ac9f-adfa5f918274",
          "name": "Chewbacca",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123133.jpg"
          ],
          "accessories": [
            {
              "name": "Bowcaster",
              "variant": null
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "579359c7-e0f9-40fe-b249-06ade04619ce",
          "name": "C-3PO",
          "variant": "Fixed limbs",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123049.jpg"
          ],
          "accessories": [],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "0c7c4066-5315-426b-af16-72d6e211fa9f",
          "name": "Darth Vader",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123304.jpg"
          ],
          "accessories": [
            {
              "name": "Telescoping Lightsaber",
              "variant": "Red w/ tip"
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2019-01-23T11:27:16.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "8a6673c7-9889-41af-929c-e5ca9ab4b390",
          "name": "Stormtrooper",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": true,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123439.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "ec5d8dbe-eff0-4e5b-a55b-71f53c66394d",
          "name": "Obi-Wan Kenobi",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123224.jpg"
          ],
          "accessories": [
            {
              "name": "Telescoping Lightsaber",
              "variant": "Blue w/ tip"
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "075f5089-a912-4752-a7fa-767d9f80a0ec",
          "name": "Han Solo",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_122936.jpg"
          ],
          "accessories": [
            {
              "name": "Rebel Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "7a657c82-922c-4b1b-8ba0-489ed882609c",
          "name": "Jawa",
          "variant": "Cloth Cape",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123629.jpg"
          ],
          "accessories": [
            {
              "name": "Cloth cape",
              "variant": null
            },
            {
              "name": "Jawa Blaster",
              "variant": null
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "fbfc5950-e47b-4ae8-bfc1-5a8b1b81d7d8",
          "name": "Tusken Raider",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_124130.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_124130.jpg"
          ],
          "accessories": [
            {
              "name": "Cape",
              "variant": null
            },
            {
              "name": "Gaderffii Stick",
              "variant": null
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "28f9433b-2588-4718-8706-f80385ff7732",
          "name": "Death Squad Commander",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123452.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1976-12-31T00:00:00.000Z",
          "tags": [
            "Wave A"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "f1b4b679-6c5e-4af3-bf9e-bdeeb6c71ede",
          "name": "Greedo",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123932.jpg"
          ],
          "accessories": [
            {
              "name": "Rebel Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "b329eda7-144c-4ac7-8062-04168e6e7c73",
          "name": "Hammerhead",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123914.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "f033c26a-ab12-4bb2-b2bb-b42007b9b193",
          "name": "Snaggletooth",
          "variant": "Red",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123855.jpg"
          ],
          "accessories": [
            {
              "name": "Rebel Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2018-10-14T12:48:01.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "8441c391-aa78-4fe6-976a-ba6e1ed7f999",
          "name": "Walrus Man",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_124009.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "03326f4a-a708-49e7-a76d-e25089999bf2",
          "name": "Luke Skywalker",
          "variant": "X-Wing Fighter Pilot",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_124200.jpg"
          ],
          "accessories": [
            {
              "name": "Rebel Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2019-01-23T11:27:34.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "fa3f4f88-aef9-4ec8-9a36-4e12289c2593",
          "name": "R5-D4",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123640.jpg"
          ],
          "accessories": [],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "6d997122-07e6-4521-8a14-ae688b5b362b",
          "name": "Death Star Droid",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2019-01-23T11:27:41.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "6996b2b8-cead-40a1-8235-f87de46bddae",
          "name": "Power Droid",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_123652.jpg"
          ],
          "accessories": [],
          "release": "1977-12-31T00:00:00.000Z",
          "tags": [
            "Wave B"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "6e973111-6607-4ea9-8040-0427653bfaf7",
          "name": "Boba Fett",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131056.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Blue / Black"
            }
          ],
          "release": "1978-12-31T00:00:00.000Z",
          "tags": [
            "Wave C"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "339107be-8ec1-4118-ab45-be6ec44f99d8",
          "name": "Princess Leia Organa",
          "variant": "Bespin Gown",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/1533750807483.jpg"
          ],
          "accessories": [
            {
              "name": "Leia Blaster",
              "variant": "Blue"
            },
            {
              "name": "Vinyl Cloak",
              "variant": ""
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2018-09-23T12:41:45.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "5f9d7dfd-7778-4a07-bacb-70abaa28e4f3",
          "name": "FX-7",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_125955.jpg"
          ],
          "accessories": [],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "4248a07d-10b2-4b4d-900b-1c0215133a0a",
          "name": "Snowtrooper",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130452.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Hoth Rifle",
              "variant": "Blue"
            },
            {
              "name": "Waist Skirt",
              "variant": null
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2019-01-23T11:28:21.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "45ec360b-b7d7-4161-aa67-3d3fe50839d9",
          "name": "Rebel Soldier",
          "variant": "Hoth Battle Gear",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130154.jpg"
          ],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "68c80b69-fe49-4e92-83b8-ed759f5c3725",
          "name": "Bossk",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131043.jpg"
          ],
          "accessories": [
            {
              "name": "Bossk Rifle",
              "variant": "Blue"
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2018-10-01T20:41:01.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "2f9953b8-856a-4cd3-a4e7-4ca652aac029",
          "name": "IG-88",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "IG-88 Rifle",
              "variant": null
            },
            {
              "name": "Imperial Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2019-01-23T11:28:13.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "2452a3ad-a795-4c55-9d14-a696859fbd55",
          "name": "Luke Skywalker",
          "variant": "Bespin Fatigues",
          "notes": null,
          "collected": true,
          "damaged": true,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131830.jpg"
          ],
          "accessories": [
            {
              "name": "Lightsaber",
              "variant": "Yellow"
            },
            {
              "name": "Rebel Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2018-11-07T12:50:26.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "762f0fd3-e707-46f3-9548-d3410021538f",
          "name": "Han Solo",
          "variant": "Hoth Outfit",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "Rebel Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2019-01-23T11:28:24.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "1da3e592-1dbe-491a-a125-b61df1c13982",
          "name": "Lando Calrissian",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131612.jpg"
          ],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            },
            {
              "name": "Cape",
              "variant": null
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "77e450da-62fc-4f78-9d96-8ab831993ea0",
          "name": "Bespin Security Guard",
          "variant": "White",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131539.jpg"
          ],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave D"
          ],
          "date_update": "2019-01-18T18:39:53.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "e8a88daf-df33-483b-8f85-c8daed41d604",
          "name": "Yoda",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130940.jpg"
          ],
          "accessories": [
            {
              "name": "Belt",
              "variant": null
            },
            {
              "name": "Jedi Robe",
              "variant": null
            },
            {
              "name": "Snake",
              "variant": null
            },
            {
              "name": "Walking Stick",
              "variant": null
            }
          ],
          "release": "1979-12-31T00:00:00.000Z",
          "tags": [
            "Wave E"
          ],
          "date_update": "2019-01-23T11:28:29.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "3da76664-5b3e-459d-bab5-b1bb4d4246bd",
          "name": "Ugnaught",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "Apron",
              "variant": null
            },
            {
              "name": "Tool Kit",
              "variant": null
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2019-01-23T11:28:34.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "d26d514a-b25f-4e7d-beb6-d5008d2d7fd1",
          "name": "Dengar",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131031.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Rifle",
              "variant": "Blue"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "b3b30528-fb02-4ebc-9b30-3a07935cb118",
          "name": "Han Solo",
          "variant": "Bespin Outfit",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2019-01-23T11:28:37.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "9e38d54f-3806-49aa-a5d8-939a789a7d07",
          "name": "Lobot",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131558.jpg"
          ],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2018-11-07T12:49:43.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "a0e883af-d897-49de-8bf0-4fd91e8e9468",
          "name": "Princess Leia Organa",
          "variant": "Hoth Outfit",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130050.jpg"
          ],
          "accessories": [
            {
              "name": "Leia Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2018-08-25T01:52:55.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "0cc9dfc1-f49e-41ae-b24d-97beb484bc1e",
          "name": "Rebel Commander",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130209.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Hoth Rifle",
              "variant": "Black"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "de435c01-a1d5-4484-9595-1ceaa4b1071f",
          "name": "AT-AT Driver",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "AT-AT Driver Rifle",
              "variant": "Black"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2019-01-23T11:28:57.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "3f1b3b0d-7cd2-4619-8f79-342754443d32",
          "name": "Imperial Commander",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131859.jpg"
          ],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2019-01-23T11:28:55.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "71505f91-8d8b-4e0a-a2fd-a564bc566ce1",
          "name": "2-1B",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130014.jpg"
          ],
          "accessories": [
            {
              "name": "Staff",
              "variant": null
            }
          ],
          "release": "1980-12-31T00:00:00.000Z",
          "tags": [
            "Wave F"
          ],
          "date_update": "2019-01-23T11:28:59.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "6625583a-bfec-48cc-aadb-960f3634106c",
          "name": "R2-D2",
          "variant": "Sensorscope",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130232.jpg"
          ],
          "accessories": [],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave G"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "6468d366-6537-4f9b-b00a-a9e648062681",
          "name": "C-3PO",
          "variant": "Removable Limbs",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131708.jpg"
          ],
          "accessories": [
            {
              "name": "Cargo Net",
              "variant": null
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave G"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "21c99be8-99ec-4013-bbad-12545e70b9d2",
          "name": "Luke Skywalker",
          "variant": "Hoth Battle Gear",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_130111.jpg"
          ],
          "accessories": [
            {
              "name": "Hoth Rebel Rifle",
              "variant": "Black"
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave G"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "8790a867-6b64-4fad-84ce-5e8c31111f3c",
          "name": "AT-AT Commander",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave G"
          ],
          "date_update": "2019-01-23T11:28:44.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "2e538e73-f7b3-40d1-85fd-582afa446e9e",
          "name": "(Twin-Pod) Cloud Car Pilot",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131812.jpg"
          ],
          "accessories": [
            {
              "name": "Communicator",
              "variant": "Grey"
            },
            {
              "name": "Pilot Blaster",
              "variant": "Grey"
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave G"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "0936dde6-525b-40e4-8e2c-2e85d2ae3fdc",
          "name": "Bespin Security Guard",
          "variant": "Black",
          "notes": null,
          "collected": true,
          "damaged": true,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": true,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131512.jpg"
          ],
          "accessories": [
            {
              "name": "Bespin Blaster",
              "variant": "Blue"
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave G"
          ],
          "date_update": "2019-01-18T18:40:14.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "8ec0e8f6-a3a7-4a5a-961e-2a1714e97d8f",
          "name": "4-LOM",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "4-LOM Rifle",
              "variant": null
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave H"
          ],
          "date_update": "2019-01-23T11:28:46.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "9c86ff64-769f-4df1-8a7c-01f638cfd281",
          "name": "Zuckuss",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131112.jpg"
          ],
          "accessories": [
            {
              "name": "Backpack with straps",
              "variant": null
            },
            {
              "name": "Cloak",
              "variant": null
            },
            {
              "name": "Zuckuss Rifle",
              "variant": null
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave H"
          ],
          "date_update": "2019-01-23T11:28:49.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "8a48e8bb-73da-41de-8acb-b0fe9bb89712",
          "name": "Imperial Tie Fighter Pilot",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_131849.jpg"
          ],
          "accessories": [
            {
              "name": "Pilot Blaster",
              "variant": "Grey"
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave I"
          ],
          "date_update": "2018-08-13T14:29:06.000Z",
          "date_created": "2018-08-13T14:29:06.000Z"
        },
        {
          "id": "fd6adfc6-fa46-4101-8032-464efe45a88f",
          "name": "Admiral Ackbar",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135754.jpg"
          ],
          "accessories": [
            {
              "name": "Baton",
              "variant": null
            }
          ],
          "release": "1981-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "a83b1388-c882-43b1-beb3-51d030b38e6b",
          "name": "Luke Skywalker",
          "variant": "Jedi Knight Outfit",
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134942.jpg"
          ],
          "accessories": [
            {
              "name": "Lightsaber",
              "variant": "Green"
            },
            {
              "name": "Palace Blaster",
              "variant": "Grey"
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "a30c9349-e460-4028-be8d-c5328eaab255",
          "name": "Princess Leia Organa",
          "variant": "Boushh Disguise",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134609.jpg"
          ],
          "accessories": [
            {
              "name": "Boushh Rifle",
              "variant": null
            },
            {
              "name": "Helmet",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "d8aa9659-b2c6-4052-92b0-2f8d7b672eaf",
          "name": "Gamorrean Guard",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134713.jpg"
          ],
          "accessories": [
            {
              "name": "Gamorrean Guard Axe",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "0aca2777-03ee-4a90-8f7b-913dd1d1c359",
          "name": "Emperor's Royal Guard",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135617.jpg"
          ],
          "accessories": [
            {
              "name": "Cloak",
              "variant": null
            },
            {
              "name": "Force Pike",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2019-01-18T18:40:25.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "bd326165-61f1-42e7-9bc7-6747f2d8d434",
          "name": "Chief Chirpa",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140422.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140422.jpg"
          ],
          "accessories": [
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Staff",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "9ddb2967-22af-429a-ad83-aa710033efc2",
          "name": "Logray (Ewok Medicine Man)",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140406.jpg"
          ],
          "accessories": [
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Pouch",
              "variant": null
            },
            {
              "name": "Staff",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "280039a9-e60f-4fc1-b90c-30cd24c332d3",
          "name": "Klaatu",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134652.jpg"
          ],
          "accessories": [
            {
              "name": "Skirt",
              "variant": null
            },
            {
              "name": "Vibro Axe",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "9bcad5dd-65d2-42b0-99c1-93a36d08bd75",
          "name": "Rebel Commando",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140156.jpg"
          ],
          "accessories": [
            {
              "name": "Rebel Commando Rifle",
              "variant": "Grey"
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2019-01-23T11:29:14.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "8ce18afe-0f9c-4c11-a669-a901a8a29e73",
          "name": "Weequay",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134409.jpg"
          ],
          "accessories": [
            {
              "name": "Vibro Axe",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "a3c44199-d8a9-4146-a158-9f88ab32b4c0",
          "name": "Squid Head",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134806.jpg"
          ],
          "accessories": [
            {
              "name": "Belt",
              "variant": null
            },
            {
              "name": "Bespin Blaster",
              "variant": "Grey"
            },
            {
              "name": "Robe",
              "variant": null
            },
            {
              "name": "Skirt",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "c57d1b38-77c7-46cc-b81d-3f7b0cf3d330",
          "name": "General Madine",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135737.jpg"
          ],
          "accessories": [
            {
              "name": "Baton",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2019-01-23T11:29:15.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "9efc7ec4-45a6-46ec-afa9-0b5c282f153a",
          "name": "Bib Fortuna",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134835.jpg"
          ],
          "accessories": [
            {
              "name": "Chest Armor",
              "variant": null
            },
            {
              "name": "Cloak",
              "variant": null
            },
            {
              "name": "Staff",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "3e0da7f2-0a56-4d9f-9418-f3b6497f0cee",
          "name": "Ree-Yees",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134739.jpg"
          ],
          "accessories": [
            {
              "name": "Ree-Yees Blaster Rifle",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2019-01-23T11:29:17.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "ebd4b564-0e98-423e-8655-8518c1d2a0ea",
          "name": "Biker Scout",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135548.jpg"
          ],
          "accessories": [
            {
              "name": "Scout Blaster",
              "variant": ""
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "b4d658ef-9c34-4265-b4cb-397cab58fe75",
          "name": "Lando Calrissian",
          "variant": "Skiff Guard Disguise",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134543.jpg"
          ],
          "accessories": [
            {
              "name": "Helmet",
              "variant": null
            },
            {
              "name": "Vibro Axe",
              "variant": null
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "94f2db71-8501-4e60-acb0-72f2a03eb81a",
          "name": "Nien Nunb",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135702.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135702.jpg"
          ],
          "accessories": [
            {
              "name": "Pilot Blaster",
              "variant": "Black"
            }
          ],
          "release": "1982-12-31T00:00:00.000Z",
          "tags": [
            "Wave J"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "df567afb-40ce-4814-9739-150b8daabaad",
          "name": "Nikto",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134726.jpg"
          ],
          "accessories": [
            {
              "name": "Vibro Staff",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "fd9afffb-8349-4ce5-9e7b-754d98058431",
          "name": "8D8",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134852.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134852.jpg"
          ],
          "accessories": [],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "329329b6-467d-4b19-a53a-96dcfa35db40",
          "name": "Princess Leia Organa",
          "variant": "Combat Poncho",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140033.jpg"
          ],
          "accessories": [
            {
              "name": "Belt",
              "variant": null
            },
            {
              "name": "Endor Blaster",
              "variant": "Grey"
            },
            {
              "name": "Helmet",
              "variant": null
            },
            {
              "name": "Poncho",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2019-01-23T11:29:18.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "2d1f241e-f7b1-459d-a75f-064a3148d1b7",
          "name": "Wicket W. Warrick",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140237.jpg"
          ],
          "accessories": [
            {
              "name": "Ewok Spear",
              "variant": null
            },
            {
              "name": "Headdress",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2019-01-23T11:29:19.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "7d727765-4ac4-4177-a4fd-10786d68f032",
          "name": "The Emperor",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135532.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135532.jpg"
          ],
          "accessories": [
            {
              "name": "Walking Stick",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "f2fc6fd3-0aa9-4592-8768-9615a69e5e90",
          "name": "B-Wing Pilot",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135721.jpg"
          ],
          "accessories": [
            {
              "name": "Endor Blaster",
              "variant": "Grey"
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "c8a66489-1344-42da-b61c-80b0533fb248",
          "name": "Klaatu",
          "variant": "in Skiff Guard Outfit",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134508.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_134508.jpg"
          ],
          "accessories": [
            {
              "name": "Force Pike",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "1545b2a9-8d59-4488-ae47-24b4e94ce254",
          "name": "Han Solo",
          "variant": "Trench Coat",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140008.jpg",
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140008.jpg"
          ],
          "accessories": [
            {
              "name": "Rebel Blaster",
              "variant": "Black"
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "c9316285-dcc2-49c7-9c76-5990903ba1a8",
          "name": "Teebo",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140305.jpg"
          ],
          "accessories": [
            {
              "name": "Ewok Axe",
              "variant": null
            },
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Horn",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "743e5e8b-4bfe-4190-89f3-b105960118cf",
          "name": "Prune Face",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": true,
          "images": [],
          "accessories": [
            {
              "name": "Rifle",
              "variant": null
            },
            {
              "name": "Robe",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2019-01-18T18:40:44.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "893c5a4f-460e-4c9b-aa42-55505c339167",
          "name": "AT-ST Driver",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": true,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_135641.jpg"
          ],
          "accessories": [
            {
              "name": "Endor Blaster",
              "variant": "Grey"
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "3ae333d5-142c-452e-b7fe-36739871a173",
          "name": "Rancor Keeper",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": true,
          "images": [],
          "accessories": [
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Rancor Keeper Staff",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave K"
          ],
          "date_update": "2019-01-18T18:40:46.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "b4078e98-1fd5-4f9e-b242-0ddd584d93ac",
          "name": "Lumat",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "Ewok Bow",
              "variant": null
            },
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Pouch",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave L"
          ],
          "date_update": "2019-01-23T11:29:53.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "0ec44724-2d08-4a57-b8cc-6e8d3f45827f",
          "name": "Paploo",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140437.jpg"
          ],
          "accessories": [
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Paploo Staff",
              "variant": null
            }
          ],
          "release": "1983-12-31T00:00:00.000Z",
          "tags": [
            "Wave L"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "fb978d76-43ba-468a-8b39-c9afbb6438c6",
          "name": "Luke Skywalker",
          "variant": "Battle Poncho",
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": true,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140143.jpg"
          ],
          "accessories": [
            {
              "name": "Belt",
              "variant": null
            },
            {
              "name": "Palace Blaster",
              "variant": "Black"
            },
            {
              "name": "Poncho",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2019-01-23T11:29:24.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "bad8c6b5-d2fe-4152-b3a3-4a639b7e8a13",
          "name": "R2-D2",
          "variant": "Pop-up Lightsaber",
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Pop-Up Lightsaber",
              "variant": "Green"
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "8daa9fa6-8283-4739-8d2b-b6077b2400af",
          "name": "Romba",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": true,
          "images": [],
          "accessories": [
            {
              "name": "Ewok Spear",
              "variant": null
            },
            {
              "name": "Headdress",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2019-01-23T11:26:53.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "e9dc2da8-0e9b-4d12-b544-ff697a252643",
          "name": "Amanaman",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Amanaman Staff",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "1cb4f6f3-3491-43f2-83b3-4019b1d9dfae",
          "name": "Barada",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Vibro Staff",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "9e331ba3-32fe-454c-bca8-205ffa9a31aa",
          "name": "Imperial Gunner",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Endor Blaster",
              "variant": "Black"
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "1d2b104a-f18f-4135-be66-c795ee084ba6",
          "name": "Han Solo",
          "variant": "Carbonite Chamber",
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Carbonite Block",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "faa71596-2ec3-4472-8c28-03a74da8b916",
          "name": "Luke Skywalker",
          "variant": "Imperial Stormtrooper Outfit",
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Imperial Blaster",
              "variant": "Black"
            },
            {
              "name": "Stormtrooper Helmet",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "cebf3f73-e04f-4e83-98d8-d64b6d0282b2",
          "name": "Anakin Skywalker",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [
            "file:///storage/emulated/0/Collections/Figures/IMG_20180807_140210.jpg"
          ],
          "accessories": [],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "9d987af8-a294-413b-ac2e-636d9dff2225",
          "name": "EV-9D9",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "7e4947b4-5a37-403c-a87c-79c9dd2d209b",
          "name": "Warok",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Ewok Bow",
              "variant": null
            },
            {
              "name": "Headdress",
              "variant": null
            },
            {
              "name": "Pouch",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "901b1c8e-5d8a-4d95-8462-685fdcf5e234",
          "name": "Lando Calrissian",
          "variant": "General Pilot",
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Cape",
              "variant": null
            },
            {
              "name": "Palace Blaster",
              "variant": "Black"
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "44fc762f-1a4a-4e9c-a3d1-17724705550e",
          "name": "A-Wing Pilot",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [
            {
              "name": "Endor Blaster",
              "variant": "Black"
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2019-01-23T11:29:36.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "59e7be35-1cd7-425d-ad43-eeabccab8b6b",
          "name": "Imperial Dignitary",
          "variant": null,
          "notes": null,
          "collected": true,
          "damaged": false,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": false,
          "images": [],
          "accessories": [],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave M"
          ],
          "date_update": "2019-01-23T11:29:39.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "1ceb34ca-b729-42b5-ad3a-8b72d0bd3817",
          "name": "Yak Face",
          "variant": null,
          "notes": null,
          "collected": false,
          "damaged": null,
          "incomplete": false,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [
            {
              "name": "Vibro Staff",
              "variant": null
            }
          ],
          "release": "1984-12-31T00:00:00.000Z",
          "tags": [
            "Wave N"
          ],
          "date_update": "2018-08-13T14:29:07.000Z",
          "date_created": "2018-08-13T14:29:07.000Z"
        },
        {
          "id": "779b5c74-2439-4af2-8407-c731a9ffe67c",
          "name": "Snaggletooth",
          "variant": "Blue",
          "notes": null,
          "collected": null,
          "damaged": null,
          "incomplete": null,
          "manufacturer": "Kenner",
          "highlight": null,
          "images": [],
          "accessories": [],
          "release": null,
          "tags": [],
          "date_update": "2018-10-14T12:47:38.000Z",
          "date_created": "2018-10-14T12:47:38.000Z"
        }
      ]
    };
  }

}
