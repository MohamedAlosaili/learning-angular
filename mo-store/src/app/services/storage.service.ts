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

// TODO: ProvideIn should be fixed
@Injectable({ providedIn: 'any' })
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
