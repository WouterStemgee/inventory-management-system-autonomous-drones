import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  getMap(mapId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/maps/' + mapId).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  saveMap(map) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/maps/', map).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  updateMap(map) {
    return new Promise((resolve, reject) => {
      console.log(map);
      this.http.put(environment.baseAPIUrl + 'api/maps/' + map.id, map).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  fetchOptimalFlightpath(flightpath) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/flightpath/', flightpath).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  getAllProducts(mapId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/maps/' + mapId + '/products/').subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  deleteProduct(mapId, productId) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.baseAPIUrl + 'api/maps/' + mapId + '/products/' + productId).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  addProduct(mapId, product) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/maps/' + mapId + '/products/', product).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }
}
