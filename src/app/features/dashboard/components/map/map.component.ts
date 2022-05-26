import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat!: number;
  lng!: number;
  Events: any[] = [];
  attendanceDetailData: any = [];
  myDetails: any = [];
  dt: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit() {}
  ngAfterViewInit() {
    this.dt = new Date().toISOString().split("T")[0];
  
      const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/attendanceByDate?dt=${new Date().toISOString().split("T")[0]}`;
      const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

      this.http.get(endpoint, headers)
      .subscribe((res: any): void => {
        this.attendanceDetailData = res?.result || [];
        this.updateLocation();
      });
  }

  updateLocation() {
    this.lat = +this.attendanceDetailData[0]?.startLocation;
    this.lng = +this.attendanceDetailData[0]?.endLocation;
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
