import * as L from 'leaflet';

declare module 'leaflet' {

  function realtime(src: any, options: any): Realtime;

  interface Realtime {
    addTo(map: L.Map): any;
    update(geojson: any);
  }
}
