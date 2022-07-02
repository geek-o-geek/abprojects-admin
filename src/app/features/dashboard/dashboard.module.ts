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
import { AgmDirectionModule } from 'agm-direction';
import { AttendanceDetailComponent } from './components/attendanceDetail/attendanceDetail.component';
import { AllAttendanceComponent } from './components/allAttendance/allattendance.component';
import { RoadInspectionComponent } from './components/roadInspection/roadInspection.component';
import { ManageSupervisorComponent } from './components/manageSupervisor/manageSupervisor.component'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PaymentScheduleComponent } from './components/paymentSchedule/paymentSchedule.component';

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
    AttendanceDetailComponent,
    AllAttendanceComponent,
    RoadInspectionComponent,
    ManageSupervisorComponent,
    PaymentScheduleComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATXgsxkCRPyJHS5KdkIRGVJiKy7aiTRfA'
    }),
    AgmDirectionModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ]
})
export class DashboardModule { }
