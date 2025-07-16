import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { GolbalApiService } from './golbal-api.service';
import { User } from '../models/User';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let apiServiceSpy: jasmine.SpyObj<GolbalApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GolbalApiService', ['getURL']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: GolbalApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    apiServiceSpy = TestBed.inject(GolbalApiService) as jasmine.SpyObj<GolbalApiService>;
    apiServiceSpy.getURL.and.returnValue('http://localhost/api');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería enviar POST a /addUser', () => {
    const user: User = { email: 'test@example.com', password: '1234' } as User;

    service.addUser(user).subscribe();

    const req = httpMock.expectOne('http://localhost/api/addUser');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
  });

  it('debería enviar POST a /getUser', () => {
    const partialUser = { email: 'test@example.com' };

    service.getUser(partialUser).subscribe();

    const req = httpMock.expectOne('http://localhost/api/getUser');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(partialUser);
  });

  it('debería enviar POST a /authUser', () => {
    const user = { email: 'test@example.com', password: '1234' };

    service.authUser(user).subscribe();

    const req = httpMock.expectOne('http://localhost/api/authUser');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
  });

  it('debería enviar POST a /forgotPasswordEmail', () => {
    const email = { email: 'test@example.com' };

    service.forgotPassword(email).subscribe();

    const req = httpMock.expectOne('http://localhost/api/forgotPasswordEmail');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(email);
  });

  it('debería enviar GET a /resetPassword/:token', () => {
    const token = 'abcdef';

    service.verifyToken(token).subscribe();

    const req = httpMock.expectOne('/resetPassword/abcdef');
    expect(req.request.method).toBe('GET');
  });
});