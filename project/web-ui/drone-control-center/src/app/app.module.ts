import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DroneSimulatorComponent} from './drone-simulator/view/drone-simulator.component';
import {ContainerComponent} from './container/container.component';
import {MaterialModule} from './material.module';
import {DroneDataComponent} from './drone-data/drone-data.component';
import {InventoryComponent} from './inventory/inventory.component';
import {LeafletComponent} from './leaflet/leaflet.component';
import {SharedService} from './shared.service';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';
import {HttpService} from './http.service';
import {DataService} from './data.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    DashboardComponent,
    DroneSimulatorComponent,
    DroneDataComponent,
    InventoryComponent,
    LeafletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  entryComponents: [DroneSimulatorComponent, DroneDataComponent],
  providers: [SharedService, DroneSimulatorService, HttpService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
