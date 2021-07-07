import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./../auth.component.scss']
})
export class SignUpComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  public authObs: any;
  public isLoading: boolean = false;
  public formRef:any;
  ngOnInit (): void {
    this.prepareForm();
  }


  public prepareForm(){
    this.formRef = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],),
      email: new FormControl(null, [Validators.required, Validators.email] ),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), this.matchPassword(this)])
    });
  }

  get name(){
    return this.formRef.get('name');
  }
  get email(){
    return this.formRef.get('email');
  }
  get password(){
    return this.formRef.get('password');
  }
  get confirmPassword(){
    return this.formRef.get('confirmPassword');
  }

  public onSubmit (): void {
    this.isLoading = true;
    const email = this.email.value;
    const password = this.password.value;
    const name = this.name.value;
    const passwordConfirm = this.confirmPassword.value;
    this.authObs = this.authService.signUp(name, email, password, passwordConfirm);

    this.authObs.subscribe(
      (resData: any) => {
        this.isLoading = false;
        console.log(resData);
        this.toastr.success('Account created successfully');
        this.router.navigate(['/auth/signin']);
      },
      (errorMsg: any) => {
        console.log(errorMsg);
        this.isLoading = false;
        if(errorMsg.error.error.code ==11000)
        {
        this.toastr.error("Email Already exists!!");
        }
        else{
        this.toastr.error(errorMsg.error.message);
        }
      }
    );

    
  }

  public matchPassword (_this: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value != _this?.formRef?.get('password')?.value)) {
        console.log(_this?.formRef?.get('newPassword')); 
        return { 'matchPassword': true };
      }
      return null;
    };
  }

}
