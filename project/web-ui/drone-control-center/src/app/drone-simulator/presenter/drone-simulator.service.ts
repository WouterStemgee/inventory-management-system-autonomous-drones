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
    // indien het waypoint binnen de radius van een scanlocatie valt,
    // zal het middelpunt van die scanlocatie doorgestuurd worden als vliegroute
    // dit geberud niet indien de drone te groot is voor de scanlocatie
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
    // stuurt de vliegroute naar de backend waar deze via het algoritme eventueel gecorrigeerd wordt, of gemaakt wordt etc.
    // zie Aster klasse in de back-end
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
    // zend de vliegroute naar de drone zodat deze later kan starten met het afvliegen van de coordinaten
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
    // start de drone zodat deze het gekozen pad zal afvliegen
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
    // stopt de drone, hierbij zal de drone ook terplekke landen
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
    // stopt de drone,
    // zoekt het kortste pad naar de homebase
    // vliegt terug nar de homebase
    this.stopDrone();
    const flightpath = {
      mapId: this.map.flightpath.mapId,
      options: {
        return: 'false',
        aster: 'correct'
      },
      waypoints: [{x: Number(this.drone.position.x), y: this.drone.position.y}, {x: this.drone.homebase.x, y: this.drone.homebase.y}],
      radius: this.drone.radius,
      size: this.map.size
    };
    this.http.validateFlightpath(flightpath)
      .then((optimal) => {
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
            message: 'Sending valid return path to drone failed.',
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
    // zal de drone terplaatse doen blijven zweven,
    // indien dit boven de homebase van de drone is zal deze echter landen en dus het stop commando uitvoeren
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
        this.http.updateHomebase(this.drone.homebase.x, this.drone.homebase.y).then(() => {
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
      });
    }));
  }

  exportMap() {
    // TODO: Generate JSON file on backend and download file
  }

  checkCollision() {
    // haalt de obstakels uit de map en stuurt nadien de positie van de drone
    // samen met de 4 randen van elk obstakel door naar de backend
    // zodat kan berekend worden hou ver de drone zich van elke muur bevindt
    const obstacles = this.map.obstacles;
    const lijnen = [];

    obstacles.forEach(o => {
      const p1 = o.positions[0];
      const p2 = o.positions[1];

      const p1x = Math.round(p1.x);
      const p1y = Math.round(p1.y);
      const p2x = Math.round(p2.x);
      const p2y = Math.round(p2.y);
      // px en py van drone, PuntTotLijn(px, py, p1x, p1y, p2x, p2y) oproepen op backend
      lijnen.push([p1x, p1y, p2x, p2y]);
    });
    this.http.checkCollision([this.drone.position.x, this.drone.position.y], lijnen)
      .then((afstand) => {
          if (afstand < this.drone.radius && afstand > (3 * this.drone.radius / 4)) {
            // drone komt te dicht bij de muur
          } else if ( (3 * this.drone.radius / 4) >= afstand) {
            // drone komt veel te dicht stop de drone
          }
    });
  }

  batteryWarning() {
    this.onAlertEvent.emit({
      title: 'Battery Level',
      message: 'Battery level getting low',
      type: 'warning'});
  }

  batteryAbort() {
    this.onAlertEvent.emit({
      title: 'Battery Level',
      message: 'Battery Level critical, returning to homebase',
      type: 'error'
    });
    this.returnDrone();
  }
}

interface Statusinfo {
  validated: boolean;
  sent: boolean;
  flying: boolean;
}
