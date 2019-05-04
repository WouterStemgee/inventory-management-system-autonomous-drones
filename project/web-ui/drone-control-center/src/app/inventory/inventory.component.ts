import {Component, OnInit} from '@angular/core';
import {InventoryDatasource} from './inventory-datasource';
import {HttpService} from '../http.service';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {SharedService} from '../shared.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-inventory-data',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  dataSource: InventoryDatasource;

  displayedColumns = ['id', 'name', 'quantity', 'delete'];

  products;

  constructor(public auth: AuthenticationService, private sharedService: SharedService, private http: HttpService, public simulator: DroneSimulatorService) {
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
    console.log('loading new products');
    return new Promise((resolve, reject) => {
      const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
      this.http.getAllProducts(mapId)
        .then((res) => {
          this.products = res;
          this.initDataSource();
          console.log(res);
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
    if (mapData.name === '' || mapData.quantity === '' || mapData.position.x === '' || mapData.position.y === '') {
      this.simulator.onAlertEvent.emit({
        title: 'Inventory',
        message: 'Please fill in all the fields before submitting.',
        type: 'error'
      });
    } else {
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
  }

  initDataSource() {
    this.dataSource = new InventoryDatasource(this.products);
  }

  ngOnInit() {
    this.initDataSource();
    if (this.simulator.loaded) {
      this.loadProducts().then(() => {
        this.http.getAllMaps()
          .then(result => {
            this.simulator.maps = result;
            this.simulator.reset(false);
            this.initDataSource();
          });
      });
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.loadProducts().then(() => {
            this.http.getAllMaps()
              .then(result => {
                this.simulator.maps = result;
                this.simulator.reset(false);
                this.initDataSource();
              });
          });
        }
      });
    }
  }
}
