import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMasterComponent } from './components/addMaster/addMaster.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddMasterComponent,
    ProfileComponent,
    SupervisorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
