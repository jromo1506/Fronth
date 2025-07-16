import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserAuthService } from '../../services/user-auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let mockAuthService: jasmine.SpyObj<UserAuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['authUser']);
    mockAuthService = jasmine.createSpyObj('UserAuthService', ['saveCredentials']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService },
        { provide: UserAuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('no debe llamar authUser si el formulario es inválido', () => {
      component.loginForm.setValue({
        username: '',
        password: '',
        recaptcha: ''
      });

      component.onSubmit();

      expect(mockUserService.authUser).not.toHaveBeenCalled();
    });

    it('debe llamar authUser si el formulario es válido', () => {
      const spy = spyOn(component, 'authUser');
      component.loginForm.setValue({
        username: 'user',
        password: 'pass',
        recaptcha: 'token'
      });

      component.onSubmit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('authUser', () => {
      
    it('debe autenticar y redirigir si las credenciales son válidas', fakeAsync(() => {
      const mockResponse = { _id: '123', username: 'user' };
      mockUserService.authUser.and.returnValue(of(mockResponse));

      spyOn<any>(window, 'Swal').and.returnValue(Promise.resolve());

      component.loginForm.setValue({
        username: 'user',
        password: 'pass',
        recaptcha: 'token'
      });

      component.authUser();
      tick(); // Espera que se resuelva el Promise de Swal

      expect(mockUserService.authUser).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
      expect(mockAuthService.saveCredentials).toHaveBeenCalledWith('123', 'user');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
    }));

  
      it('debe manejar error si authUser falla', fakeAsync(() => {
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({ isConfirmed: false } as SweetAlertResult<any>)
      );

      mockUserService.authUser.and.returnValue(
        throwError(() => new Error('auth failed'))
      );

      component.loginForm.setValue({
        username: 'user',
        password: 'wrong',
        recaptcha: 'token'
      });

      component.authUser();
      tick();

      expect(mockUserService.authUser).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalled();
    }));
  });
});
