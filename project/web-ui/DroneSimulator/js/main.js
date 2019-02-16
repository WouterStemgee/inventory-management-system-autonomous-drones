import {Map} from './map.js';

window.onload = () => {
  let canvas = document.getElementById('canvas');
  let map = new Map(canvas);

  window.addEventListener('keydown', (event) => {
    map.keyhandler(event);
  });

  window.addEventListener('mousedown', (event) => {
    if(event.button === 0) {
      console.log('left click');
      map.clickhandler(event);
    }
    else if(event.button === 2) {
      console.log('right click');
    }
  });

  map.start();
};
