import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../types';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [StorageService],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: string[] = [];
  sub: Subscription | undefined;
  filterBy: string = 'all';
  loading = true;

  constructor(
    private productsService: ProductsService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  async getProductCategories() {
    const cached = this.storage.getItem<string[]>('categories');

    if (cached) {
      this.categories = cached;
      return;
    }

    // TODO: Should I use service here? or move it to ProductsService?
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();

    this.categories = categories;
    this.storage.setItem('categories', categories);
  }

  toggleFilterBy(value: string) {
    if (this.filterBy !== value) {
      this.filterBy = value;
      this.getProducts();
    }
  }

  getProducts() {
    this.sub?.unsubscribe();
    this.loading = true;

    const filterBy = this.filterBy === 'all' ? undefined : this.filterBy;

    this.sub = this.productsService.getProducts(filterBy).subscribe({
      next: (products) => {
        this.loading = false;
        this.products = products;
      },
      error: (err) => console.log(err),
    });
  }
}
