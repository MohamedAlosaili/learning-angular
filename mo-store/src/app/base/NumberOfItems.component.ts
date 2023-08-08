import { Component, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../types';

@Component({ template: '' })
export class NumberOfItems implements OnDestroy {
  numberOfItemInCart = 0;
  cartSub: Subscription | undefined;

  constructor(protected cart: CartService) {}

  hookToCart(product: Product): void {
    this.cartSub = this.cart.hookToCart().subscribe({
      next: ({ items }) => {
        const productInCart = items.find(
          (item) => item.product.id === product.id
        );
        if (productInCart) {
          this.numberOfItemInCart = productInCart.quantity;
        } else if (this.numberOfItemInCart > 0) {
          this.numberOfItemInCart = 0;
        }
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }
}
