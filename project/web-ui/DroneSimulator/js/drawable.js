export class Drawable {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    throw new Error('Not implemented here!');
  }

  intersects(other) {
    return !(
      this.x + this.width <= other.x ||
      this.y + this.height <= other.y ||
      this.x >= other.x + other.width ||
      this.y >= other.y + other.height
    );
  }
}
