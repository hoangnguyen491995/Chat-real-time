import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, Subscription, delay, from, interval, of, timer } from 'rxjs';
import { emailValidator } from 'src/app/directive/EmailValidator.directive';
import { DataService } from 'src/app/service/api/Data.service';
// import { UserService } from 'src/app/service/user-info/user.service';

import Swal from 'sweetalert2';


interface IUser {
  username: string;
  birthday: Date
  email: string;
  password: string;
  password2: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  user = {
    username: "",
    birthday: "",
    email: '',
    password: '',
    password2: '',
  };
  reactiveForm: any;
  myForm!: FormGroup;
  numberTest!: number;
  Observer: Partial<Observer<0>> | ((value: 0) => void) | undefined;
  subscription: any;
  constructor(private http: HttpClient, private dataService: DataService, private router: Router, private formBuilder: FormBuilder) {
  }

  dateValidator(control: FormControl): { [key: string]: any } | null {
    const datePattern = /^\d{4}\-\d{2}\-\d{2}$/;

    const date = control.value;
    console.log(date);

    if (!datePattern.test(date)) {
      return { invalidDate: true };
    }
    return null;
  }

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
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(10),
      ]),
      birthday: new FormControl('', [Validators.required, Validators.minLength(10), this.dateValidator]),
      password2: new FormControl(this.user.password2, [
        Validators.required,
        Validators.minLength(10),
        this.matchPasswordValidator('password')
      ]),
    });
    const myObservable = interval(2000);

    // const subscription : Subscription  = myObservable.subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    //   complete: () => {
    //     console.log('Hoàn thành.');
    //   }
    // });

  const array = [1,2,3,5465,46,5767]
  from(array).subscribe({
    next: (value) => {
      console.log(value);
    },
    error: (err) => {
      console.error(err);
    },
    complete: () => {
      console.log('Hoàn thành.');
    }
  });

    // subscription.unsubscribe()

  }
  get username() {
    return this.reactiveForm.get('username')!;
  }

  get birthday() {
    // console.log(this.reactiveForm.get('birthday'));
    return this.reactiveForm.get('birthday')!;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }
  get password2() {
    return this.reactiveForm.get('password2')!;
  }

  matchPasswordValidator(passwordKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.parent?.get(passwordKey)?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
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

  register() {
    this.dataService.register(this.user).subscribe({
      next: (response) => {
        if (response != null) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sign Up Success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            if (response.role == "ADMIN") {
              this.router.navigate(['/admin/manage/notification']);
            } else {
              this.router.navigate(['/home']);
            }
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email already exists!',
            showCancelButton: true,
            showConfirmButton: false
          })
        }
      },
      error: (error) => {
        console.log('Observable error');
      },
      complete: () => {
        // Đoạn mã xử lý khi Observable hoàn thành
        console.log('Observable completed');
      }
    });
  }

  isFieldFocusedUsername: boolean = false;
  isFieldFocusedBirthday: boolean = false;
  isFieldFocusedEmail: boolean = false;
  isFieldFocusedPassword: boolean = false;
  isFieldFocusedPassword2: boolean = false;

  onFocusUsername() {
    this.isFieldFocusedUsername = true;
  }

  onFocusBirthday() {
    this.isFieldFocusedBirthday = true;
  }

  onFocusEmail() {
    this.isFieldFocusedEmail = true;
  }

  onFocusPassword() {
    this.isFieldFocusedPassword = true;
  }

  onFocusPassword2() {
    this.isFieldFocusedPassword2 = true;
  }

  onBlurUsername() {
    this.isFieldFocusedUsername = false;
  }

  onBlurBirthday() {
    console.log(this.user.birthday);

    this.isFieldFocusedBirthday = false;
  }

  onBlurEmail() {
    this.isFieldFocusedEmail = false;
  }

  onBlurPassword() {
    this.isFieldFocusedPassword = false;
  }

  onBlurPassword2() {
    this.isFieldFocusedPassword2 = false;
  }

  ngOnDestroy(): void {
    console.log("hủy component register");
    alert("hủy component register")
    // this.subscription.unsubscribe(); 
  }
}
