import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {InventoryDataDataSource} from './inventory-data-datasource';
import {HttpService} from '../http.service';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-inventory-data',
  templateUrl: './inventory-data.component.html',
  styleUrls: ['./inventory-data.component.css']
})
export class InventoryDataComponent implements OnInit {
  dataSource: InventoryDataDataSource;

  displayedColumns = ['id', 'name', 'quantity', 'x', 'y', 'delete'];

  products;

  constructor(private sharedService: SharedService, private http: HttpService, public simulator: DroneSimulatorService) {
    sharedService.onNavigateEvent.emit('inventory');
  }

  deleteProduct(productId) {
    const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
    this.http.deleteProduct(mapId, productId)
      .then((res) => {
        this.loadProducts()
          .then(() => {
            this.http.getAllMaps()
              .then(result => {
                this.simulator.maps = result;
                this.simulator.reset(false);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadProducts() {
    return new Promise((resolve, reject) => {
      const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
      this.http.getAllProducts(mapId)
        .then((res) => {
          this.products = res;
          this.initDataSource();
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  onSubmit(form) {
    const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
    const mapData = form.value;
    mapData.position = {x: form.value.x, y: form.value.y};
    this.http.addProduct(mapId, mapData)
      .then((res) => {
        this.loadProducts()
          .then(() => {
            this.http.getAllMaps()
              .then(result => {
                this.simulator.maps = result;
                this.simulator.reset(false);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initDataSource() {
    this.dataSource = new InventoryDataDataSource(this.products);
  }

  ngOnInit() {
    this.initDataSource();
    if (this.simulator.loaded) {
      this.loadProducts().then(() => {
        // this.initDataSource();
      });
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.loadProducts().then(() => {
            // this.initDataSource();
          });
        }
      });
    }
  }
}
