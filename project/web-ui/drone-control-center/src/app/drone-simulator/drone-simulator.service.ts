import { Injectable } from '@angular/core';
import { Map } from './simulator/map.js';
import { Drone } from './simulator/drone.js';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class DroneSimulatorService {
  tileSize = 20;
  selectedMap = 0;
  selectedDrawable = 'inventoryItem';

  canvas;
  map;
  drone;
  simulationRunner;
  loaded;

  maps;

  constructor(private data: DataService, http: HttpService) {
    this.loaded = false;
  }

  keyhandler(e) {
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

  clickhandler(e) {
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
  }

  mousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    };
  }

  reset() {
    this.drone.reset();
    this.map.reset();
    this.map.loadMap(this.maps[this.selectedMap]);
  }

  load() {
    this.canvas = document.getElementById('simulator');

    if (!this.loaded) {
      const gridSize = { width: this.canvas.width / this.tileSize, height: this.canvas.height / this.tileSize};

      this.map = new Map(gridSize, this.tileSize);
      this.maps = [];
      this.data.getAllMaps()
        .then(result => {
          console.log('All maps: ', result);
          this.maps = result;
          this.map.loadMap(this.maps[this.selectedMap]);
          this.loaded = true;
        })
        .catch( error => {
          console.log('Error loading maps: ', error);
        });

      this.drone = new Drone(1, 1, this.tileSize, gridSize);

      window.addEventListener('keydown', (event) => {
        this.keyhandler(event);
      });
      window.addEventListener('mousedown', (event) => {
        this.clickhandler(event);
      });
    }
    this.start();
  }

  start() {
    const context = this.canvas.getContext('2d');
    this.simulationRunner = setInterval(() => {
      this.map.draw(context);
      this.drone.draw(context);
    }, 50);
  }

  selectMap(id) {
    this.selectedMap = id;
    this.reset();
  }

  selectDrawable(drawable) {
    switch (drawable) {
      case 'waypoint':
        this.selectedDrawable = 'waypoint';
        break;
      case 'obstacle':
        this.selectedDrawable = 'obstacle';
        break;
      case 'inventoryItem':
        this.selectedDrawable = 'inventoryItem';
        break;
    }
  }

  calculateOptimalFlightPath() {
    const coords = this.map.flightpath.saveFlightPath();
    console.log('Sending waypoints to back-end:', coords);
    // POST waypoints to back-end API
  }
}
