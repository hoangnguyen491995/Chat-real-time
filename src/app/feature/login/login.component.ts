import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { emailValidator } from 'src/app/directive/EmailValidator.directive';
import { DataService } from 'src/app/service/api/Data.service';
import { AuthGuard } from 'src/app/service/authorization/auth.guard';

import Swal from 'sweetalert2';

interface IUser {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  reactiveForm: any;
  constructor(private authGuard: AuthGuard, private http: HttpClient, private dataService: DataService, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(10),
      ]),

    });

 
  }

  isFieldFocused: boolean = false;
  isFieldFocusedPassword: boolean = false;
  onFocusEmail() {
    this.isFieldFocused = true;
  }
  onFocusPassword() {
    this.isFieldFocusedPassword = true;
  }

  onBlurEmail() {
    this.isFieldFocused = false;
  }
  onBlurPassword() {
    console.log(this.user);
    
    this.isFieldFocusedPassword = false;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }

  public validate(): void {
    console.info('Email:', this.user.email);
    console.info('Password:', this.user.password);

    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.user = this.reactiveForm.value;
    console.info('Email:', this.user.email);
    console.info('Password:', this.user.password);
  }

  login() {
    if (localStorage.getItem('currentUser') == null || localStorage.getItem('currentUser') == undefined) {
      this.dataService.login(this.user).subscribe({
        next: (response) => {
          console.log(response);
          if (response != null) {
            // this.authGuard.getCurrentUser()
            localStorage.setItem('currentUser', JSON.stringify(response));
            console.log(JSON.stringify(response));

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login Success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              if (response.role == "ADMIN") {
                this.router.navigate(['/admin/manage/notification']);
              } else {
                // window.location.href = '/home';
                this.router.navigate(['/home']);
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Wrong email or password!',
              showCancelButton: true,
              showConfirmButton: false
            })

          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: "Error 500 not found",
            showCancelButton: true,
            showConfirmButton: false
          })
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Can not register two accounts on one device!',
        showCancelButton: true,
        showConfirmButton: false
      })
    }

  }
}
