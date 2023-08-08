import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  cartSub: Subscription | undefined;

  constructor(private cart: CartService, private router: Router) {}

  get cartTotal() {
    return this.items.reduce((sum, currItem) => {
      return sum + currItem.quantity * currItem.product.price;
    }, 0);
  }

  ngOnInit(): void {
    this.cartSub = this.cart.hookToCart().subscribe({
      next: ({ items }) => (this.items = items),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }

  clearCart() {
    this.cart.clearCart();
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
