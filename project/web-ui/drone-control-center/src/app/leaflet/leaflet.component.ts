import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

import '../../../node_modules/leaflet-realtime/dist/leaflet-realtime.js';

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

  mapImageLayer = L.imageOverlay('assets/images/leaflet/IIoT.png', this.bounds);

  options = {
    layers: this.mapImageLayer,
    crs: this.MySimple,
    center: [0, 0],
    zoom: this.zoom,
    minZoom: this.minZoom,
    maxZoom: this.maxZoom,
    maxBounds: this.maxBounds,
    attributionControl: false
  };

  drawOptions = {
    position: 'topleft',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/images/leaflet/marker-icon.png',
          shadowUrl: 'assets/images/leaflet/marker-shadow.png'
        })
      },
      polyline: true,
      circle: {
        shapeOptions: {
          color: '#aaaaaa'
        }
      }
    }
  };

  layersControl = {
    baseLayers: {
      'Map Image': this.mapImageLayer
    },
    overlays: {
      'Scan Zones': L.circle([46.95, -122], {radius: 5000}),
      'Obstacles': L.rectangle([[46.8, 122], [4600.9, 1000.55]]),
      'Drone': L.svg()
    },
    collapsed: false
  };

  droneIcon = L.Icon.extend({
    options: {
      iconUrl: './images/drone-large.png',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24]
    }
  });

  rt;

  onMapReady(map: L.Map) {
    L.DomUtil.addClass(map.getContainer(), 'crosshair-cursor-enabled');
    this.rt = L.realtime(
      undefined, {
        start: false,
        getFeatureId(f) {
          return f.properties.id;
        },
        pointToLayer(feature, position) {
          return L.marker(position, {
            icon: this.droneIcon,
            draggable: true
          }).bindPopup(
            '<p>X: ' + feature.geometry.coordinates[0] + '<br />' +
            '<p>Y: ' + feature.geometry.coordinates[1] + '<br />' +
            '<p>Z: ' + feature.geometry.coordinates[2] + '<br />' +
            '<p>Yaw: ' + feature.properties.orientation + '<br />'
          );
        },
        updateFeature(feature, oldLayer, newLayer) {
          if (!newLayer) {
            return;
          }
          // update properties
          newLayer.setRotationAngle(feature.properties.orientation);
          return L.Realtime.prototype.options.updateFeature(feature, oldLayer);
        }

      }
    ).addTo(map);

    const connection = new WebSocket('ws://localhost:3000/red/ws/data', ['soap', 'xmpp']);
    // Log errors
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      var myData = JSON.parse(e.data);
      for (let i = 0; i < myData.features.length; i++) {
        this.rt.update(myData.features[i]);
      }
    };
  }

  onDrawReady(drawControl: L.Control.Draw) {
    console.log('Drawings are loaded');
  }

  ngOnInit() {

  }

}
