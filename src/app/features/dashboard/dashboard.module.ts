import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMasterComponent } from './components/addMaster/addMaster.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MapComponent } from './components/map/map.component';
import { WardComponent } from './components/ward/ward.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AgmCoreModule } from '@agm/core';
import { AttendanceDetailComponent } from './components/attendanceDetail/attendanceDetail.component';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [
    DashboardComponent,
    AddMasterComponent,
    ProfileComponent,
    SupervisorComponent,
    AttendanceComponent,
    MapComponent,
    WardComponent,
    AttendanceDetailComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATXgsxkCRPyJHS5KdkIRGVJiKy7aiTRfA'
    })
  ]
})
export class DashboardModule { }
