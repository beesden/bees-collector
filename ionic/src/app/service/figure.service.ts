import { Injectable } from "@angular/core";
import { Figure } from "src/app/entity/figure";
import { FigureAccessory } from "src/app/entity/figure-accessory";
import { ConnectionService, Store } from "src/app/service/connection.service";

export interface DBResponse<T> {
	items: T[];
	total: number;
}

@Injectable()
export class FigureService {

	constructor(private connectionService: ConnectionService) {
	}

	/**
	 * Delete a figure from the database and remove from any collections.
	 *
	 * @param figureId
	 */
	deleteOne(figureId: string) {

		return this.connectionService.connection.then(database => {

			const tx: IDBTransaction = database.transaction(Store.FIGURE, 'readwrite');
			const store: IDBObjectStore = tx.objectStore(Store.FIGURE);

			store.delete(figureId);

		});

	}

	/**
	 * Fetch a single figure from the database.
	 *
	 * @param figureId
	 */
	getOne(figureId: string): Promise<Figure> {

		return this.connectionService.connection.then(database => {

			const tx: IDBTransaction = database.transaction(Store.FIGURE, 'readwrite');
			const store: IDBObjectStore = tx.objectStore(Store.FIGURE);

			return new Promise<Figure>((resolve, reject) => {

				const request = store.get(figureId);

				tx.oncomplete = () => resolve(new Figure(request.result));
				tx.onerror = error => reject(error);

			});

		});

	}

	/**
	 * List all highlighted figures.
	 */
	getHighlights(count: number, page: number): Promise<DBResponse<Figure>> {

		return this.getList(count, page);

	}

	/**
	 * List all figures in the database.
	 */
	getList(count: number, page: number, query?: string): Promise<DBResponse<Figure>> {

		return this.connectionService.connection.then(database => {

			const tx: IDBTransaction = database.transaction(Store.FIGURE, 'readwrite');
			const store: IDBObjectStore = tx.objectStore(Store.FIGURE);

			return new Promise<number>((resolve, reject) => {
				const request = store.count();
				request.onsuccess = () => resolve(request.result);
				request.onerror = error => reject(error);
			}).then(total => new Promise<DBResponse<Figure>>((resolve, reject) => {

				const figures = [];
				const start = page * count;
				let skipped = start === 0;

				const request = store.openCursor();
				request.onsuccess = () => {
					const cursor = request.result;

					if (figures.length >= count || !cursor) {
						resolve({items: figures, total});
						return;
					}

					if (!skipped) {
						skipped = true;
						cursor.advance(start);
					} else {
						figures.push(new Figure(cursor.value));
						cursor.continue();
					}

				};
				request.onerror = error => reject(error);

			}));

		});

	}

	/**
	 * Create / update a figure.
	 *
	 * @param figure
	 */
	save(figure: Figure): Promise<Figure> {

		return this.connectionService.connection.then(database => {

			const tx: IDBTransaction = database.transaction(Store.FIGURE, 'readwrite');
			const store: IDBObjectStore = tx.objectStore(Store.FIGURE);

			store.put(figure);
			return null;

		});

	}

	/**
	 * Search for figures by query string.
	 *
	 * Search results are returned based on both name and notes fields.
	 */
	search(queryString: string, count: number, page: number): Promise<[Figure[], number]> {

		return Promise.resolve<[Figure[], number]>([[], 0]);

		// return this.query.then(query => query
		//   .andWhere(`figure.name LIKE '%${queryString}%'`)
		//   .orWhere(`figure.variant LIKE '%${queryString}%'`)
		//   .orWhere(`figure.notes LIKE '%${queryString}%'`)
		//   .skip(count * page)
		//   .take(count)
		//   .getManyAndCount());

	}

	/**
	 * Add an accessory to an existing figure.
	 * If the figure already has the accessory, it won't be added again.
	 *
	 * @param figureId
	 * @param accessory
	 */
	addAccessoryToFigure(figureId: number, accessory: FigureAccessory): Promise<Figure> {

		return Promise.resolve(null);
		// return this.getOne(figureId).then(figure => {
		//
		//   if (!figure.accessories) {
		//     figure.accessories = [];
		//   }
		//
		//   if (!figure.accessories.find(entry => entry.id === accessory.id)) {
		//     figure.accessories.push(accessory);
		//     return this.save(figure);
		//   }
		//
		// });

	}

}
