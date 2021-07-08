import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./../auth.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public isLoading: boolean;
  public emailformRef: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit (): void {
    this.emailformRef = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  get email () {
    return this.emailformRef.get('email');
  }

  onSubmitEmail () {
    this.isLoading = true;
    this.authService.sendOTP(this.email.value).subscribe(
      (resData: any) => {
        this.authService.isOtpSent = true;
        this.authService.emailForResetPassword = this.email.value;
        this.isLoading = false;
        this.router.navigate(['/auth/reset-pasword']);
        this.toastr.success('OTP sent to your email.');
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }
}
