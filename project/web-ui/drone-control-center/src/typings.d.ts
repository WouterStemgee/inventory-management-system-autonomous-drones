import * as L from 'leaflet';

declare module 'leaflet' {

  namespace control {
    function coordinates(v: any);
  }

  let NumberFormatter: any;

  namespace Control {
    let Coordinates: any;
  }

  function rotateImageLayer(url: any, bounds: any, options: any): RotateImageLayer;

  interface RotateImageLayer extends L.ImageOverlay {
    addTo(map: L.Map): any;
  }

  function simpleGraticule(options: any): SimpleGraticule;

  interface SimpleGraticule extends L.Layer {
    addTo(map: L.Map): any;
  }

  function realtime(src: any, options: any): Realtime;

  interface Realtime {
    on(event: any, fnc: any);

    addTo(map: L.Map): any;

    update(geojson: any);
  }
}
