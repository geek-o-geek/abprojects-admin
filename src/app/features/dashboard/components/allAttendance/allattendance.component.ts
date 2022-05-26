import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-attendance',
  templateUrl: './allattendance.component.html',
  styleUrls: ['./allattendance.component.scss']
})
export class AllAttendanceComponent implements OnInit {
  profiledata: any = {};
  profileImage: string = '';
  data: any = {}
  databackup: any = {};
  dt: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/attendancenWorkerByDate?dt=${new Date().toISOString().split("T")[0]}`;
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
     this.data = res.result;
     this.databackup = res.result;
    })
  }

  public onDate(event: any): void {
    this.dt = event;
  }

  search(e: any) {
    if(e.target.value === '') {
      return this.data = { ...this.databackup }
    }
    const worker = this.databackup?.filter((obj: any, index: number) => obj.fullname?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 );
   
    this.data = { ...this.data, worker }
  }

  goto(route: string = '', item: any = {}) {
    if (route === '/dashboard/attendanceDetail') {
      if(!this.dt) {
        alert("Please select date")
      }
      const dt = new Date(this.dt)
      dt.setDate(dt.getDate() + 1)
      item['dt'] = dt.toISOString().split("T")[0];
    }
    this.router.navigateByUrl(route, { state: item })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
