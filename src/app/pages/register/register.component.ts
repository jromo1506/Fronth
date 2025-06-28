import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  loginForm: FormGroup;

  constructor( 
    private userService:UserService
  ) {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if(this.loginForm.value.password === this.loginForm.value.repeatPassword){


        this.userService.addUser(this.loginForm.value).subscribe(data=>{

          Swal.fire({
            title: 'Success',
            text: 'Your account has been registered',
            background: '#2e2e2e',  // Fondo oscuro
            color: '#ffffff',
            icon: 'success',
            confirmButtonColor: '#f79737',
            
            confirmButtonText: 'Yeah'
          });
        });


      }
      else{
       var pwdMiss=document.getElementById("pwd") as HTMLDivElement;
        pwdMiss.style.display="block";
      }
      
    } else {
      console.log('Formulario inválido');
    }
  }
}
