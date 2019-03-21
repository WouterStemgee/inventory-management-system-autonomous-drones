import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {

  constructor() {
  }
  mapSizeX = 30190;
  mapSizeY = 10901.944444;

  minZoom = -5;
  maxZoom = -1;
  zoom = -5;
  img = {width: this.mapSizeX, height: this.mapSizeY};

  MySimple = L.Util.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0)
  });

  yx = L.latLng;
  xy = (x, y) => {
    if (L.Util.isArray(x)) { // xy([x, y]);
      return this.yx(x[1], x[0]);
    }
    return this.yx(y, x); // xy(x, y);
  };

  bounds = L.latLngBounds([
    this.xy(-351.0465117, -468.0620156), // top-left corner
    this.xy(this.img.width + 468.0620156, this.img.height + 643.5852714)  // bottom-right corner
  ]);

  maxBounds = L.latLngBounds([
    this.xy(-this.img.width / 2, -this.img.height / 2),   // top-left corner
    this.xy(this.img.width * 1.5, this.img.height * 1.5)  // bottom-right corner
  ]);

  options = {
    layers: [
      L.imageOverlay('assets/images/leaflet/IIoT.png', this.bounds)
    ],
    crs: this.MySimple,
    center: [0, 0],
    zoom: this.zoom,
    minZoom: this.minZoom,
    maxZoom: this.maxZoom,
    maxBounds: this.maxBounds,
    attributionControl: false
  };

  onMapReady(map: L.Map) {

    map.on('click',  (event) =>  {
      const coord = event.latlng;
      console.log('X:' + coord.lng + '\nY:' + coord.lat);
      // var marker = L.marker(coord).addTo(layerBounds);
      // marker.bindPopup(coord.toString() + "<br>x: " + coord.lng + "<br>y: " + coord.lat).openPopup()
    });

    L.DomUtil.addClass(map.getContainer(), 'crosshair-cursor-enabled');

  }

  ngOnInit() {
  }

}
