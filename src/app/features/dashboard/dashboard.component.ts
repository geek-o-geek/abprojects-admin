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
  openModal: boolean = false;
  openDateModal: boolean = false;
  modalBodyData: any = []
  exportData: any = []
  loader: boolean | null = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loader = true;
    this.modalBodyData = [
      { 'columnName': 'SA ID', field: 'said', 'selected': true },
      { 'columnName': 'Initials', field: 'initials', 'selected': true },
      { 'columnName': 'Surname', field: 'lastname', 'selected': true },
      { 'columnName': 'Ward', field: 'ward', 'selected': true },
      { 'columnName': 'Job Title', field: 'jobTitle', 'selected': true },
      { 'columnName': 'Supervisors', field: 'supervisor', 'selected': true },
      { 'columnName': 'No. of Days worked', field: 'payableDays', 'selected': true },
      { 'columnName': 'Amount to be paid', field: 'amountPaid', 'selected': true }
    ]
    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com//master/get?type=all";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
      this.loader = false;
      this.data = res.data
      this.databackup = res.data
    }, err => this.loader = false)
  }

  dateFilter(data: any) {
    if(!data) return;
   
    this.data = {
      worker: data
    }
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  toggleDateModal() {
    this.openDateModal = !this.openDateModal;
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
    
    const worker = this.databackup?.worker.filter((obj: any, index: number) => obj.fullname?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 || obj.said.indexOf(e.target.value) >= 0 );
   
    this.data = { ...this.data, worker }
  }

}
