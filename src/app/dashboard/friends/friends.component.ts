import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {
  public unfollowInProgress: boolean =false;
  public friendsList: Array<any> = [];
  private subscribeEventRef!: Subscription;
  constructor(private dashboardService: DashboardService, private toastr:ToastrService) { }
  
  ngOnInit(): void {
    this.getFriendsList();
    this.subscribeEventRef = this.dashboardService.eventEmitter.subscribe(
      (event)=>{
        if(event.event == 'updateFriendsAndTimeline'){
          this.getFriendsList();
        }
      }
    );
  }

  public getFriendsList(){
    this.dashboardService.getFollowingUsers().subscribe(
      (res:any) =>{
        this.friendsList= res;
      },
      (err:any) =>{
        console.log(err);
      }
    );
  }

  public unfollow(followingId:string){
    this.unfollowInProgress =true;
    this.dashboardService.unFollowUser(followingId).subscribe(
      (res:any)=>{
        this.unfollowInProgress = false;
        this.getFriendsList();
        this.dashboardService.eventEmitter.emit({event:'updateWhoToFollowAndCounts'});
        this.toastr.success("unfollowed successfully!");
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscribeEventRef.unsubscribe();
  }

}
