import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  openModal: boolean = false;
  modalBodyData: any = []
  exportData: any = []
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.modalBodyData = [
      { 'columnName': 'Beneficiary Name', field: 'fullname', 'selected': true },
      { 'columnName': 'SA ID', field: 'said', 'selected': true },
      { 'columnName': 'Created At', field: 'created_at', 'selected': true },
      { 'columnName': 'Comment', field: 'comment', 'selected': true },
      { 'columnName': 'Attendance Date', field: 'attendanceDate', 'selected': true },
      { 'columnName': 'Work Hours', field: 'workHours', 'selected': true },
      { 'columnName': 'Title', field: 'title', 'selected': true },
    ]
    this.hitApi()
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  hitApi() {
    const endpoint = `${environment.baseUrl}/attendancenWorkerByDate?dt=${this.dt || new Date().toISOString().split("T")[0]}`;
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((res: any): void => {
     this.data = res.result;
     this.databackup = res.result;
    })
  }

  public onDate(e: any): void {
    const dt = new Date(e.value)
    dt.setDate(dt.getDate() + 1)
    this.dt = dt.toISOString().split("T")[0];
    this.hitApi()
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
      dt.setDate(dt.getDate())
      item['dt'] = dt.toISOString().split("T")[0];
    }
    this.router.navigateByUrl(route, { state: item })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
