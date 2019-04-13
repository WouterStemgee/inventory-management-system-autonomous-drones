import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
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

  deleteAllMaps() {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.baseAPIUrl + 'api/maps').subscribe(
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

  addMap(map) {
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
      this.http.put(environment.baseAPIUrl + 'api/maps/' + map._id, map).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  validateFlightpath(flightpath) {
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

  getDroneDbInformation(droneId = 0){
    return new Promise((resolve, reject) => {
      if (droneId) {
        this.http.get(environment.baseAPIUrl + 'api/drones/' + droneId).subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
      }
      else {
        // nog voor nu, omdat er geen rekening wordt gehouden met droneid's in de db, die per user zouden moeten opgeslagen worden
        // => alle drones opvragen en de eerste selecteren (er zit ook maar in config in de db normaal bij testing)
        this.http.get(environment.baseAPIUrl + 'api/drones/').subscribe(
          result => {
            resolve(result[0]);
          },
          (error: HttpErrorResponse) => {
            reject(error[0]);
          }
        );
      }
    });
  }

  storeDroneDbInformation(droneConfig){
    return new Promise((resolve, reject) => {
      this.http.put(environment.baseAPIUrl + 'api/drones/' + droneConfig._id, droneConfig).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  updateDroneConfiguration(configuration) {
    return new Promise((resolve, reject) => {
      console.log('Drone configuration update: ', configuration);
      this.http.put(environment.baseAPIUrl + 'red/drone/', configuration).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  updateSubscriptions(topics) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.put(environment.baseAPIUrl + 'red/data/', topics, httpOptions).subscribe(
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
