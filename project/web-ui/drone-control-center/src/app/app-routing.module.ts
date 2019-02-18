import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DroneSimulatorComponent} from './drone-simulator/drone-simulator.component';
import {FlightPlannerComponent} from './flight-planner/flight-planner.component';
import {InventoryComponent} from './inventory/inventory.component';
import {MapEditorComponent} from './map-editor/map-editor.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'drone-simulator', component: DroneSimulatorComponent},
  {path: 'flight-planner', component: FlightPlannerComponent},
  {path: 'map-editor', component: MapEditorComponent},
  {path: 'inventory', component: InventoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
