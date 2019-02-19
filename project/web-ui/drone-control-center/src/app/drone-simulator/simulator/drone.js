import { DrawableImage } from './drawable-image.js';

export class Drone extends DrawableImage {
  constructor(x, y, tileSize, gridSize) {
    super(x, y, tileSize, 'assets/images/simulator/drone.png');
    this.gridSize = gridSize;
    this.dx = 0;
    this.dy = 0;
  }

  draw(context) {
    if (this.image_loaded) {
        context.drawImage(this.img, this.x * this.tileSize - (this.tileSize / 2), this.y * this.tileSize - (this.tileSize / 2), this.tileSize *2, this.tileSize*2);
    } else {
      this.img.onload = () => {
        this.image_loaded = true;
        context.drawImage(this.img, this.x * this.tileSize, this.y * this.tileSize);
      };
      this.img.src = this.imagefile;
    }
  }

  fly(flightpath) {
    // TODO
  }

  move(direction){
    switch (direction) {
      case 'north':
        if (this.y < this.gridSize.height - 1) {
          this.dx = 0;
          this.dy = 1;
          this.flyDiff();
        }
        break;
      case 'south':
        if (this.y > 0) {
          this.dx = 0;
          this.dy = -1;
          this.flyDiff();
        }
        break;
      case 'east':
        if (this.x < this.gridSize.width - 1) {
          this.dx = 1;
          this.dy = 0;
          this.flyDiff();
        }
        break;
      case 'west':
        if (this.x > 0) {
          this.dx  = -1;
          this.dy = 0;
          this.flyDiff();
        }
        break;
    }
  }

  flyDiff() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reset() {
    this.x = 1;
    this.y = 1;
  }
}
