import { TestBed } from '@angular/core/testing';
import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  let service: UserAuthService;
  const mockKey = 'auth-credentials';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('saveCredentials debería guardar en localStorage y emitir por credentials$', (done) => {
    const userId = 'u123';
    const username = 'testuser';

    service.credentials$.subscribe(value => {
      if (value) {
        expect(value).toEqual({ userId, username });
        expect(localStorage.getItem(mockKey)).toBe(JSON.stringify({ userId, username }));
        done();
      }
    });

    service.saveCredentials(userId, username);
  });

  it('getCredentials debería devolver datos desde localStorage', () => {
    const stored = { userId: 'a1', username: 'storedUser' };
    localStorage.setItem(mockKey, JSON.stringify(stored));

    const result = service.getCredentials();
    expect(result).toEqual(stored);
  });

  it('clearCredentials debería limpiar localStorage y emitir null', (done) => {
    service.saveCredentials('id', 'name');

    service.credentials$.subscribe(value => {
      if (value === null) {
        expect(localStorage.getItem(mockKey)).toBeNull();
        done();
      }
    });

    service.clearCredentials();
  });
});
