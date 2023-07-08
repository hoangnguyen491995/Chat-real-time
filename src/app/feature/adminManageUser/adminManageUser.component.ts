import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/directive/EmailValidator.directive';
import { DataService } from 'src/app/service/api/Data.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-adminManageUser',
  templateUrl: './adminManageUser.component.html',
  styleUrls: ['./adminManageUser.component.css']
})
export class AdminManageUserComponent implements OnInit {

  isDeleteModalOpen = false;
  dismissModal: boolean = false;
  public deleteModalVisible: boolean = false;
  isFieldFocusedUsername: boolean = false;
  isFieldFocusedBirthday: boolean = false;
  isFieldFocusedEmail: boolean = false;
  isFieldFocusedPassword: boolean = false;
  isFieldFocusedPassword2: boolean = false;
  currentUser: any
  users: any[] = [
  ];
  dateValidator(control: FormControl): { [key: string]: any } | null {
    const datePattern = /^\d{4}\-\d{2}\-\d{2}$/;
    const date = control.value;

    if (!datePattern.test(date)) {
      return { invalidDate: true };
    }
    return null;
  }

  reactiveForm: any;
  user = {
    id: 0,
    username: '',
    password: "",
    password2: "",
    email: '',
    birthday: ""
  };
  userDetail = {
    emailDetail: "",
    dateDetail: "",
    nameDetail: "",
    idDetail: 0,
    passwordDetail: "",
    password2Detail: "",
  }

  usercurrent: any;

  @ViewChild('toggleBtn') toggleBtn: ElementRef<HTMLButtonElement> | undefined
  @ViewChild('focus') focus: ElementRef<HTMLInputElement> | undefined
  cancelBtnRef: any;
  renderer: any;
  submitButtonRef: any;

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {

  
 
  }

  ngOnInit() {
    this.getUser()
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
  }


  get username() {
    return this.reactiveForm.get('username')!;
  }

  get birthday() {
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



  showDetail(user: any) {
    console.log(user);
    this.userDetail.nameDetail = user.username;
    this.userDetail.passwordDetail = user.phone;
    this.userDetail.password2Detail = user.phone;
    this.userDetail.dateDetail = user.birthday;
    this.userDetail.emailDetail = user.email;
    this.userDetail.idDetail = user.id

    this.populateFormWithUserData(user);
  }
  populateFormWithUserData(user: any) {
    this.user.username = user.username;
    this.user.birthday = user.birthday;
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.password2 = user.password;
  }

  createUser() {
    console.log(this.user)
    // Make HTTP request to login API
    this.dataService.addData(this.user).subscribe({
      next: (response) => {
        if (response != null) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Add User Success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {   
            this.getUser()
            this.closeModal("addEmployeeModal")
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
      }
    });
  }

  editUser() {
    // Make HTTP request to login API
    this.user.id = this.userDetail.idDetail;
    this.dataService.updateData(this.user).subscribe({
      next: (response) => {
        if (response != null) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Edit User Success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.href = '/admin/manage/user';
            this.getUser()
            this.closeModal("editEmployeeModal")
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Edit User failed',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      error: (error) => {
      }
    });

  }

  closeModal( id : string) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.getElementsByClassName('modal-backdrop');
      if (modalBackdrop && modalBackdrop.length > 0) {
        document.body.removeChild(modalBackdrop[0]);
      }
    }
  }
  

  deleteUser() {
    // Make HTTP request to login API
    console.log(this.userDetail.idDetail);
    this.currentUser = localStorage.getItem('currentUser');

    this.user = JSON.parse(this.currentUser)

    if (this.user.email == this.userDetail.emailDetail) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Account is logged in, cannot be deleted!',
        showCancelButton: true,
        showConfirmButton: false,
        // timer: 1500
      }).then(() => {
        window.location.href = '/admin/manage/user';
        this.getUser()
      })
    } else {
      this.dataService.deleteData(this.userDetail.idDetail).subscribe({
        next: (response) => {
          if (response != null) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Delete User Success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.getUser()
              this.closeModal("deleteEmployeeModal")
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Delete User failed',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/admin/manage/user']);
            })
          }
        },
        error: (error) => {
        }
      });
    }

  }
  getUser() {
    // Make HTTP request to login API
    this.dataService.getData().subscribe({
      next: (response) => {
        console.log('lấy user successful', response);
        this.users = response
      },
      error: (error) => {
        // Handle the error response here
        console.error('delete user error', error);
      }
    });

  }

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


  HanleAddUser() {
    this.userDetail.nameDetail = ""
    this.userDetail.passwordDetail = ""
    this.userDetail.password2Detail = ""
    this.userDetail.dateDetail = ""
    this.userDetail.emailDetail = ""
    this.user.email = ""
    this.user.username = ""
    this.user.password = ""
    this.user.password2 = ""
    this.user.birthday = ""
  }

}
