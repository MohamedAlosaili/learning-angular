import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSettings } from './user-settings';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * Fake server from: https://pipedream.com
   * */
  url = 'https://eo8b7025u5z7s6k.m.pipedream.net';

  constructor(private http: HttpClient) {}

  /**
   * In Angular Observable is the way to work with Asynchronous operations
   */
  postUserSettings(userSettings: UserSettings): Observable<UserSettings> {
    return this.http.post<UserSettings>(this.url, JSON.stringify(userSettings));
    // return of(userSettings).pipe(delay(2000));
  }

  getFormCountries(): Observable<string[]> {
    return of(['saudi arabia', 'bahrain', 'Kuwait']).pipe(delay(2000));
  }
}
