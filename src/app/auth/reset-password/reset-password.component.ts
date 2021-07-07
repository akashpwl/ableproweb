import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./../auth.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  public otpformRef: any;
  public isLoading: boolean = false;
  ngOnInit (): any {
    this.otpformRef = new FormGroup({
      otp: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl(null, [Validators.required, Validators.minLength(8), this.matchPassword(this)]),
    });
    if (!this.authService.isOtpSent) {
      return this.router.navigate(['/auth/signin']);
    }
  }

  get otp () {
    return this.otpformRef.get('otp');
  }
  get newPassword () {
    return this.otpformRef.get('newPassword');
  }
  get confirmNewPassword () {
    return this.otpformRef.get('confirmNewPassword');
  }
  onSubmitOTP () {
    const passwordObj = {
      email: this.authService.emailForResetPassword,
      otp: this.otp.value,
      password: this.newPassword.value,
      passwordConfirm: this.confirmNewPassword.value
    };
    this.authService.resetPassword(passwordObj).subscribe(
      (resData: any) => {
        this.authService.isOtpSent = false;
        this.authService.emailForResetPassword = '';
        this.isLoading = false;
        this.router.navigate(['/auth/signin']);
        this.toastr.success('Password reset success.');
        console.log(resData);
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
        this.toastr.error(error.error.message);

      }
    );

  }
  public matchPassword (_this: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value != _this?.otpformRef?.get('newPassword')?.value)) {
        console.log(_this?.otpformRef?.get('newPassword')); //
        return { 'matchPassword': true };
      }
      return null;
    };
  }
}
