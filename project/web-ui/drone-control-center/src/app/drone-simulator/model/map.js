import {Grid} from './grid.js';
import {FlightPath} from "./flightpath.js";
import {InventoryItem} from "./inventory-item.js";
import {Obstacle} from "./obstacle.js";

export class Map {

  constructor(gridSize, tileSize, imageLoader) {
    this.name = '';
    this.id = 0;
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.grid = new Grid(gridSize, tileSize);
    this.obstacles = [];
    this.inventoryItems = [];
    this.flightpath = undefined;
    this.optimalFlightPath = undefined;
    this.imageLoader = imageLoader;
  }

  reset() {
    this.name = '';
    this.id = 0;
    this.obstacles = [];
    this.inventoryItems = [];
    this.flightpath = undefined;
    this.optimalFlightPath = undefined;
  }

  loadMap(map) {
    return new Promise((resolve, reject) => {
      this.reset();
      this.id = map.id;
      this.name = map.name;
      this.flightpath = new FlightPath(this.tileSize, this.id, {x: 1, y: 1}, {x: 1, y: 1});
      map.obstacles.forEach(o => this.addObstacle(o.x, o.y));
      map.inventoryItems.forEach(i => this.addInventoryItem(i.x, i.y));
      resolve();
    });
  }

  exportMap() {
    console.log('Exporting map...');
    let map = {
      id: this.id,
      sizeX: this.gridSize.width,
      sizeY: this.gridSize.height,
      name: this.name,
      obstacles: [],
      inventoryItems: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({x: o.x, y: o.y}));
    this.inventoryItems.forEach((i) => map.inventoryItems.push({x: i.x, y: i.y}));
    console.log(JSON.stringify(map));
  }

  addInventoryItem(x, y) {
    this.inventoryItems.push(new InventoryItem(x, y, this.tileSize, this.imageLoader.loadedImages['box']));
  }

  removeInventoryItem(x, y) {
    for (let i = this.inventoryItems.length - 1; i >= 0; i--) {
      if (this.inventoryItems[i].x === x && this.inventoryItems[i].y === y) {
        this.inventoryItems.splice(i, 1);
      }
    }
  }

  addObstacle(x, y) {
    this.obstacles.push(new Obstacle(x, y, this.tileSize));
  }

  removeObstacle(x, y) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  toggleWaypoint(x, y) {
    if (this.contains('inventoryItem', x, y)) {
      if (!this.contains('waypoint', x, y)) {
        this.flightpath.addWaypoint(x, y);
      } else {
        this.flightpath.removeWaypoint(x, y);
      }
    }
  }

  toggleObstacle(x, y) {
    if (!this.contains('inventoryItem', x, y)) {
      if (!this.contains('obstacle', x, y)) {
        this.addObstacle(x, y);
      } else {
        this.removeObstacle(x, y);
      }
    }
  }

  toggleInventoryItem(x, y) {
    if (!this.contains('obstacle', x, y)) {
      if (!this.contains('inventoryItem', x, y)) {
        this.addInventoryItem(x, y);
      } else {
        this.removeInventoryItem(x, y);
      }
    }
  }

  draw(context) {
    this.grid.draw(context);
    this.flightpath.draw(context);
    this.obstacles.forEach((o) => o.draw(context));
    this.inventoryItems.forEach((i) => i.draw(context));
  }

  contains(type, x, y) {
    if (type === 'obstacle') {
      return this.obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
    } else if (type === 'inventoryItem') {
      return this.inventoryItems.some(item => item.x === x && item.y === y);
    } else if (type === 'waypoint') {
      return this.flightpath.waypoints.some(waypoint => waypoint.x === x && waypoint.y === y);
    }
  }
}
