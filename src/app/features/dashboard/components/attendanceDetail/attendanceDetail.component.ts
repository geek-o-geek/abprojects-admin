import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendanceDetail.component.html',
  styleUrls: ['./attendanceDetail.component.scss'],
})
export class AttendanceDetailComponent {
  lat!: number;
  lng!: number;
  Events: any[] = [];
  attendanceDetailData!: any;
  myDetails: any = [];

  constructor(private router: Router) {}
 
  ngOnInit() {
    this.attendanceDetailData = JSON.parse(localStorage.getItem("resAttendanceDetail") || '{}');
  }

  ngAfterViewInit(){
    this.lat = +this.attendanceDetailData?.startLocation;
    this.lng = +this.attendanceDetailData?.endLocation;
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
}