import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/types';
import { Subscription } from 'rxjs';
import { NumberOfItems } from 'src/app/base/NumberOfItems.component';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent extends NumberOfItems implements OnInit {
  @Input() product!: Product;

  constructor(cart: CartService) {
    super(cart);
  }

  ngOnInit(): void {
    super.hookToCart(this.product);
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
  }
}
