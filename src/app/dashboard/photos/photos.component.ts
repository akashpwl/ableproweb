import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  public photosArray: Array<any>;
  ngOnInit(): void {
    this.photosArray = this.dashboardService.getPhotosArray();
  }

}
