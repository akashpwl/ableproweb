import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {
  public followingsCount!: number;
  public followersCount!: number;
  public name!: string;
  public occupation!: string;

  private subscribeEventRef!: Subscription;
  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.getfollowersCount();
    this.getfollowingsCount();
    this.getNameAndOccupation()

    this.subscribeEventRef = this.dashboardService.eventEmitter.subscribe(
      (event) => {
        if (event.event != 'updateNameAndOccupation') {
          this.getfollowersCount();
          this.getfollowingsCount();
        }
        if (event.event == 'updateNameAndOccupation') {
          this.getNameAndOccupation()
        }
      }
    );
  }

  public getNameAndOccupation() {
    this.dashboardService.getUserDetails().subscribe(
      (res: any) => {
        this.name = res.name;
        this.occupation = res.occupation;
      },
      (err: any) => {
      });
  }

  public getfollowingsCount() {
    this.dashboardService.getFollowingsCount().subscribe(
      (resData: number) => {
        this.followingsCount = resData;
      },
      (err: any) => {
      }
    )
  }

  public getfollowersCount() {
    this.dashboardService.getFollowersCount().subscribe(
      (resData: number) => {
        this.followersCount = resData;
      },
      (err: any) => {
      }
    )
  }

  public emitAboutTab() {
    this.dashboardService.eventEmitter.emit({ event: 'showAboutTab' });
  }

}
