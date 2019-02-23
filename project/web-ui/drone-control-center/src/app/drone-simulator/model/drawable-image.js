import {Drawable} from './drawable.js';

export class DrawableImage extends Drawable {
  constructor(x, y, tileSize, loadedImage) {
    super(x, y, tileSize);
    this.loadedImage = loadedImage;
  }

  draw(context) {
      context.drawImage(this.loadedImage, this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
  }

  intersects(other) {
    return this.intersects(other);
  }
}
