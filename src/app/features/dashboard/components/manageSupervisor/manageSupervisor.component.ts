import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-supervisor',
  templateUrl: './manageSupervisor.component.html',
  styleUrls: ['./manageSupervisor.component.scss']
})
export class ManageSupervisorComponent implements OnInit {
  profiledata: any = {};
  profileImage: string = '';
  data: any = {}
  databackup: any = {}
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/master/get";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
     this.data = res.data
     this.databackup = res.data
    })
  }

  search(e: any) {
    if(e.target.value === '') {
      return this.data = { ...this.databackup }
    }
    const wards = this.databackup?.wards.filter((obj: any, index: number) => obj.ward?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 || obj.region?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 );
   
    this.data = { ...this.data, wards }
  }

  goto(route: string = '', item: any = {}) {
    this.router.navigateByUrl(route, { state: item });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
