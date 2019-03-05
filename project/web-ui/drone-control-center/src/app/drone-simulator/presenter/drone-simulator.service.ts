import {EventEmitter, Injectable, Output} from '@angular/core';
import {Map} from '../model/map';
import {Drone} from '../model/drone';
import {HttpService} from '../../http.service';
import {DataService} from '../../data.service';
import {ImageLoader} from '../utils/image-loader';

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
  imageLoader;

  mockupDrone = false;

  maps;
  mouseX;
  mouseY;

  @Output() alertEvent = new EventEmitter<string>();

  constructor(private data: DataService, private http: HttpService) {
    this.imageLoader = new ImageLoader();
    this.loaded = false;
    this.simulationRunner = undefined;
    this.http = http;
  }

  keyhandler(e) {
    if (this.simulationRunner) {
      if (e.keyCode === 37) {
        this.drone.move('west');
      } else if (e.keyCode === 38) {
        this.drone.move('south');
      } else if (e.keyCode === 39) {
        this.drone.move('east');
      } else if (e.keyCode === 40) {
        this.drone.move('north');
      }
    }
    this.render();
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

  reset() {
    if (this.simulationRunner) {
      window.clearInterval(this.simulationRunner);
      this.simulationRunner = undefined;
      this.alertEvent.emit('Simulation stopped.');
    }
    this.drone.reset();
    this.map.reset();
    this.map.loadMap(this.maps[this.selectedMap]).then(() => this.render());
  }

  init() {
    const gridSize = {width: this.canvas.width / this.tileSize, height: this.canvas.height / this.tileSize};
    this.map = new Map(gridSize, this.tileSize, this.imageLoader);
    this.drone = new Drone(1, 1, this.tileSize, gridSize, this.imageLoader);
    this.map.loadMap(this.maps[this.selectedMap]).then(() => {
      window.addEventListener('keydown', (event) => {
        this.keyhandler(event);
      });
      window.addEventListener('mousedown', (event) => {
        this.clickhandler(event);
      });
      window.addEventListener('mousemove', (event) => {
        this.mousehandler(event);
      });
    });
    this.loaded = true;
    this.render();
  }

  load() {
    return new Promise((resolve, reject) => {
      this.canvas = document.getElementById('simulator');
      if (!this.loaded) {
        this.imageLoader.loadImages()
          .then(() => {
            this.http.getAllMaps()
              .then(result => {
                this.maps = result;
                if (this.maps.length > 0) {
                  this.init();
                } else {
                  this.alertEvent.emit('No maps found in database, initializing new map...');
                  this.data.getNewMap()
                    .then((res) => {
                      this.http.addMap(res)
                        .then(() => {
                          this.alertEvent.emit('New map added.');
                          this.http.getAllMaps()
                            .then(newMaps => {
                              this.maps = newMaps;
                              this.init();
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        })
                        .catch(error => {
                          this.alertEvent.emit('Error adding new maps');
                          console.log(error);
                        });
                    })
                    .catch(error => {
                      this.alertEvent.emit('Error loading new map from JSON.');
                      console.log(error);
                    });
                }
              })
              .catch(error => {
                this.alertEvent.emit('Error loading maps from database');
                console.log(error);
                reject();
              });
          })
          .catch(error => {
            this.alertEvent.emit('Error loading images');
            console.log(error);
            reject();
          });
      }
      resolve();
    });
  }

  start() {
    if (this.map.optimalFlightPath && this.simulationRunner === undefined) {
      this.alertEvent.emit('Starting simulation...');
      const context = this.canvas.getContext('2d');

      let currentWaypoint = 0;
      this.simulationRunner = setInterval(() => {
        if (currentWaypoint < this.map.optimalFlightPath.length) {
          this.drone.moveTo(this.map.optimalFlightPath[currentWaypoint].x, this.map.optimalFlightPath[currentWaypoint].y);
          this.render();
          currentWaypoint++;
        } else {
          window.clearInterval(this.simulationRunner);
          this.simulationRunner = undefined;
          this.alertEvent.emit('Simulation finished.');
        }
      }, 100);
    } else {
      this.alertEvent.emit('No optimal flightpath calculated.');
    }
  }

  render() {
    const context = this.canvas.getContext('2d');
    this.map.draw(context);
    this.drone.draw(context);
  }

  selectMap(id) {
    this.selectedMap = id;
    this.reset();
  }

  selectDrawable(drawable) {
    this.selectedDrawable = drawable;
  }

  calculateOptimalFlightPath() {
    const flightpath = this.map.flightpath.saveFlightPath();
    console.log('Sending waypoints to back-end:', flightpath);
    this.updateMap().then(() => {
      this.http.fetchOptimalFlightpath(flightpath).then((optimal) => {
        console.log('Received optimal flightpath from server: ', optimal);
        this.alertEvent.emit('Optimal flightplath successfully calculated.');
        this.map.optimalFlightPath = optimal;
      });
    })
      .catch((err) => {
        console.log(err);
      });

  }

  duplicateMap() {
    console.log('Exporting map...');
    this.http.addMap(this.map.mapToJSON('Exported Map')).then(() => {
      this.http.getAllMaps()
        .then(result => {
          this.maps = result;
          this.selectedMap = this.maps.length - 1;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  updateMap() {
    return new Promise(((resolve, reject) => {
      this.http.updateMap(this.map.mapToJSON(this.map.name)).then(() => {
        this.http.getAllMaps()
          .then(result => {
            this.maps = result;
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }));

  }
}
