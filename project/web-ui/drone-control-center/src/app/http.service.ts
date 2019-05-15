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
    console.log(flightpath);
    return new Promise((resolve, reject) => {
      console.log(environment.baseAPIUrl + 'red/path/validate');
      this.http.post(environment.baseAPIUrl + 'red/path/validate', flightpath).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  sendFlightpathToDrone(flightpath) {
    console.log(flightpath);
    return new Promise( (resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'red/path/set', flightpath).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  getDroneStatus() {
    return new Promise( (resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'red/statusinfo').subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  updateHomebase(xCoord, yCoord) {
    return new Promise( (resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'red/drone/homebase', {x: xCoord, y: yCoord}).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }


  sendCommand(command) {
    return new Promise( (resolve, reject) => {
      const commands = ['start', 'pause', 'stop'];
      if (commands.indexOf(command) >= 0 ) {
        this.http.post(environment.baseAPIUrl + 'red/drone/' + command, {}).subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          });
      } else {
        reject('No predefined command given');
      }
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

  deleteProduct(mapId, scanzoneId, productId) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.baseAPIUrl + 'api/maps/' + mapId + '/scanzones/' + scanzoneId + '/products/' + productId).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  addProduct(mapId, scanzoneId, product) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/maps/' + mapId + '/scanzones/' + scanzoneId + '/products/', product).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  getAllDrones() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/drones/').subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  updateDrone(drone) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.baseAPIUrl + 'api/drones/' + drone._id, drone).subscribe(
        res => {
          this.http.put(environment.baseAPIUrl + 'red/drone/', drone.properties.radius.toString()).subscribe(
            () => {
              resolve(res);
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  addDrone(drone) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/drones', drone).subscribe(
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
          'Content-Type': 'application/json'
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

  checkCollision(pos, obstakels) {
    // api call voor afstand drone tot dichtste obstakel te vinden
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIUrl + 'api/drones/collision', {dronePos: pos, lijnen: obstakels}).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  deleteAllDrones() {
      return new Promise((resolve, reject) => {
        this.http.delete(environment.baseAPIUrl + 'api/drones').subscribe(
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
