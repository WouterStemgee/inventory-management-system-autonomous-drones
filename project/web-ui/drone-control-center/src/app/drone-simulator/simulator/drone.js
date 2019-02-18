import {Drawable} from './drawable.js';

export class Drone extends Drawable {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.dx = 0;
    this.dy = 0;
    this.imagefile = 'assets/images/simulator/drone.png';
    this.image_loaded = false;
    this.img = new Image();
    this.img.onload = () => {
      this.image_loaded = true;
    };
    this.img.src = this.imagefile;
  }

  draw(ctx) {
    if (this.image_loaded) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      this.img.onload = () => {
        this.image_loaded = true;
        ctx.drawImage(this.img, this.x, this.y);
      };
      this.img.src = this.imagefile;
    }
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;
  }

  intersects(other) {
    return this.intersects(other);
  }
}
