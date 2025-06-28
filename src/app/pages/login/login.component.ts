import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { NgxCaptchaModule } from 'ngx-captcha';


@Component({
  selector: 'app-login',
  imports: [NgxCaptchaModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
    this.userService.authUser(this.loginForm.value).subscribe(
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
