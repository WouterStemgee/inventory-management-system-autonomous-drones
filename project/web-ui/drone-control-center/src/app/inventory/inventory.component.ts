import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {HttpService} from '../http.service';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products;

  constructor(private sharedService: SharedService, private http: HttpService, public simulator: DroneSimulatorService) {
    sharedService.onNavigateEvent.emit('inventory');
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
