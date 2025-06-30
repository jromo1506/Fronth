import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly storageKey = 'auth-credentials';
  private credentialsSubject = new BehaviorSubject<{ userId: string, username: string } | null>(this.getCredentials());
  credentials$ = this.credentialsSubject.asObservable();

  constructor() { }

  saveCredentials(userId: string, username: string): void {
    const credentials = { userId, username };
    localStorage.setItem(this.storageKey, JSON.stringify(credentials));
    this.credentialsSubject.next(credentials); 
  }

  getCredentials(): { userId: string, username: string } | null {
    const credentials = localStorage.getItem(this.storageKey);
    return credentials ? JSON.parse(credentials) : null;
  }

  clearCredentials(): void {
    localStorage.removeItem(this.storageKey);
    this.credentialsSubject.next(null);
  }
}
