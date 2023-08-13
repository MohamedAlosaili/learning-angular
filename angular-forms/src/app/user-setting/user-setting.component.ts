import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from './data/user-settings';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css'],
})
export class UserSettingComponent {
  /**
   * In this feature, we make the user focus on important fields and shows other fields when the important is filled
   */
  nameValid = false;

  /**
   * Copying form data:
   */
  originalUserSettings: UserSettings = {
    name: '',
    emailOffer: false,
    theme: 'system',
    country: 'saudi arabia',
    notes: 'notes...',
  };

  // ⚠ Without spread(copying) changes made on userSettings reflect on the original object
  // ⚠ Spread copy the top-level property, if you need to get a deep copy: https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
  userSettings: UserSettings = { ...this.originalUserSettings };

  onSubmit(form: NgForm) {
    // Validation before submitting the form to the server
    console.log(`Form is ${form.valid ? 'valid' : 'invalid'}`);
    console.log(form);
  }

  onBlur(name: NgModel) {
    this.nameValid = !!name.valid;
  }
}
