import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../types';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(filter?: string): Observable<Product[]> {
    const filterBy = filter ? `/category/${filter}` : '';

    return this.http
      .get<Product[]>(`https://fakestoreapi.com/products${filterBy}`)
      .pipe(
        // tap((data) => console.log('All: ', data)),
        catchError(this.errorHandler)
      );
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>(`https://fakestoreapi.com/products/${id}`)
      .pipe(
        // tap((data) => console.log(`Product (${id}): `, data)),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(err: HttpErrorResponse) {
    return throwError(() => err.message ?? 'Something went wrong!');
  }
}
