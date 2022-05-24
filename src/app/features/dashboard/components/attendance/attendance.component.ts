import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {
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
  profiledata!: any;

  constructor( private http: HttpClient, private router: Router, private httpClient: HttpClient) {}
  onDateClick(res: any) {
    console.log('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    this.profiledata = JSON.parse(localStorage.getItem('profileabworker') || '{}');
    this.attendanceListByWorker(this.profiledata?.id)
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
    }, 2500);
  }

  attendanceListByWorker(workerId: any = '') {
    if(!workerId) return;
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/attendanceByUser?userId=${workerId}`;
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
      setTimeout(() => {
        res.result.forEach((obj: any) => {
          this.Events.push({ start: obj.attendanceDate ? obj.attendanceDate.split("T")[0]: '', title: obj.title })
        });
        console.log(this.Events, "his.Events")
      }, 2200);
    })
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
}