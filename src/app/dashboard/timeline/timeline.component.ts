import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  constructor(private modalService: NgbModal, private toastr: ToastrService, private dashboardService: DashboardService) { }
  public isMenuCollapsed = true;
  public formRef: any;
  public isLoading: boolean = false;
  public likeInProgress: boolean = false;
  public modelRef: any;
  public postArray: any = this.dashboardService.postArray;
  private subscribeEventRef!: Subscription;
  public likeSound = new Audio('./../../../assets/likeSound.mp3');
  ngOnInit (): void {
    this.getAllPost();
    this.subscribeEventRef = this.dashboardService.eventEmitter.subscribe(
      (event)=>{
        if(event.event == 'updateFriendsAndTimeline'){
          this.getAllPost();
        }
      }
    );
  }

  public open (content: any) {
    this.formRef = new FormGroup({
      imgURL: new FormControl(null, [Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)]),
      caption: new FormControl(null, [Validators.required])
    });
    this.modelRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  get imgURL () {
    return this.formRef.get('imgURL');
  }
  get caption () {
    return this.formRef.get('caption');
  }
  onSubmit () {
    this.isLoading = true;
    this.dashboardService.addNewPost(this.imgURL.value, this.caption.value).subscribe(
      (resData: any) => {
        this.modelRef.close();
        console.log(this.postArray);
        this.isLoading = false;
        this.toastr.success('Post Added Successfully !!');
      },
      (err: any) => {
        this.toastr.error(err.error.message);
        this.isLoading = false;
      }
    );
  }

  public getAllPost () {
    this.dashboardService.getAllPost().subscribe(
      (resData: any) => {
        this.postArray = resData;
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  public likeActivity (postId: string, isLiked: boolean, index: number) {
    this.likeInProgress = true;

    if (isLiked) {
      this.dashboardService.unlikePost(postId, index).subscribe(
        (resData: any) => {
          this.likeSound.play();
          this.postArray = resData;
          this.likeInProgress = false;
        },
        (err: any) => {
          this.likeInProgress = false;
          this.toastr.error(err.error.message);
        }
      )
    }
    else {
      this.dashboardService.likePost(postId, index).subscribe(
        (resData: any) => {
          this.likeSound.play();
          this.postArray = resData;
          this.likeInProgress = false;
        },
        (err: any) => {
          this.likeInProgress = false;
          this.toastr.error(err.error.message);
        }
      )
    }
  }

  public deletePost (postId: string, isDeletable: boolean, i: number) {
    if (!isDeletable) {
      this.toastr.error('You are not allowed to delete other users post.');
    }

  }

  ngOnDestroy(): void {
    this.subscribeEventRef.unsubscribe();
  }
}
