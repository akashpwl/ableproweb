import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { NgbAlertModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './tabs/tabs.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PhotosComponent } from './photos/photos.component';
import { DashboardService } from './services/dashboard.service';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';




@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ProfilePicComponent,
    WhoToFollowComponent,
    TabsComponent,
    TimelineComponent,
    PhotosComponent,
    FriendsComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgbNavModule,
    NgbAlertModule,
    NgbTooltipModule,
    SharedModule
  ],
  providers: []
})
export class DashboardModule {

}