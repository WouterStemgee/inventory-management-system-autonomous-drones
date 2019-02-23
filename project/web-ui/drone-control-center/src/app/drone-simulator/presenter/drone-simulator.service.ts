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

  maps;

  @Output() alertEvent =  new EventEmitter<string>();
  constructor(private data: DataService, http: HttpService) {
    this.imageLoader = new ImageLoader();
    this.loaded = false;
  }

  keyhandler(e) {
    return new Promise((resolve, reject) => {
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
        resolve();
      }
    });
  }

  clickhandler(e) {
    return new Promise((resolve, reject) => {
      const pos = this.mousePos(e);
      if (pos.x >= 0 && pos.y >= 0 && pos.x <= this.canvas.width && pos.y <= this.canvas.height) {
        const x = Math.floor(pos.x / this.tileSize);
        const y = Math.floor(pos.y / this.tileSize);
        if (this.selectedDrawable === 'waypoint') {
          this.map.toggleWaypoint(x, y);
        } else if (this.selectedDrawable === 'obstacle') {
          this.map.toggleObstacle(x, y);
        } else if (this.selectedDrawable === 'inventoryItem') {
          this.map.toggleInventoryItem(x, y);
        }
      }
      resolve();
    });
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
      console.log('Simulation stopped.');
    }
    this.drone.reset();
    this.map.reset();
    this.map.loadMap(this.maps[this.selectedMap]).then(() => this.render());
  }

  load() {
    this.canvas = document.getElementById('simulator');

    if (!this.loaded) {
      const gridSize = {width: this.canvas.width / this.tileSize, height: this.canvas.height / this.tileSize};
      this.imageLoader.loadImages().then(() => {
        this.map = new Map(gridSize, this.tileSize, this.imageLoader);
        this.drone = new Drone(1, 1, this.tileSize, gridSize, this.imageLoader);
        this.data.getAllMaps()
          .then(result => {
            this.maps = result;
            this.map.loadMap(this.maps[this.selectedMap]).then(() => {
              window.addEventListener('keydown', (event) => {
                this.keyhandler(event).then(() => this.render());
              });
              window.addEventListener('mousedown', (event) => {
                this.clickhandler(event).then(() => this.render());
              });
              this.loaded = true;
              this.render();
            });
          })
          .catch(error => {
            console.log('Error loading maps: ', error);
          });
      });

    }
  }

  start() {
    if (this.map.optimalFlightPath) {
      this.alertEvent.emit('Starting simulation...');
      const context = this.canvas.getContext('2d');
      this.simulationRunner = setInterval(() => {
        this.renderDrone();
      }, 50);
    } else {
      this.alertEvent.emit('No flightpath found.');
    }
  }

  render() {
    const context = this.canvas.getContext('2d');
    this.map.draw(context);
  }

  renderDrone() {
    const context = this.canvas.getContext('2d');
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
    const coords = this.map.flightpath.saveFlightPath();
    console.log('Sending waypoints to back-end:', coords);
    // POST waypoints to back-end API
  }
}
