import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {GeoJSON} from 'leaflet';

import 'leaflet-realtime';
import 'leaflet-rotatedmarker';
import '../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
import './plugins/L.SimpleGraticule';
import {circleToPolygon} from 'circle-to-polygon';
import {HttpService} from '../http.service';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {

  constructor(private http: HttpService, public simulator: DroneSimulatorService) {
  }

  minZoom = -5;
  maxZoom = -1;
  zoom = -5;
  img = {width: 30190, height: 10901.944444};

  droneRadius = 1000;

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

  livedataLayer = new L.FeatureGroup();
  editableLayers = new L.FeatureGroup();

  gridOptions = {
    interval: 2500,
    showshowOriginLabel: true,
    redraw: 'move'
  };

  gridLayer = L.simpleGraticule(this.gridOptions);

  drawOptions = {
    edit: {
      featureGroup: this.editableLayers
    },
    position: 'topleft',
    draw: {
      polyline: {
        shapeOptions: {
          color: '#4286f4'
        }
      },
      rectangle: {
        shapeOptions: {
          color: '#a80a0a'
        }
      },
      polygon: false,
      circle: true,
      marker: false,
      circlemarker: false
    }
  };

  layersControl = {
    baseLayers: {
      'Map Image': this.mapImageLayer
    },
    overlays: {
      'Editable layer': this.editableLayers,
      'Live Data layer': this.livedataLayer,
      'Grid layer': this.gridLayer
    },
    collapsed: true
  };

  // TODO: converteer dit naar een plugin en gebruik dit dan ook voor de base map => zoom-animated transform-origin=center zetten
  RotateImageLayer = L.ImageOverlay.extend({
    _animateZoom: function (e) {
      L.ImageOverlay.prototype._animateZoom.call(this, e);
      var img = this._image;
      img.style[L.DomUtil.TRANSFORM + 'Origin'] = 'center';
      img.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.rotation + 'deg)';
    },
    _reset: function () {
      L.ImageOverlay.prototype._reset.call(this);
      var img = this._image;
      img.style[L.DomUtil.TRANSFORM + 'Origin'] = 'center';
      img.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.rotation + 'deg)';
    }
  });

  onMapReady(map: L.Map) {
    L.DomUtil.addClass(map.getContainer(), 'crosshair-cursor-enabled');
    map.addLayer(this.editableLayers);
    map.addLayer(this.livedataLayer);
    // map.addLayer(new L.LayerGroup([this.gridLayer]));

    L.Control.Coordinates.include({
      _update(evt) {
        const pos = evt.latlng;
        const opts = this.options;
        if (pos) {
          this._currentPos = pos;
          this._inputY.value = L.NumberFormatter.round(pos.lat, opts.decimals, opts.decimalSeperator);
          this._inputX.value = L.NumberFormatter.round(pos.lng, opts.decimals, opts.decimalSeperator);
          this._label.innerHTML = this._createCoordinateLabel(pos);
        }
      }
    });

    const rotateImageLayer = (url, bounds, options) => {
      return new this.RotateImageLayer(url, bounds, options);
    };

    map.on('zoomstart', (e) => {
    });


    L.control.coordinates({
      position: 'bottomright',
      decimals: 0,
      decimalSeperator: '.',
      labelTemplateLat: 'Y: {y}',
      labelTemplateLng: 'X: {x}',
      enableUserInput: false,
    }).addTo(map);

    const realtime = L.realtime(
      undefined, {
        start: false,
        container: this.livedataLayer,
        getFeatureId(f) {
          return f.properties.id;
        },
        pointToLayer(feature, position) {
          return rotateImageLayer('assets/images/leaflet/drone-large.png', [[position.lat - 500, position.lng - 500], [position.lat + 500, position.lng + 500]], {
            interactive: true,
            animate: false,
            rotation: feature.properties.orientation
          }).bindPopup(
            '<p>X: ' + feature.geometry.coordinates[0] + '<br />' +
            '<p>Y: ' + feature.geometry.coordinates[1] + '<br />' +
            '<p>Z: ' + feature.geometry.coordinates[2] + '<br />' +
            '<p>Yaw: ' + feature.properties.orientation + '<br />'
          );
        },
        onEachFeature(f, l) {
          console.log(f);
        },
        updateFeature(f, oldLayer, newLayer) {
          if (!oldLayer) {
            return;
          }
          return newLayer;
        }
      }
    ).addTo(map);

    const connection = new WebSocket('ws://localhost:3000/red/ws/data', ['soap', 'xmpp']);

    // Log errors
    connection.onerror = (err) => {
      console.log('WebSocket Error ' + err);
    };

    // Log messages from the server
    connection.onmessage = (e) => {
      const data = JSON.parse(e.data);
      for (let i = 0; i < data.features.length; i++) {
        realtime.update(data.features[i]);
      }
    };

    realtime.on('update', (e) => {
      // console.log('Realtime update event');
    });
  }

  onDrawReady(drawControl: L.Control.Draw) {

  }

  setFlightPath(geoJSON) {
    let coords = geoJSON.geometry.coordinates;
    let waypoints = [];
    coords.forEach(c => {
      waypoints.push({
        x: Math.floor(c[0]),
        y: Math.floor(c[1])
      });
    });
    console.log(waypoints);
    this.simulator.map.flightpath.waypoints = waypoints;
  }

  flightpathLayerId;

  drawObstacles() {
    let maps;
    let obstacles = [];
    this.http.getAllMaps().then((res) => {
      maps = res;
      obstacles = maps[0].obstacles;
      console.log('Obstacles:', obstacles);
      obstacles.forEach(o => {
        console.log('obstacle: ', o);
        console.log(o.positions[0], o.positions[1]);
      });
    });
  }

  onDrawCreated(e) {
    if (e.layer.toGeoJSON().geometry.type === 'LineString') {
      this.flightpathLayerId = e.layer._leaflet_id;
      this.setFlightPath(e.layer.toGeoJSON());
    }
    e.layer.on('click', () => {
      const geoJSON = e.layer.toGeoJSON();
      console.log(JSON.stringify(geoJSON));
    });
  }

  ngOnInit() {
    this.drawObstacles();
  }

  onDrawStart(e) {
    if (e.layerType === 'polyline') {
      if (this.flightpathLayerId) {
        this.editableLayers.removeLayer(this.flightpathLayerId);
        this.simulator.map.flightpath.waypoints = [];
      }
    }
  }

  onDrawEdited(e) {
    if (this.flightpathLayerId) {
      let layer = this.editableLayers.getLayer(this.flightpathLayerId) as GeoJSON;
      this.setFlightPath(layer.toGeoJSON());
    }
  }

  onLeafletClick(e) {
    const coord = e.latlng;
    // console.log('X:' + coord.lng + '\nY:' + coord.lat);
  }
}
