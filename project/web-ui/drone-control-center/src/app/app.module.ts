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
import {InventoryComponent} from './inventory/inventory.component';
import {ContainerComponent} from './container/container.component';
import {MaterialModule} from './material.module';
import {DroneDataComponent} from './drone-data/drone-data.component';
import {InventoryDataComponent} from './inventory-data/inventory-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    DashboardComponent,
    DroneSimulatorComponent,
    DroneDataComponent,
    InventoryComponent,
    InventoryDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  entryComponents: [DroneSimulatorComponent, DroneDataComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
