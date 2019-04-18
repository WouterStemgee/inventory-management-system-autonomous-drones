import {EventEmitter, Injectable, Output} from '@angular/core';
import {Map} from '../model/map';
import {Drone} from '../model/drone';
import {HttpService} from '../../http.service';
import {DataService} from '../../data.service';
import {ImageLoader} from '../utils/imageloader';
import {SharedService} from '../../shared.service';

@Injectable({
  providedIn: 'root'
})
export class DroneSimulatorService {
  selectedMap = 0;
  selectedDrone = 0;

  map;
  drone;

  loaded;
  initialized;

  maps;
  drones;

  @Output() onAlertEvent = new EventEmitter<any>();
  @Output() onSimulatorLoadedEvent = new EventEmitter<boolean>();
  @Output() onFlightpathValidatedEvent = new EventEmitter<any>();

  constructor(private data: DataService, private http: HttpService, private shared: SharedService) {
    console.log('Starting simulator service...');
    this.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          console.log('Simulator finished loading data.');
          this.loaded = true;
        }
      }
    );
  }

  reset(sendNotification = true) {
    this.http.sendCommand('stop').then(res => {
      this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Drone stopped flying', type: 'succes'});
      this.map.reset();
      this.map.loadMap(this.maps[this.selectedMap]);
      this.drone.loadDrone(this.drones[this.selectedDrone]);
      if (sendNotification) {
        this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Simulator reset.', type: 'info'});
      }
    });
  }

  init() {
    if (this.map === undefined) {
      this.map = new Map();
      this.drone = new Drone();
      this.drone.loadDrone(this.drones[this.selectedDrone]);
      this.map.loadMap(this.maps[this.selectedMap]);
    }
    this.initialized = true;
  }

  loadMaps() {
    return new Promise((resolve, reject) => {
      console.log('Loading map data...');
      this.http.getAllMaps()
        .then(result => {
          this.maps = result;
          if (this.maps.length === 0) {
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: 'No maps found in database, initializing new map...',
              type: 'warning'
            });
            this.data.getNewMap()
              .then((res) => {
                this.http.addMap(res)
                  .then(() => {
                    this.onAlertEvent.emit({
                      title: 'Drone Control Center', message: 'New map added.', type: 'success'
                    });
                    this.http.getAllMaps()
                      .then(newMaps => {
                        this.maps = newMaps;
                        resolve();
                      })
                      .catch(error => {
                        this.onAlertEvent.emit({
                          title: 'Drone Control Center',
                          message: 'Error loading maps from database.',
                          type: 'error'
                        });
                        console.log(error);
                      });
                  })
                  .catch(error => {
                    this.onAlertEvent.emit({
                      title: 'Drone Control Center',
                      message: 'Error adding new maps.',
                      type: 'error'
                    });
                    console.log(error);
                  });
              })
              .catch(error => {
                this.onAlertEvent.emit({
                  title: 'Drone Control Center',
                  message: 'Error loading new map from JSON.',
                  type: 'error'
                });
                console.log(error);
              });

          } else {
            resolve();
          }
        })
        .catch(error => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Error loading maps from database.',
            type: 'error'
          });
          console.log(error);
          reject();
        });
    });
  }

  loadDrones() {
    return new Promise((resolve, reject) => {
      console.log('Loading drone data...');
      this.http.getAllDrones()
        .then(result => {
          this.drones = result;
          if (this.drones.length === 0) {
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: 'No drones found in database, initializing new drone...',
              type: 'warning'
            });
            this.data.getNewDrone()
              .then((res) => {
                this.http.addDrone(res)
                  .then(() => {
                    this.onAlertEvent.emit({
                      title: 'Drone Control Center', message: 'New drone added.', type: 'success'
                    });
                    this.http.getAllDrones()
                      .then(newDrones => {
                        this.drones = newDrones;
                        resolve();
                        this.http.updateDrone(this.drones[this.selectedDrone])
                          .catch((err) => {
                            this.onAlertEvent.emit({
                              title: 'Drone Control Center',
                              message: 'Error setting new drone configuration',
                              type: 'error'
                            });
                            console.log(err);
                          });
                      })
                      .catch(error => {
                        this.onAlertEvent.emit({
                          title: 'Drone Control Center',
                          message: 'Error loading drones from database.',
                          type: 'error'
                        });
                        console.log(error);
                      });
                  })
                  .catch(error => {
                    this.onAlertEvent.emit({
                      title: 'Drone Control Center',
                      message: 'Error adding new drones.',
                      type: 'error'
                    });
                    console.log(error);
                  });
              })
              .catch(error => {
                this.onAlertEvent.emit({
                  title: 'Drone Control Center',
                  message: 'Error loading new drone from JSON.',
                  type: 'error'
                });
                console.log(error);
              });
          } else {
            resolve();
          }
        })
        .catch(error => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Error loading drones from database.',
            type: 'error'
          });
          console.log(error);
          reject();
        });
    });
  }

  load() {
    return new Promise((resolve, reject) => {
      this.loadMaps()
        .then(() => {
          this.loadDrones()
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        }).catch(() => {
        reject();
      });
    });
  }

  selectMap(id) {
    this.selectedMap = id;
    this.reset(false);
  }

  selectDrone(id) {
    this.selectedDrone = id;
    this.reset(false);
  }

  validateFlightPath() {
    if (this.map.flightpath.waypoints.length > 0) {
      const flightpath = this.map.flightpath.toJSON();
      flightpath.radius = this.drone.radius;
      this.onAlertEvent.emit({
        title: 'Drone Control Center',
        message: 'Validating flight path...',
        type: 'info'
      });
      this.http.validateFlightpath(flightpath)
        .then((optimal) => {
          console.log('Received optimal flightpath from server: ', optimal);
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Optimal flightpath calculated.',
            type: 'success'
          });
          this.map.flightpath.waypoints = optimal;
          this.onFlightpathValidatedEvent.emit(true);
        })
        .catch((err) => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Error calculating optimal flightpath.',
            type: 'error'
          });
          this.onFlightpathValidatedEvent.emit(false);

        });
    } else {
      this.onAlertEvent.emit({
        title: 'Drone Control Center',
        message: 'No waypoints selected.',
        type: 'error'
      });
      this.onFlightpathValidatedEvent.emit(false);
    }
  }

  sendFlightpath() {
    this.http.getDroneStatus().then(res => {
      // voor ts errors te onderdrukken, want ts zal anders zeggen dat res de properties validated etc niet heeft
      const info = res as Statusinfo;
      console.log(info);
      if(info.validated && !info.flying){
        const flightpath = this.map.flightpath.toJSON();
        this.http.sendFlightpathToDrone(flightpath).then((ress) => {
          this.map.flightpath.sentToDrone = true;
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Flightpath sent to drone.',
            type: 'success'
          });
        }).catch(error => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Sending valid flightpath to drone failed.',
            type: 'success'
          });
        });
      } else {
        if (info.flying) {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Drone is already flying, stop it first.',
            type: 'error'
          });
        } else {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'No valid flightpath set.',
            type: 'error'
          });
        }
      }
    }).catch(error => {
      // statusinfo kon niet worden opgevraagd
      console.log(error);
    });

  }

  startDrone() {
    this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Starting flight...', type: 'info'});
    this.http.getDroneStatus().then( res => {
      // voor ts errors te onderdrukken, want ts zal anders zeggen dat res de properties validated etc niet heeft
      const info = res as Statusinfo;
      if (info.validated && info.sent) {
        if (!info.flying) {
          this.http.sendCommand('start').then( ress => {
            console.log(ress);
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: 'Drone started flying.',
              type: 'success'
            });
          }).catch( error => {
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: 'Drone did not start flying.',
              type: 'error'
            });
          });
        } else {
          this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Drone is already flying.', type: 'info'});
        }
      } else {
        let mes = 'alt nie gezet wordt door de rest eh';
        if (!info.validated) {
          mes = 'No flightpath has been validated and sent.';
        } else if (info.validated && !info.sent) {
          mes = 'A flightpath has been validated, but not sent to the drone.';
        }
        this.onAlertEvent.emit({
          title: 'Drone Control Center',
          message: mes,
          type: 'error'
        });
      }
    }).catch(error => {
      // statusinfo kon niet worden opgevraagd
      console.log(error);
    });
  }

  pauseDrone() {
    this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Pausing flight...', type: 'info'});
    this.http.getDroneStatus().then(res => {
      const info = res as Statusinfo;
      if (info.flying) {
        this.http.sendCommand('pause').then(ress => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Drone paused flying.',
            type: 'success'
          });
        }).catch( error => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Drone did not pause flying.',
            type: 'error'
          });
        });
      } else {
        this.onAlertEvent.emit({
          title: 'Drone Control Center',
          message: 'Drone already stopped flying earlier.',
          type: 'info'
        });
      }
    }).catch(error => {
      // statusinfo kon niet worden opgevraagd
      console.log(error);
    });
  }

  updateMap(notification = true) {
    return new Promise(((resolve, reject) => {
      this.http.updateMap(this.map.toJSON()).then(() => {
        this.http.getAllMaps()
          .then(result => {
            this.maps = result;
            if (notification) {
              this.onAlertEvent.emit({
                title: 'Drone Control Center',
                message: 'Saved map.',
                type: 'success'
              });
            }
            resolve();
          })
          .catch(err => {
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: err.toString(),
              type: 'error'
            });
            reject();
          });
      });
    }));
  }

  updateDrone(notification = true) {
    return new Promise(((resolve, reject) => {
      this.http.updateDrone(this.drone.toJSON()).then(() => {
        this.http.getAllDrones()
          .then(result => {
            this.drones = result;
            if (notification) {
              this.onAlertEvent.emit({
                title: 'Drone Control Center',
                message: 'Saved drone.',
                type: 'success'
              });
            }
            resolve();
          })
          .catch(err => {
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: err.toString(),
              type: 'error'
            });
            reject();
          });
      });
    }));
  }

  exportMap() {
    // TODO: Generate JSON file on backend and download file
  }
}

interface Statusinfo {
  validated: boolean;
  sent: boolean;
  flying: boolean;
}
