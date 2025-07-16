import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserAuthService } from '../../services/user-auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<UserAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('UserAuthService', ['clearCredentials']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy.credentials$ = of({ userId: 'test' ,username:'test'}); // o null, o el valor esperado
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: UserAuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
            params: of({}),
            queryParams: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería decir "Fronth"', () => {
    expect(component.title).toBe('Fronth');
  });

  it('debería cerrar sesión y redirigir al Home', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false
      } as SweetAlertResult<any>));
    component.logout();

    expect(authServiceSpy.clearCredentials).toHaveBeenCalled();

    await fixture.whenStable();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/Home']);
  });
});