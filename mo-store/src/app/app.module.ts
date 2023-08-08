import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './Home/card/card.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { productGuard, productResolver } from './product/product.guard';
import { StarComponent } from './product/star/star.component';
import { ButtonComponent } from './components/button/button.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { QuantityComponent } from './components/quantity/quantity.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products/:productId',
    component: ProductComponent,
    // canActivate: [productGuard],
    resolve: {
      product: productResolver,
    },
  },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CardComponent,
    CartComponent,
    CartItemComponent,
    ProductComponent,
    QuantityComponent,
    NotFoundComponent,
    StarComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
