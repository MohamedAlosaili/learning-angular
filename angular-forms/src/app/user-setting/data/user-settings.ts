export interface UserSettings {
  name: string;
  emailOffer: boolean;
  theme: 'light' | 'dark' | 'system';
  country: string;
  notes: string;
  birthday?: Date | string;
}
