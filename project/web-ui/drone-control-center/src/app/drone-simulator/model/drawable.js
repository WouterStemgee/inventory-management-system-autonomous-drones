export class Drawable {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
  }

  draw(context) {
    throw new Error('Abstract method not implemented here.');
  }

  intersects(other) {
    return !(
      this.x + 1 <= other.x ||
      this.y + 1 <= other.y ||
      this.x >= other.x + 1 ||
      this.y >= other.y + 1
    );
  }
}
