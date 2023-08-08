import { Injectable } from '@angular/core';

type Storage = 'localStorage' | 'sessionStorage';

/**
 *
 * This Service will be provided in the component/service level.
 *
 * Because Angular creates a shared instance of the service, this service will be shared across components
 * This behavior will result in a conflict in instances and produce a strange behaviors, when a component
 * tries to update storage to sessionStorage where other components need to use localStorage.
 *
 * Using this service in component/service level will prevent this strange behavior, although we have the same
 * strange behavior between component and it's children.
 *
 */

/**
 * Goal:
 *  Make this service consistent (shared instance) in CartService because it uses the same configurations.
 *  Also, having different instances of the service in each component used it.
 *
 * Solution:
 *  - Add the service to the providers array in AppModule to be available to used as shared instance with "Carefulness"
 *  - Any Component needs a different instance to change the configurations, should add the service to it's provider array to create a new instance
 *
 * This related to how Angular inject services in the components:
 *  - It looks in the providers array in the @Component decorator
 *  - If it doesn't find the service it looks to the root injector or providers array in the application module.
 *
 * Current Problem: When another service needs a different instance to change the configuration, it'll be conflict with other service uses the shared instance.
 *
 * To solve the problem there is way with useFactory to customize the creation of each service
 *
 */

@Injectable()
export class StorageService {
  private storage: Storage = 'localStorage';

  getItem<T = unknown>(key: string, fallback: string = 'null') {
    return JSON.parse(window[this.storage].getItem(key) ?? fallback) as T;
  }

  setItem<T = unknown>(key: string, value: T) {
    window[this.storage].setItem(key, JSON.stringify(value));
  }

  clearStorage() {
    window[this.storage].clear();
  }

  /**
   * @description Change storage type from localStorage to sessionStorage, by default storage is localStorage
   * @param storage ['localStorage' | 'sessionStorage']
   * */
  setStorage(storage: Storage) {
    if (storage !== 'localStorage' && storage !== 'sessionStorage') {
      this.storage = 'localStorage';
    } else {
      this.storage = storage;
    }
  }
}
