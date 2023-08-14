import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from './data/user-settings';
import { DataService } from './data/data.service';
import { Observable, Subscription, firstValueFrom } from 'rxjs';

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
  postSub: Subscription | undefined;
  submitErrorMessage?: string;
  loading = false;
  countries$!: Observable<string[]>;

  /**
   * Copying form data:
   */
  originalUserSettings: UserSettings = {
    name: 'Salem',
    emailOffer: false,
    theme: 'system',
    country: 'saudi arabia',
    notes: 'notes...',
  };

  // ⚠ Without spread(copying) changes made on userSettings reflect on the original object
  // ⚠ Spread copy the top-level property, if you need to get a deep copy: https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.countries$ = this.data.getFormCountries();
  }

  onSubmit(form: NgForm) {
    this.submitErrorMessage = undefined;
    // Validate before submitting the form to the server
    console.log(`Form is ${form.valid ? 'valid' : 'invalid'}`);
    console.log(form.valid);

    if (form.valid) {
      this.loading = true;
      this.postSub = this.data.postUserSettings(this.userSettings).subscribe({
        next: (data) => {
          this.loading = false;
          console.log(data);
          this.router.navigate(['/submitted']);
        },
        error: this.handleSubmitError.bind(this),
      });
    }
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
  }

  onBlur(name: NgModel) {
    this.nameValid = !!name.valid;
  }

  handleSubmitError(err: any) {
    this.loading = false;
    this.submitErrorMessage =
      'Failed to submit the form, please try again later.';
  }
}
