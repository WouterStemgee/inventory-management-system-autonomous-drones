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
  tileSize = 20;
  selectedMap = 0;
  selectedDrawable = 'waypoint';

  canvas;
  map;
  drone;
  simulationRunner;

  loaded;
  initialized;
  eventListenersRegistered;

  imageLoader;

  maps;

  mouseX;
  mouseY;

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
    this.imageLoader = new ImageLoader();
    this.simulationRunner = undefined;
  }

  registerEventListeners() {
    this.canvas.addEventListener('keydown', (event) => {
      this.keyhandler(event);
    });
    this.canvas.addEventListener('mousedown', (event) => {
      this.clickhandler(event);
    });
    this.canvas.addEventListener('mousemove', (event) => {
      this.mousehandler(event);
    });
    this.resize();
  }

  keyhandler(e) {
  }

  clickhandler(e) {
    const pos = this.mousePos(e);
    if (pos.x >= 0 && pos.y >= 0 && pos.x <= this.canvas.width && pos.y <= this.canvas.height) {
      const x = Math.floor(pos.x / this.tileSize);
      const y = Math.floor(pos.y / this.tileSize);
      if (this.selectedDrawable === 'waypoint') {
        this.map.toggleWaypoint(x, y);
      } else if (this.selectedDrawable === 'obstacle') {
        this.map.toggleObstacle(x, y);
      } else if (this.selectedDrawable === 'product') {
        this.map.toggleProduct(x, y);
      }
    }
    this.render();
  }

  mousehandler(e) {
    const pos = this.mousePos(e);
    if (pos.x >= 0 && pos.y >= 0 && pos.x <= this.canvas.width && pos.y <= this.canvas.height) {
      this.mouseX = Math.floor(pos.x / this.tileSize);
      this.mouseY = Math.floor(pos.y / this.tileSize);
    }
  }

  mousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    };
  }

  reset(sendNotification = true) {
    if (this.simulationRunner) {
      window.clearInterval(this.simulationRunner);
      this.simulationRunner = undefined;
      this.onAlertEvent.emit({title: 'Simulator', message: 'Simulation stopped.', type: 'error'});
    }
    this.drone.reset();
    this.map.reset();
    this.map.loadMap(this.maps[this.selectedMap]);
    this.render();
    if (sendNotification) {
      this.onAlertEvent.emit({title: 'Drone Simulator', message: 'Simulation reset.', type: 'info'});
    }
  }

  init() {
    this.canvas = document.getElementById('simulator');
    const gridSize = {width: this.canvas.width / this.tileSize, height: this.canvas.height / this.tileSize};
    if (this.map === undefined) {
      this.map = new Map(gridSize, this.tileSize, this.imageLoader);
      this.drone = new Drone(1, 1, this.tileSize, gridSize, this.imageLoader);
      this.map.loadMap(this.maps[this.selectedMap]);
    }
    if (!this.eventListenersRegistered) {
      this.registerEventListeners();
      this.eventListenersRegistered = true;
    }
    this.initialized = true;
    this.render();
  }

  resize() {
    if (this.shared.isHandset$) {
      const width = window.innerWidth;
      const canvas = document.getElementById('simulator') as HTMLCanvasElement;
      if (canvas) {
        const ratio = canvas.height / canvas.width;
        const height = width * ratio;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
      }
    }
  }

  load() {
    return new Promise((resolve, reject) => {
      console.log('Loading simulator data...');
      this.imageLoader.loadImages()
        .then(() => {
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
                          .catch(err => {
                            this.onAlertEvent.emit({
                              title: 'Drone Control Center',
                              message: 'Error loading maps from database.',
                              type: 'error'
                            });
                          });
                      })
                      .catch(error => {
                        this.onAlertEvent.emit({
                          title: 'Drone Control Center',
                          message: 'Error adding new maps.',
                          type: 'error'
                        });
                      });
                  })
                  .catch(error => {
                    this.onAlertEvent.emit({
                      title: 'Drone Control Center',
                      message: 'Error loading new map from JSON.',
                      type: 'error'
                    });
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
              reject();
            });
        })
        .catch(error => {
          this.onAlertEvent.emit({title: 'Drone Control Center', message: 'Error loading images.', type: 'error'});
          reject();
        });
    });
  }

  start() {
    if (this.simulationRunner === undefined) {
      if (this.map.flightpath.optimalPath) {
        this.onAlertEvent.emit({title: 'Drone Simulator', message: 'Starting simulation...', type: 'info'});
        let currentWaypoint = 0;
        this.simulationRunner = setInterval(() => {
          if (currentWaypoint < this.map.flightpath.optimalPath.length) {
            this.drone.moveTo(this.map.flightpath.optimalPath[currentWaypoint].x, this.map.flightpath.optimalPath[currentWaypoint].y, 1);
            this.render();
            currentWaypoint++;
          } else {
            window.clearInterval(this.simulationRunner);
            this.simulationRunner = undefined;
            this.drone.z = 0;
            this.onAlertEvent.emit({title: 'Drone Simulator', message: 'Simulation finished.', type: 'success'});
          }
        }, 100);
      } else {
        this.onAlertEvent.emit({
          title: 'Drone Simulator',
          message: 'No optimal flightpath calculated.',
          type: 'error'
        });
      }

    }
  }

  render() {
    const context = this.canvas.getContext('2d');
    this.map.draw(context);
    this.drone.draw(context);
  }

  selectMap(id) {
    this.selectedMap = id;
    this.reset(false);
  }

  selectDrawable(drawable) {
    this.selectedDrawable = drawable;
  }

  calculateOptimalFlightPath() {
    const flightpath = this.map.flightpath.toJSON();
    if (flightpath.waypoints.length > 2) {
      console.log('Sending waypoints to back-end:', flightpath);
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
                this.render();
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
        .catch(
          (err) => {
            this.onAlertEvent.emit({title: 'Drone Simulator', message: err.toString(), type: 'error'});
          });
    } else {
      this.onAlertEvent.emit({
        title: 'Drone Simulator',
        message: 'No waypoints selected.',
        type: 'error'
      });
    }
  }

  duplicateMap() {
    this.http.addMap(this.map.toJSON('New Map')).then(() => {
      this.http.getAllMaps()
        .then(result => {
          this.maps = result;
          this.selectedMap = this.maps.length - 1;
          this.onAlertEvent.emit({
            title: 'Drone Simulator',
            message: 'Duplicated map.',
            type: 'success'
          });
        })
        .catch(err => {
          this.onAlertEvent.emit({
            title: 'Drone Simulator',
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
              title: 'Drone Simulator',
              message: 'Saved map.',
              type: 'success'
            });
            resolve();
          })
          .catch(err => {
            this.onAlertEvent.emit({
              title: 'Drone Simulator',
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
