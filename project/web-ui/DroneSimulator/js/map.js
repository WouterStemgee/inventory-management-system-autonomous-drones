import {Drone} from './drone.js';
import {Grid} from './grid.js';

const tile_size = 20;

export class Map {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas;
    this.flyloop = undefined;
    this.reset();
  }

  toggle_flight(){
    if (this.flyloop){
      clearInterval(this.flyloop);
      this.flyloop = undefined;
    }
    else{
      this.start();
    }
  }

  keyhandler(e){
    if (e.keyCode === 37){
      this.drone.dx  = -tile_size;
      this.drone.dy = 0;
    }
    else if (e.keyCode === 38){
      this.drone.dy = -tile_size;
      this.drone.dx = 0;
    }
    else if (e.keyCode === 39){
      this.drone.dx = tile_size;
      this.drone.dy = 0;
    }
    else if (e.keyCode === 40){
      this.drone.dy = tile_size;
      this.drone.dx = 0;
    }
    else if (e.keyCode === 80){
      this.toggle_flight();
    }
    this.drone.move();
  }

  getMousePos(e) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  clickhandler(e) {
    let pos = this.getMousePos(e);
    alert(pos.x + ' ' + pos.y);
  }

  reset(){
    this.drone = new Drone(tile_size/2, tile_size/2, tile_size*2, tile_size*2);
    this.objects = [];
  }

  start(){
    this.grid = new Grid(25, tile_size);
    let ctx = this.canvas.getContext('2d');
    ctx.font = '30px Arial';

    this.flyloop = setInterval(() => {
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
