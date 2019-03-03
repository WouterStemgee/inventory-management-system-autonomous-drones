import {DrawableImage} from './drawable-image.js';

export class Product extends DrawableImage {
  constructor(x, y, tileSize, loadedImage) {
    super(x, y, tileSize, loadedImage);
    this.name = '';
    this.quantity = 0;
  }
}
