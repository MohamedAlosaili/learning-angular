import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem, Product } from 'src/app/types';

@Component({
  selector: 'app-cart-item',
  templateUrl: 'cart-item.component.html',
  styleUrls: ['cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItem;
  private _quantity!: number;
  total = 0;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.updateTotal();
  }

  get quantity() {
    return this._quantity ?? this.item.quantity;
  }

  set quantity(value: number) {
    if (this.quantity > value) {
      this.cart.decreaseQuantity(this.item.product);
    } else {
      this.cart.increaseQuantity(this.item.product);
    }
  }

  updateTotal() {
    this.total = this.quantity * this.item.product.price;
  }

  removeItem(product: Product) {
    this.cart.removeFromCart(product);
  }
}
