import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any = {}
  databackup: any = {}
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/master/get?type=all";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
     this.data = res.data
     this.databackup = res.data
    })
  }

  goto(route: string = '', item: any = {}) {
    if(route === "/dashboard/profile") {
      localStorage.setItem('profileabworker', JSON.stringify(item));
    }
    this.router.navigateByUrl(route);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  search(e: any) {
    if(e.target.value === '') {
      return this.data = { ...this.databackup }
    }
    console.log(this.databackup)
    const worker = this.databackup?.worker.filter((obj: any, index: number) => obj.fullname?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 || obj.said.indexOf(e.target.value) >= 0 );
   
    this.data = { ...this.data, worker }
  }

}
