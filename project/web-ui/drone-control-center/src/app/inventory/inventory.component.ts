import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products;

  constructor(private sharedService: SharedService, private http: HttpService) {
    sharedService.onNavigateEvent.emit('inventory');
    this.getAllProducts();
  }


  ngOnInit() {
  }

  getAllProducts() {
    this.http.getAllProducts().then((res) => {
      this.products = res;
      console.log(res);
    });
  }

  deleteProduct(id) {
    this.http.deleteProduct(id).then((res) => {
      this.getAllProducts();
      console.log(res);
    });
  }

  onSubmit(form) {
    console.log('Form values:', form.value);
    this.http.putProduct(form.value).then((res) => {
      this.getAllProducts();
      console.log(res);
    });
    form.reset();
  }
}
