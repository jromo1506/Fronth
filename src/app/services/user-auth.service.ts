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

  // Método para guardar las credenciales en localStorage
  saveCredentials(userId: string, username: string): void {
    const credentials = { userId, username };
    localStorage.setItem(this.storageKey, JSON.stringify(credentials));
    this.credentialsSubject.next(credentials); // Emitir el nuevo estado
  }

  // Método para extraer las credenciales de localStorage
  getCredentials(): { userId: string, username: string } | null {
    const credentials = localStorage.getItem(this.storageKey);
    return credentials ? JSON.parse(credentials) : null;
  }

  // Método para eliminar las credenciales de localStorage
  clearCredentials(): void {
    localStorage.removeItem(this.storageKey);
    this.credentialsSubject.next(null); // Emitir el nuevo estado
  }
}
