import {Map} from './map.js';

window.onload = () => {
  let canvas = document.getElementById('canvas');
  let map = new Map(canvas);

  window.addEventListener('keydown', (event) => {
    map.keyhandler(event);
  });

  window.addEventListener('mousedown', (event) => {
      map.clickhandler(event);
  });

  map.start();
};
