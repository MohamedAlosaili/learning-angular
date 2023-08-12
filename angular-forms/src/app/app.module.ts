import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserSettingComponent } from './user-setting/user-setting.component';

@NgModule({
  declarations: [AppComponent, UserSettingComponent],

  // To work with forms (e.g. form Directives) we need FormsModule + Provide Angular form features
  // Now, Angular aware of our forms
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
