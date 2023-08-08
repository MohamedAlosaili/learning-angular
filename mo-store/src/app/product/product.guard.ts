import { inject } from '@angular/core';
import { CanActivateFn, Router, ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../types';
import { Observable, catchError, map, of } from 'rxjs';

export const productGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const productService = inject(ProductsService);

  const productId = Number(route.params['productId']);

  if (!productId) {
    router.navigate(['/not-found']);
    return false;
  }

  const product = productService.getProduct(productId.toString()).subscribe({
    next: (product) => {
      if (product) {
      }
    },
  });

  console.log(route);
  console.log(state);

  return true;
};

export const productResolver: ResolveFn<Observable<Product | null>> = (
  route,
  state
) => {
  const productId = route.params['productId'];

  const router = inject(Router);
  const productService = inject(ProductsService);

  return productService.getProduct(productId).pipe(
    map((product) => {
      if (product) {
        return product;
      } else {
        router.navigate(['/not-found'], { queryParams: { product: true } });
        return null;
      }
    }),
    catchError((err) => {
      router.navigate(['/not-found'], { queryParams: { product: true } });
      return of(null);
    })
  );
};
