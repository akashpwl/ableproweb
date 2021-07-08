import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private toastr:ToastrService) { }
  public userData: any;
  public formRef:any;
  public toggleFlag: Array<boolean> = [false, false, false];
  public submitInProgress: Array<boolean> = [false, false, false];

  public model:any;
  public maxDate: any;
  ngOnInit(): void {
    this.getUserDetails();
    this.maxDate = this.setMaximumDate();
  }

  public getUserDetails(){
    this.dashboardService.getUserDetails().subscribe(
    (res:any) =>{
      this.userData = res;
      this.userData.dob = this.userData.dob? new Date(res.dob).toDateString(): '';
      this.preapareForm();
    },
    (err:any) =>{
      
    }
    );
  }

  public preapareForm(){
    
    this.formRef = new FormGroup({
      name: new FormControl(this.userData?.name ,[Validators.required]),
      gender: new FormControl(this.userData?.gender),
      dob: new FormControl(this.formatDate(this.userData?.dob)),
      maritalStatus: new FormControl(this.userData?.maritalStatus|| ''),
      location: new FormControl(this.userData?.location),
      mobile: new FormControl(this.userData?.mobile, [Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl(this.userData?.email, [Validators.required]),
      twitter: new FormControl(this.userData?.twitter),
      skype: new FormControl(this.userData?.skype),
      occupation: new FormControl(this.userData?.occupation),
      skills: new FormControl(this.userData?.skills),
      jobs: new FormControl(this.userData?.jobs),
    });
  }

  public onSubmit(index:number){
    this.submitInProgress[index] = true;
    const dataObj = this.getFormData();
    this.dashboardService.updateUserDetails(dataObj).subscribe(
      (res:any)=>{
        this.userData = dataObj;
        this.userData.dob = this.toDateString(dataObj.dob);
        this.submitInProgress[index] = false;
        this.toggleFlag[index] = ! this.toggleFlag[index];
        this.dashboardService.eventEmitter.emit({event: 'updateNameAndOccupation' });
        this.preapareForm();

      },
      (err:any)=>{
        console.log(err);
        this.submitInProgress[index] = false;
      }
    );
  }

  public getFormData(){
    return {
      name: this.getValue('name'),
      gender: this.getValue('gender'),
      dob: this.getValue('dob').year+'-'+this.getValue('dob').month+'-'+this.getValue('dob').day,
      maritalStatus: this.getValue('maritalStatus'),
      location: this.getValue('location'),
      mobile: this.getValue('mobile'),
      email: this.getValue('email'),
      twitter: this.getValue('twitter'),
      skype: this.getValue('skype'),
      occupation: this.getValue('occupation'),
      skills: this.getValue('skills'),
      jobs: this.getValue('jobs')
    }
  }

  public getValue(field:string){
    return this.formRef.get(field).value;
  }
  private formatDate(date:string){
    if(!date){
      return '';
    }
    const d = new Date(date);

    return { year: d.getFullYear(), month:d.getMonth()+1, day: d.getDate() };
  }

  private toDateString(dateObj:any){
    console.log(dateObj);
    const date = new Date(dateObj);

    return date.toDateString();
  }
  
  private setMaximumDate(){
    const date = new Date();
    const year = new Date().getFullYear() - 8;
    return {
      year: year,
      month: date.getMonth()+1,   // ngb month starts from 1
      day: date.getDate()
    }
  }
}
