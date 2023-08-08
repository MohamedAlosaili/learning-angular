import { Injectable } from '@angular/core';
import { CartItem, Product } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

const STORAGE = 'cart-items';

@Injectable({
  providedIn: 'root',
  deps: [StorageService],
})
export class CartService {
  private cart = new BehaviorSubject<{ items: CartItem[] }>({
    items: this.storage.getItem(STORAGE, '[]'),
  });

  constructor(private storage: StorageService) {}

  addToCart(product: Product, quantity: number = 1) {
    const items = this.getCartItems();

    const existInCart = items.some((item) => item.product.id === product.id);

    if (existInCart) {
      this.increaseQuantity(product, quantity);
    } else {
      this.updateCart([{ product, quantity }, ...items]);
    }
  }

  removeFromCart(product: Product) {
    const newItems = this.getCartItems().filter(
      (item) => item.product.id !== product.id
    );
    this.updateCart(newItems);
  }

  increaseQuantity(product: Product, quantity: number = 1) {
    const newItems = this.getCartItems().map((item) => {
      if (item.product.id === product.id) {
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });
    this.updateCart(newItems);
  }

  decreaseQuantity(product: Product) {
    const items = this.getCartItems();
    const lastOne =
      items.find((item) => item.product.id === product.id)?.quantity === 1;
    if (lastOne) return this.removeFromCart(product);

    this.updateCart(
      items.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  }

  clearCart() {
    this.updateCart([]);
  }

  private updateCart(newItems: CartItem[]) {
    this.cart.next({ items: newItems });

    this.storage.setItem(STORAGE, this.getCartItems());
  }

  private getCartItems() {
    return this.cart.value.items;
  }

  hookToCart(): Observable<{ items: CartItem[] }> {
    return this.cart;
  }
}
