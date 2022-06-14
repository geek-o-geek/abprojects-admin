import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  dt: string = '';
  latEnd!: number;
  lngEnd!: number;

  constructor(private http: HttpClient, private location: Location, private router: Router) {}
 
  ngOnInit() {
    const { workerId = 0, dt }: any = this.location.getState() || {};

    this.dt = dt || new Date().toISOString().split("T")[0];
  
    if(workerId) {
      const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/attendanceByUserDate?userId=${workerId}&dt=${this.dt}`;
      const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

      this.http.get(endpoint, headers)
      .subscribe((res: any): void => {
        this.attendanceDetailData = res?.result[0] || {};
        this.updateLocation();
      })
    } else {
      this.attendanceDetailData = JSON.parse(localStorage.getItem("resAttendanceDetail") || '{}');
    }
  }

  ngAfterViewInit(){
    this.updateLocation();
  }

  updateLocation() {
    this.lat = +this.attendanceDetailData?.startLocation;
    this.lng = +this.attendanceDetailData?.endLocation;

    const [lat, lng] = this.attendanceDetailData?.location.split(",");
    this.latEnd = +lat;
    this.lngEnd = +lng;
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
}
