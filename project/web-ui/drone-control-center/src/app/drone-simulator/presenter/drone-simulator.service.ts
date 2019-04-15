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

  map;
  drone;
  droneDbinfo;

  loaded;
  initialized;

  maps;

  @Output() onAlertEvent = new EventEmitter<any>();
  @Output() onSimulatorLoadedEvent = new EventEmitter<boolean>();

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
    this.map.reset();
    this.map.loadMap(this.maps[this.selectedMap]);
    if (sendNotification) {
      this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Map reset.', type: 'info'});
    }
  }

  init() {
    if (this.map === undefined) {
      this.map = new Map();
      this.drone = new Drone();
      this.map.loadMap(this.maps[this.selectedMap]);
    }
    this.initialized = true;
  }

  load() {
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
          }
        })
        .then(lol => {
          console.log('Loading drone information...');
          this.http.getDroneDbInformation()
            .then(
            res => {
              this.droneDbinfo = res;
              console.log(res);
              this.fillDroneObject();
              resolve();
            }).catch(
              error => {
                console.log('geen drone gevonden in database');
                this.data.getNewDrone().then(res => {
                  console.log('nieuwe standaard drone inladen...');
                  this.droneDbinfo = res;
                  console.log(res);
                  this.http.postDroneDbInformation(res)
                    .then( ress => {
                      this.fillDroneObject();
                      console.log(ress);
                      resolve();
                    });
                });
              }
          );
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

  start() {
    this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Starting flight...', type: 'info'});
  }

  selectMap(id) {
    this.selectedMap = id;
    this.reset(false);
  }

  validateFlightPath() {
    if (this.map.flightpath.waypoints.length > 0) {
      const flightpath = this.map.flightpath.toJSON();
      this.onAlertEvent.emit({
        title: 'Drone Control Center',
        message: 'Validating flight path...',
        type: 'info'
      });
      this.updateMap(false)
        .then(() => {
            this.http.validateFlightpath(flightpath)
              .then((optimal) => {
                console.log('Received optimal flightpath from server: ', optimal);
                this.onAlertEvent.emit({
                  title: 'Drone Control Center',
                  message: 'Optimal flightpath calculated.',
                  type: 'success'
                });
                this.map.flightpath.setOptimalPath(optimal);
              })
              .catch((err) => {
                this.onAlertEvent.emit({
                  title: 'Drone Control Center',
                  message: 'Error calculating optimal flightpath.',
                  type: 'error'
                });
              });
          }
        );
      console.log(flightpath);
    } else {
      this.onAlertEvent.emit({
        title: 'Drone Control Center',
        message: 'No waypoints selected.',
        type: 'error'
      });
    }
  }

  updateMap(notification = true) {
    return new Promise(((resolve, reject) => {
      this.http.updateMap(this.map.toJSON(this.map.name)).then(() => {
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
          });
      });
    }));
  }

  fillDroneObject() {
    this.drone.id = this.droneDbinfo._id;
    this.drone.name = this.droneDbinfo.name;
    this.drone.radius = this.droneDbinfo.properties.radius;
  }

  updateDrone() {
    const d = {
      _id: this.droneDbinfo.id,
      name: this.droneDbinfo.name,
      properties: {
        radius: this.droneDbinfo.radius
      }
    };
    this.http.putDroneDbInformation(d).then(res => {this.fillDroneObject(); } );
  }

  exportMap() {
    // TODO: Generate JSON file on backend and download file
  }
}
