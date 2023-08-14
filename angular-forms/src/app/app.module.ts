import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { SubmittedComponent } from './submitted/submitted.component';

const routes: Routes = [
  {
    path: '',
    component: UserSettingComponent,
  },
  { path: 'submitted', component: SubmittedComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent, UserSettingComponent, SubmittedComponent],

  // To work with forms (e.g. form Directives) we need FormsModule + Provide Angular form features
  // Now, Angular aware of our forms
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
