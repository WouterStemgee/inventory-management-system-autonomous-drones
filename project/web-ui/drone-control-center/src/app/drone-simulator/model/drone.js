import {DrawableImage} from './image.js';

export class Drone extends DrawableImage {
  constructor(x, y, tileSize, gridSize, imageLoader) {
    super(x, y, tileSize, imageLoader.loadedImages['drone']);
    this.gridSize = gridSize;
    this.dx = 0;
    this.dy = 0;
  }

  draw(context) {
    context.drawImage(this.loadedImage, this.x * this.tileSize - (this.tileSize / 2), this.y * this.tileSize - (this.tileSize / 2), this.tileSize * 2, this.tileSize * 2);
  }

  fly(flightpath) {
    // TODO
  }

  move(direction) {
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
          this.dx = -1;
          this.dy = 0;
          this.flyDiff();
        }
        break;
    }
  }

  moveTo(x, y) {
    if (x > 0 && y > 0 && y < this.gridSize.height - 1 && x < this.gridSize.width - 1) {
      this.x = x;
      this.y = y;
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
