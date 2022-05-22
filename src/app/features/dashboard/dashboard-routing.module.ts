import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMasterComponent } from './components/addMaster/addMaster.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { WardComponent } from './components/ward/ward.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{ path: 'addmaster', component: AddMasterComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'supervisor', component: SupervisorComponent },
{ path: 'ward', component: WardComponent },
{ path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
