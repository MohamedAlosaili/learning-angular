import { Component, OnInit } from '@angular/core';
import { Product } from '../types';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NumberOfItems } from '../base/NumberOfItems.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent extends NumberOfItems implements OnInit {
  product: Product = this.route.snapshot.data['product'];

  quantity = 1;

  constructor(cart: CartService, private route: ActivatedRoute) {
    super(cart);
  }

  ngOnInit(): void {
    super.hookToCart(this.product);
  }

  onClick(product: Product) {
    this.cart.addToCart(product, this.quantity);
    this.quantity = 1;
  }
}
