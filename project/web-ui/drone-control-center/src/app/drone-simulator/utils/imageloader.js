export class ImageLoader {

  constructor() {
    this.images = ['drone', 'box', 'landing', 'takeoff'];
    this.loadedImages = {};
  }

  loadImages() {
    return new Promise((resolve, reject) => {
      let imagePromises = this.images.map((filename) => {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.src = 'assets/images/simulator/' + filename + '.png';
          img.addEventListener('load', () => {
            this.loadedImages[filename] = img;
            resolve(filename, img);
          });
          img.addEventListener('error', (error) => {
            reject(error);
          });
        });
      });
      Promise.all(imagePromises).then(() => {
        resolve();
      });
    });
  }
}
