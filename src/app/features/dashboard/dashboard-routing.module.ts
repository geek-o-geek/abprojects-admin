import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMasterComponent } from './components/addMaster/addMaster.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AttendanceComponent } from './components/attendance/attendance.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{ path: 'addmaster', component: AddMasterComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'supervisor', component: SupervisorComponent },
{ path: 'attendance', component: AttendanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
