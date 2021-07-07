import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  AuthService } from './../auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../auth.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  public authObs: any;
  public isLoading: boolean = false;
  public formRef:any;
  ngOnInit (): void {
    this.prepareForm();
  }

  public prepareForm(){
    this.formRef = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email] ),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  get email(){
    return this.formRef.get('email');
  }
  get password(){
    return this.formRef.get('password');
  }


  public onSubmit (): void {
    this.isLoading = true;
    const email = this.email.value;
    const password = this.password.value;
    this.authObs = this.authService.login(email, password);
    this.authObs.subscribe(
      (resData: any) => {
        this.isLoading = false;
        this.toastr.success('Sign in Success!');
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.error.message);
      }
    );
  }
}
