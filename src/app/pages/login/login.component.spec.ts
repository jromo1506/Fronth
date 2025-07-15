import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { throwError } from 'rxjs';
import { UserAuthService } from '../../services/user-auth.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;  // ← corregido tipo

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserAuthService', ['authUser', 'clearCredentials']); // ← crea los métodos necesarios

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService }
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
    it('No se debe de llamar authUser si el formulario es invalido', () => {
      component.loginForm.setValue({
        username: '',
        password: '',
        recaptcha: ''
      });

      component.onSubmit();

      expect(mockUserService.authUser).not.toHaveBeenCalled();
    });

    it('Debe llamarse authUser si el formulario es valido', () => {
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
});