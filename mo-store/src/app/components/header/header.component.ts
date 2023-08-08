import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemsNumber = 0;
  cartSub: Subscription | undefined;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.cart.hookToCart().subscribe({
      next: ({ items }) => {
        this.cartItemsNumber = items.reduce(
          (sum, curr) => sum + curr.quantity,
          0
        );
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }
}
