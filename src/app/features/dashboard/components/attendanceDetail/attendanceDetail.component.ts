import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendanceDetail.component.html',
  styleUrls: ['./attendanceDetail.component.scss'],
})
export class AttendanceDetailComponent {
  lat!: number;
  lng!: number;
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };
  attendanceDetailData!: any;

  constructor( private http: HttpClient, private router: Router, private httpClient: HttpClient) {}
  
  myDetails: any = [];
  mylat: string = "51.076101702905575"; // default lat
  mylong: string = "10.867780927493548"; // default long
  zoom = 12;
  initialCoordinates = {
    lat: '',
    lng: '',
  };
  mapConfigurations = {
    disableDefaultūI: true,
    fullscreenControl: true,
    zoomControl: true,
    mapTypeId: "roadmap",
    scrollwheel: false,
    disableDoubleClickZoom: true,
  };
  ngOnInit() {
    this.attendanceDetailData = JSON.parse(localStorage.getItem("resAttendanceDetail") || '{}');
  }


  ngAfterViewInit(){
    this.lat = parseInt(this.attendanceDetailData?.startLocation);
    this.lng = parseInt(this.attendanceDetailData?.endLocation);
    console.log(this.attendanceDetailData, "this.attendanceDetailData")
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
}