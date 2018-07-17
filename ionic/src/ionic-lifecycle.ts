/**
 * Fired only when a view is stored in memory.
 * This event is NOT fired on entering a view that is already cached. It’s a nice place for init related tasks.
 */
export interface IonViewDidLoad {
  ionViewDidLoad(): void;
}

/**
 * It’s fired when entering a page, before it becomes the active one. Use it for tasks you want to do every time you enter in the view (setting event listeners, updating a table, etc.).
 */
export interface IonViewWillEnter {
  ionViewWillEnter(): void;
}

/**
 * Fired when entering a page, after it becomes the active page. Quite similar to the previous one.
 */
export interface IonViewDidEnter {
  ionViewDidEnter(): void;
}

/**
 * Fired when you leave a page, before it stops being the active one.
 * Use it for things you need to run every time you are leaving a page (deactivate event listeners, etc.).
 */
export interface IonViewWillLeave {
  ionViewWillLeave(): void;
}

/**
 * Fired when you leave a page, after it stops being the active one.
 * Similar to the previous one.
 */
export interface IonViewDidLeave {
  ionViewDidLeave(): void;
}

/**
 * Fired when a view is going to be completely removed (after leaving a non-cached view).
 */
export interface IonViewWillUnload {
  ionViewWillUnload(): void;
}

/**
 * Fired before entering into a view, allows you to control whether the view can be accessed or not (returning true or false).
 */
export interface IonViewCanEnter {
  ionViewCanEnter(): Promise<void>;
}

/**
 * Fired before leaving a view, allows you to control whether the view can be left or not.
 */
export interface IonViewCanLeave {
  ionViewCanLeave(): Promise<void>;
}
