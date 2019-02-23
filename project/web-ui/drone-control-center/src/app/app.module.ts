import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DroneSimulatorComponent} from './drone-simulator/view/drone-simulator.component';
import {FlightPlannerComponent} from './flight-planner/flight-planner.component';
import {MapEditorComponent} from './map-editor/map-editor.component';
import {InventoryComponent} from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DroneSimulatorComponent,
    FlightPlannerComponent,
    MapEditorComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
