import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.scss']
})
export class WhoToFollowComponent implements OnInit, OnDestroy {
  public whoToFollow: Array<any> = [];
  public followInProgress: boolean = false;
  public subscribeEventRef!: Subscription;
  constructor(private dashboardService: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWhichUsersToFollow();
    this.subscribeEventRef = this.dashboardService.eventEmitter.subscribe(
      (event) => {
        if (event.event == 'updateWhoToFollowAndCounts') {
          this.getWhichUsersToFollow();
        }
      }
    );
  }

  public getWhichUsersToFollow() {
    this.dashboardService.getNotFollowingUsers().subscribe(
      (res: any) => {
        res.map((el: any) => el.followInProgress = false);
        this.whoToFollow = res;
        this.dashboardService.eventEmitter.emit({ event: 'updateFriendsAndTimeline' });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public follow(followingId: string, index: number) {
    this.whoToFollow[index] = true;
    this.dashboardService.followUser(followingId).subscribe(
      (res: any) => {
        this.whoToFollow[index] = false;
        this.toastr.success("Followed Successfully!");
        this.getWhichUsersToFollow();
      },
      (err: any) => {
        this.whoToFollow[index] = false;
        console.log(err);
      }
    );
  }
  ngOnDestroy(): void {
    this.subscribeEventRef.unsubscribe();
  }
}
