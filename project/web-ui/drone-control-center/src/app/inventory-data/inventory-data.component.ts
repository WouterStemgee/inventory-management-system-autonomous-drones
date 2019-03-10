import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { InventoryDataDataSource } from './inventory-data-datasource';
import {HttpService} from '../http.service';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-inventory-data',
  templateUrl: './inventory-data.component.html',
  styleUrls: ['./inventory-data.component.css']
})
export class InventoryDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: InventoryDataDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  products;

  constructor(private http: HttpService, public simulator: DroneSimulatorService) {

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
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  ngOnInit() {
    if (this.simulator.loaded) {
      this.loadProducts();
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.loadProducts();
        }
      });
    }
    this.dataSource = new InventoryDataDataSource(this.paginator, this.sort);
  }
}
