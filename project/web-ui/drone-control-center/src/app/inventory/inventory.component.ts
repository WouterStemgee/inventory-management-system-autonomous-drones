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

  constructor(private sharedService: SharedService, private http: HttpService, private simulator: DroneSimulatorService) {
    sharedService.onNavigateEvent.emit('inventory');
  }


  ngOnInit() {
    if (this.simulator.loaded) {
      this.getAllProducts();
    }
  }

  getAllProducts() {
    const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
    this.http.getAllProducts(mapId)
      .then((res) => {
        this.products = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteProduct(productId) {
    const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
    this.http.deleteProduct(mapId, productId)
      .then((res) => {
        this.getAllProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(form) {
    const mapId = this.simulator.maps[this.simulator.selectedMap]._id;
    this.http.putProduct(mapId, form.value)
      .then((res) => {
        this.getAllProducts();
      })
      .catch((err) => {
        console.log(err);
      });
    //form.reset();
  }
}
