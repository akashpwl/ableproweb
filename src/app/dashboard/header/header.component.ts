import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DashboardService } from './../services/dashboard.service'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public formRef: any;
  public modelRef!: NgbModalRef;
  public isLoading: boolean = false;
  public username: any;
  constructor(private modalService: NgbModal, private dashboardService: DashboardService, private toastr: ToastrService, private authService: AuthService) { }
  public isMenuCollapsed = true;
  ngOnInit (): void {
    this.username = this.authService.user?.name;
    this.dashboardService.eventEmitter.subscribe(event=>{
      if (event.event == 'updateNameAndOccupation'){
      this.username = this.dashboardService.currentUserName;
      }
    });
  }

  public open (content: any) {
    this.formRef = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl(null, [Validators.required, Validators.minLength(8), this.matchPassword(this)])
    });
    this.modelRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public onSubmit () {
    this.isLoading = true;
    const passwordObj = {
      passwordCurrent: this.currentPassword.value,
      password: this.newPassword.value,
      passwordConfirm: this.confirmNewPassword.value
    };
    this.dashboardService.updatePassword(passwordObj).subscribe(
      (resData: any) => {
        this.modelRef.close();
        console.log(resData);
        this.isLoading = false;
        this.authService.updateToken(resData);
        this.toastr.success('Password Changed successfully!');
      },
      (err: any) => {
        this.toastr.error(err.error.message);
        this.isLoading = false;
      }
    );
  }

  get currentPassword () {
    return this.formRef.get('currentPassword');
  }
  get newPassword () { return this.formRef.get('newPassword'); }
  get confirmNewPassword () { return this.formRef.get('confirmNewPassword'); }

  public logout () {
    this.authService.logout();
  }
  
  public matchPassword (_this: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value != _this?.formRef?.get('newPassword')?.value)) {
        console.log(_this?.formRef?.get('newPassword')); //#issue
        return { 'matchPassword': true };
      }
      return null;
    };
  }
}



