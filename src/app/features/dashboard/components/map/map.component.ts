import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  attendanceDetailDataBackup: any = [];
  myDetails: any = [];
  dt: string = '';
  form!: FormGroup;
  wards: any[] = []

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm();
  }
  
  ngOnInit() {
    this.form.valueChanges
    .subscribe((item: any) => {
      const { wardId, dt } = item;

      this.attendanceDetailData = this.attendanceDetailDataBackup.filter((item: any): any => {
        const attendDate = item?.attendanceDate.split("T")[0]
     
        if(dt === attendDate){ 
          return item;
        }
      })

      console.log(this.attendanceDetailData, "this.attendanceDetailData")
    })

    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/get/wards";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any) => {
      this.wards = res?.data || []
    })
  }

  ngAfterViewInit() {
    this.dt = new Date().toISOString().split("T")[0];
  
      const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/attendanceByDate?dt=${new Date().toISOString().split("T")[0]}`;
      const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

      this.http.get(endpoint, headers)
      .subscribe((res: any): void => {
        this.attendanceDetailData = res?.result || [];
        this.attendanceDetailDataBackup = res?.result || [];
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

  createForm() {
    this.form = this.fb.group({
      wardId: [''],
      wardFilter: [''],
      dt: ['']
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
