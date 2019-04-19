import * as L from 'leaflet';

declare module 'leaflet' {

  namespace control {
    function coordinates(v: any);
    function polylineMeasure(options: any);
  }

  let NumberFormatter: any;

  namespace Control {
    let Coordinates: any;
    let PolylineMeasure: any;
  }

  interface Layer {
    _leaflet_id: any;
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
    getBounds(): any;

    on(event: any, fnc: any);

    addTo(map: L.Map): any;

    update(geojson: any);
  }

  function heatLayer(latlngs: any, options: any): HeatLayer;

  interface HeatLayer extends L.Layer {
    addTo(map: L.Map): any;
    addLatLng(latlng: any): any;
    redraw();
  }
}
