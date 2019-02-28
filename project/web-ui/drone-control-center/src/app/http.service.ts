import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAllMaps() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/maps').subscribe(
        res => {
          resolve(res);
        });
    });
  }

  getMap(id) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/maps/' + id).subscribe(
        res => {
          resolve(res);
        });
    });
  }

  fetchOptimalFlightpath(flightpath) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/flightpath/', flightpath).subscribe(
        res => {
          resolve(res);
        });
    });
  }

  getAllProducts() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/products/').subscribe(
        res => {
          resolve(res);
        });
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.baseAPIUrl + 'api/products/' + id).subscribe(
        res => {
          resolve(res);
        });
    });
  }

  putProduct(product) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/products/', product).subscribe(
        res => {
          resolve(res);
        });
    });
  }
}
