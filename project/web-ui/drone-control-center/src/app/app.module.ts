import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {ChartsModule} from 'ng2-charts';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DroneSimulatorComponent} from './drone-simulator/view/drone-simulator.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MaterialModule} from './material.module';
import {DroneDataComponent} from './drone-data/drone-data.component';
import {InventoryComponent} from './inventory/inventory.component';
import {LeafletComponent} from './leaflet/leaflet.component';
import {SharedService} from './shared.service';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';
import {DroneConfigurationComponent} from './drone-configuration/drone-configuration.component';
import {AdminComponent} from './admin/admin.component';
import {MapCreateComponent} from './map-create/map-create.component';
import {GraphDataComponent} from './graph-data/graph-data.component';
import {SensorConfigurationComponent} from './sensor-configuration/sensor-configuration.component';

import {HttpService} from './http.service';
import {DataService} from './data.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {AuthGuardService} from './auth-guard.service';
import {AuthenticationService} from './authentication.service';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { GraphTestComponent } from './graph-test/graph-test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    DroneSimulatorComponent,
    DroneDataComponent,
    DroneConfigurationComponent,
    InventoryComponent,
    LeafletComponent,
    AdminComponent,
    MapCreateComponent,
    GraphDataComponent,
    SensorConfigurationComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    GraphTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    }),
    ChartsModule,
    NgxChartsModule
  ],
  entryComponents: [DroneSimulatorComponent, DroneDataComponent],
  providers: [SharedService, DroneSimulatorService, HttpService, DataService, AuthenticationService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
