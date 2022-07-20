import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-road-inspection',
  templateUrl: './roadInspection.component.html',
  styleUrls: ['./roadInspection.component.scss']
})
export class RoadInspectionComponent implements OnInit {
  data: any = []
  databackup: any = []
  tableContent: any = []
  openModal: boolean = false;
  openImageModal: boolean = false;
  modalBodyData: any = []
  exportData: any = []
  imageSrc: string = '';
  constructor(private http: HttpClient, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.modalBodyData = [
      { 'columnName': 'Supervisor Name', field: 'supervisorName', 'selected': true },
      { 'columnName': 'Worker Name', field: 'workerName', 'selected': true },
      { 'columnName': 'Worker ID', field: 'said', 'selected': true },
      { 'columnName': 'Inspection Time', field: 'inspectionTime', 'selected': true },
      { 'columnName': 'Litter', field: 'litter', 'selected': true },
      { 'columnName': 'Road', field: 'road', 'selected': true },
      { 'columnName': 'Safety', field: 'safety', 'selected': true },
      { 'columnName': 'Verge', field: 'verge', 'selected': true },
      { 'columnName': 'Drain', field: 'drain', 'selected': true },
      { 'columnName': 'Erosion', field: 'erosion', 'selected': true },
      { 'columnName': 'Comment', field: 'comment', 'selected': true },
      { 'columnName': 'Created At', field: 'created_at', 'selected': true }
    ]
    
    const { id = 0 }: any = this.location.getState() || {};

    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/roadInspection";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
     let data = res.data || [];

     if(id) {
       const dataFiltered: any = data?.supervisor?.filter((item: any) => item?.wardId===id);
       this.tableContent = dataFiltered; 
       this.databackup = dataFiltered;
      } else {
      this.tableContent = [...data]
      this.databackup = [...data]
     }
    })
  }

  search(e: any) {
    if(e.target.value === '') {
      return this.tableContent = { ...this.databackup }
    }
    const roadInspection = this.databackup?.filter((obj: any, index: number) => obj.workerName?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 );
   
    this.tableContent = [...roadInspection ]
  }

  goto(route: string = '', item: any = {}) {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  toggleImageModal() {
    this.openImageModal = !this.openImageModal;
  }
  

}
