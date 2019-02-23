import {Drawable} from './drawable.js';

export class Tile extends Drawable {
  constructor(x, y, tileSize, color = '#686868') {
    super(x, y, tileSize);
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
    context.strokeRect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
  }
}
