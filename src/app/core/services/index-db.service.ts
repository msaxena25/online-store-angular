import { Injectable } from '@angular/core';
import { ICartProduct } from '../interfaces/cart-product.interface';

const DB_NAME = 'YCompanyDB';
const STORE_NAME = 'CartItems';
const DB_VERSION = 1;

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {

  private db: IDBDatabase | null = null;

  constructor() {
    this.openDb();
  }

  // Wait until DB is initialized and execute the action
  private checkDbInitialization(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {
        const interval = setInterval(() => {
          if (this.db) {
            clearInterval(interval);
            resolve(this.db);
          }
        }, 100); // Check every 100ms
      }
    });
  }

  // Open IndexedDB database
  private openDb(): void {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBRequest).result;
      console.log('IndexedDB created successfully', this.db?.name);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
    };
  }

  public saveProduct(product: ICartProduct): Promise<void> {
    return this.checkDbInitialization().then(db => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Check if product already exists, otherwise we add new product
      const request = store.get(product.id);

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          if (request.result) {
            // If product already exists, update it
            store.put(product);
          } else {
            // Otherwise, add the new product
            store.add(product);
          }
          resolve();
        };

        request.onerror = (event) => reject(event);
      });
    });
  }


  // Get all products from IndexedDB
  public getAllProducts(): Promise<any[]> {
    return this.checkDbInitialization().then(db => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
        request.onerror = (event) => reject(event);
      });
    });
  }

  // Delete a product from IndexedDB
  public deleteProduct(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }
}
