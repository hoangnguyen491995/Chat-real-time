import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/directive/EmailValidator.directive';
import { SharedDataService } from 'src/app/service/subject-test/SharedData.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  user = {
    username: '',
    password: '',
    email:""
  };
  signInForm!: FormGroup 
 

  constructor(private shareData: SharedDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.shareData.setCurrentStep(1)

    this.signInForm = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(5),
      ]), 
      rememberMe: new FormControl(false), 
    });
  }

 
  get email() {
    return this.signInForm.get('email')!;
  }

  get password() {
    return this.signInForm.get('password')!;
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      // Mark all controls as touched to display error messages.
      this.signInForm.markAllAsTouched();
      return;
    }
    console.log(this.signInForm.value);
  }

}
