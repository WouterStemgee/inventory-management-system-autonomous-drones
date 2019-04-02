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

  start() {
    this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Starting flight...', type: 'info'});
  }

  selectMap(id) {
    this.selectedMap = id;
    this.reset(false);
  }

  validateFlightPath() {
    const flightpath = this.map.flightpath.toJSON();
    this.onAlertEvent.emit({
      title: 'Drone Control Center',
      message: 'Validating flight path...',
      type: 'info'
    });
    this.updateMap()
      .then(() => {
          this.http.fetchOptimalFlightpath(flightpath)
            .then((optimal) => {
              console.log('Received optimal flightpath from server: ', optimal);
              this.onAlertEvent.emit({
                title: 'Drone Simulator',
                message: 'Optimal flightpath calculated.',
                type: 'success'
              });
              this.map.flightpath.setOptimalPath(optimal);
            })
            .catch((err) => {
              this.onAlertEvent.emit({
                title: 'Drone Simulator',
                message: 'Error calculating optimal flightpath.',
                type: 'error'
              });
            });
        }
      )
    console.log(flightpath);
  }

  duplicateMap() {
    this.http.addMap(this.map.toJSON('New Map')).then(() => {
      this.http.getAllMaps()
        .then(result => {
          this.maps = result;
          this.selectedMap = this.maps.length - 1;
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: 'Duplicated map.',
            type: 'success'
          });
        })
        .catch(err => {
          this.onAlertEvent.emit({
            title: 'Drone Control Center',
            message: err.toString(),
            type: 'error'
          });
        });
    });
  }

  updateMap() {
    return new Promise(((resolve, reject) => {
      this.http.updateMap(this.map.toJSON(this.map.name)).then(() => {
        this.http.getAllMaps()
          .then(result => {
            this.maps = result;
            this.onAlertEvent.emit({
              title: 'Drone Control Center',
              message: 'Saved map.',
              type: 'success'
            });
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

  exportMap() {
    // TODO: Generate JSON file on backend and download file
  }
}
