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
  selectedMap = 0;
  selectedDrone = 0;

  map;
  drone;

  loaded;
  initialized;
  updating;

  maps;
  drones;

  flightOptions: { aster: string; return: string };

  @Output() onAlertEvent = new EventEmitter<any>();
  @Output() onSimulatorLoadedEvent = new EventEmitter<boolean>();
  @Output() onFlightpathValidatedEvent = new EventEmitter<any>();
  @Output() onStopEvent = new EventEmitter<boolean>();
  @Output() onDataUpdateEvent = new EventEmitter<any>();

  reset(sendNotification = true) {
    this.map.reset();
    this.map.loadMap(this.maps[this.selectedMap]);
    this.drone.loadDrone(this.drones[this.selectedDrone]);
    if (sendNotification) {
      this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Simulator reset.', type: 'info'});
    }
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

  checkScanZoneOverlap(waypoints) {
    const scanzones = this.map.scanzones;
    scanzones.forEach(sz => {
      const x1 = sz.position.x;
      const y1 = sz.position.y;
      waypoints.forEach((coord, index) => {
        const x2 = coord.x;
        const y2 = coord.y;
        const a = x1 - x2;
        const b = y1 - y2;
        const dist = Math.sqrt(a * a + b * b);
        if (dist <= sz.range && sz.range >= this.drone.radius) {
          waypoints[index].z = Math.round(sz.position.z);
          waypoints[index].scan = true;
          waypoints[index].orientation = sz.orientation;
          waypoints[index].x = Math.round(x1);
          waypoints[index].y = Math.round(y1);
          waypoints[index].scanzone = sz;
        }
      });
    });
    return waypoints;
  }

  validateFlightPath() {
    if (this.map.flightpath.waypoints.length > 0) {
      const flightpath = this.map.flightpath.toJSON();
      flightpath.waypoints = this.checkScanZoneOverlap(flightpath.waypoints);
      flightpath.options = this.flightOptions;
      flightpath.radius = this.drone.radius;
      flightpath.size = this.map.size;
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
      if (info.validated && !info.flying) {
        const flightpath = this.map.flightpath.toJSON();
        flightpath.radius = this.drone.radius;
        this.http.sendFlightpathToDrone(flightpath).then((ress) => {
          this.map.flightpath.sentToDrone = true;
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Flightpath sent to drone.',
            type: 'success'
          });
          this.startDrone();
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
    this.http.getDroneStatus().then(res => {
      // voor ts errors te onderdrukken, want ts zal anders zeggen dat res de properties validated etc niet heeft
      const info = res as Statusinfo;
      if (info.validated && info.sent) {
        if (!info.flying) {
          this.http.sendCommand('start').then(ress => {
            console.log(ress);
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: 'Drone started flying.',
              type: 'success'
            });
          }).catch(error => {
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

  stopDrone() {
    this.http.sendCommand('stop').then(res => {
      this.onStopEvent.emit(true);
      this.onAlertEvent.emit({
        title: 'Drone Control Center',
        message: 'Drone stopped flying.',
        type: 'warning'
      });
    });
  }

  returnDrone() {
    this.stopDrone();
    const flightpath = {
      mapId: this.map.flightpath.mapId,
      waypoints: [{x: this.drone.position.x, y: this.drone.position.y}, {x: 1000, y: 1000}],
      radius: this.drone.radius,
      size: this.map.size,
      options: {
        return: 'false',
        aster: 'auto'
      }
    };
    this.onAlertEvent.emit({
      title: 'Drone Control Center',
      message: 'Calculating return path...',
      type: 'info'
    });
    this.http.validateFlightpath(flightpath)
      .then((optimal) => {
        console.log('Received return path from server: ', optimal);
        this.onAlertEvent.emit({
          title: 'Drone Control Center',
          message: 'Received return path from server.',
          type: 'success'
        });
        this.map.flightpath.waypoints = optimal;
        this.onFlightpathValidatedEvent.emit(true);
        this.http.sendFlightpathToDrone(this.map.flightpath).then((ress) => {
          this.map.flightpath.sentToDrone = true;
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Return path sent to drone.',
            type: 'success'
          });
          this.startDrone();
        }).catch(error => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Sending valid flightpath to drone failed.',
            type: 'success'
          });
        });
      })
      .catch((err) => {
        this.onAlertEvent.emit({
          title: 'Drone Control Center',
          message: 'Error calculating return path.',
          type: 'error'
        });
        this.onFlightpathValidatedEvent.emit(false);

      });
  }

  pauseDrone() {
    this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Stopping flight...', type: 'info'});
    this.http.getDroneStatus().then(res => {
      const info = res as Statusinfo;
      if (info.flying) {
        this.http.sendCommand('pause').then(ress => {
          this.onStopEvent.emit(true);
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Drone Stopped flying.',
            type: 'success'
          });
        }).catch(error => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Drone did not stop flying.',
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
