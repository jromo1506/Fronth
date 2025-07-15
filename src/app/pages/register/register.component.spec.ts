import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { provideAnimations } from '@angular/platform-browser/animations';

// Mock de UserService
const mockUserService = {
  addUser: jasmine.createSpy('addUser').and.returnValue(of({}))
};



describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RegisterComponent],
      declarations: [],
      providers: [ provideAnimations(),{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;


    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
      value: true // o lo que tu lógica necesite
    }));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si está vacío', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('no debe llamar a addUser si las contraseñas no coinciden', () => {
    component.loginForm.setValue({
      name: 'Juan',
      lastName: 'Pérez',
      username: 'juanp',
      email: 'juan@example.com',
      password: '123456',
      repeatPassword: '654321'
    });

    const div = document.createElement('div');
    div.id = 'pwd';
    div.style.display = 'none';
    document.body.appendChild(div);

    component.onSubmit();

    expect(mockUserService.addUser).not.toHaveBeenCalled();
    expect(div.style.display).toBe('block');

    document.body.removeChild(div);
  });

  it('debe llamar a addUser y Swal.fire si el formulario es válido y las contraseñas coinciden', () => {
    component.loginForm.setValue({
      name: 'Ana',
      lastName: 'García',
      username: 'anag',
      email: 'ana@example.com',
      password: 'abc123',
      repeatPassword: 'abc123'
    });

    component.onSubmit();

    expect(mockUserService.addUser).toHaveBeenCalledWith({
      name: 'Ana',
      lastName: 'García',
      username: 'anag',
      email: 'ana@example.com',
      password: 'abc123'
    });

    expect(Swal.fire).toHaveBeenCalled();
  });
});