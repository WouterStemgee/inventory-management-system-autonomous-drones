import {Drawable} from './drawable.js';

export class Tile extends Drawable {
  constructor(x, y, tileSize) {
    super(x, y, tileSize, tileSize);
    this.tileSize = tileSize;
    this.color = '#686868';
    this.gridX = Math.floor(x / this.tileSize);
    this.gridY = Math.floor(y / this.tileSize);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.tileSize , this.y * this.tileSize, this.tileSize , this.tileSize);
    ctx.strokeRect(this.x * this.tileSize , this.y * this.tileSize, this.tileSize , this.tileSize);
  }
}
