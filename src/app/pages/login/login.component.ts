import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { trigger,transition,style,animate} from '@angular/animations';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  imports: [NgxCaptchaModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations:[
    trigger('slideInUp',[
      transition(':enter',[
        style({opacity:0,transform:'translateY(-10px)'}),
        animate('500ms ease-out',style({opacity:1,transform:'translateY(0'}))
      ])
    ])
  ]
})
export class LoginComponent {

  loginForm: FormGroup;
  siteKey: string = "6LdoQikqAAAAAK04tMycZya478n91Wu38wELZGYB";

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: UserAuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptcha: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authUser();
    } else {
      var pwdMiss = document.getElementById("pwd") as HTMLDivElement;
      pwdMiss.style.display = "block";
    }
  }

  authUser() {
    const { username, password } = this.loginForm.value;
    this.userService.authUser({ username, password }).subscribe(
      (found: any) => {
        this.auth.saveCredentials(found._id, found.username);



        Swal.fire({
          title: 'Success',
          text: 'Welcome back ' + this.loginForm.value.username,
          background: '#2e2e2e',  // Fondo oscuro
          color: '#ffffff',
          icon: 'success',
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/Home']);
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'Error',
          text: 'Authentication failed or user not found',
          background: '#2e2e2e',
          color: '#ffffff',
          icon: 'error',
          confirmButtonColor: '#f79737',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
