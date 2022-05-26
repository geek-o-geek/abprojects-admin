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

  constructor(private http: HttpClient, private location:Location, private router: Router) {}
 
  ngOnInit() {
    const { id = 0, dt }: any = this.location.getState() || {};

    this.dt = dt || new Date().toISOString().split("T")[0];
    console.log(dt, "dt")

    if(id) {
      const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/attendanceByUserDate?userId=${id}&dt=${this.dt}`;
      const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

      this.http.get(endpoint, headers)
      .subscribe((res: any): void => {
        this.attendanceDetailData = res?.result[0] || {}
      })
    } else
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

function take(arg0: number): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}
