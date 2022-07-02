import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMasterComponent } from './components/addMaster/addMaster.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { WardComponent } from './components/ward/ward.component';
import { MapComponent } from './components/map/map.component';
import { AttendanceDetailComponent } from './components/attendanceDetail/attendanceDetail.component';
import { AllAttendanceComponent } from './components/allAttendance/allattendance.component';
import { RoadInspectionComponent } from './components/roadInspection/roadInspection.component';
import { ManageSupervisorComponent } from './components/manageSupervisor/manageSupervisor.component';
import { PaymentScheduleComponent } from './components/paymentSchedule/paymentSchedule.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{ path: 'addmaster', component: AddMasterComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'supervisor', component: SupervisorComponent },
{ path: 'attendance', component: AttendanceComponent },
{ path: 'ward', component: WardComponent },
{ path: 'map', component: MapComponent },
{ path: 'attendanceDetail', component: AttendanceDetailComponent },
{ path: 'allAttendance', component: AllAttendanceComponent },
{ path: 'roadInspection', component: RoadInspectionComponent },
{ path: 'manageSupervisor', component: ManageSupervisorComponent },
{ path: 'paymentSchedule', component: PaymentScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
