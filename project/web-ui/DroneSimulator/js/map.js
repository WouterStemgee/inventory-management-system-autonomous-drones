import {Drone} from './drone.js';
import {Grid} from './grid.js';

const tileSize = 20;

export class Map {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas;
    this.simulation = undefined;
    this.reset();
  }

  keyhandler(e){
    if (e.keyCode === 37){
      this.drone.dx  = -tileSize;
      this.drone.dy = 0;
      this.drone.move();
    }
    else if (e.keyCode === 38){
      this.drone.dy = -tileSize;
      this.drone.dx = 0;
      this.drone.move();
    }
    else if (e.keyCode === 39){
      this.drone.dx = tileSize;
      this.drone.dy = 0;
      this.drone.move();
    }
    else if (e.keyCode === 40){
      this.drone.dy = tileSize;
      this.drone.dx = 0;
      this.drone.move();
    }
  }

  getMousePos(e) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    };
  }

  clickhandler(e) {
    let pos = this.getMousePos(e);
    if (pos.x >= 0 && pos.y >= 0 && pos.x <= this.canvas.width && pos.y <= this.canvas.height) {
      let gridX = Math.floor(pos.x / tileSize);
      let gridY = Math.floor(pos.y / tileSize);
      console.log('[Mouse Click] X: ' + gridX + ', Y: ' + gridY);
      this.grid.tiles[gridX][gridY].color = '#699868';
    }
  }

  reset() {
    this.drone = new Drone(tileSize/2, tileSize/2, tileSize*2, tileSize*2);
    this.objects = [];
  }

  start() {
    this.grid = new Grid(25, tileSize);
    let ctx = this.canvas.getContext('2d');

    this.simulation = setInterval(() => {
      this.grid.draw(ctx);
      this.drone.draw(ctx);

      for(let o of this.objects){
        o.draw(ctx);
      }

      for(let o of this.objects) {
        let intersects = this.drone.intersects(o);
        if (intersects) {

        }
        o.tick(this);
      }
      if (this.drone.x < 0 ||
        this.drone.x > this.width - this.drone.width ||
        this.drone.y < 0 ||
        this.drone.y > this.height  - this.drone.height){
        this.reset();
      }

    }, 50);
  }
}
