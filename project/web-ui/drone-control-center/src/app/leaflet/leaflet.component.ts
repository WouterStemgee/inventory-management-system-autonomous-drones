import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import 'leaflet-realtime';
import 'leaflet-rotatedmarker';
import '../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
import './plugins/L.SimpleGraticule';
import './plugins/L.RotateImageLayer';
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

  realtime = L.realtime(
    undefined, {
      start: false,
      container: this.livedataLayer,
      getFeatureId(f) {
        return f.properties.id;
      },
      pointToLayer(feature, position) {
        return L.rotateImageLayer('assets/images/leaflet/drone-large.png',
          [
            [position.lat - feature.properties.radius / 2, position.lng - feature.properties.radius / 2],
            [position.lat + feature.properties.radius / 2, position.lng + feature.properties.radius / 2]
          ],
          {
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
        // console.log(f);
      },
      updateFeature(f, oldLayer, newLayer) {
        if (!oldLayer) {
          return;
        }
        return newLayer;
      }
    }
  );

  onMapReady(map: L.Map) {
    L.DomUtil.addClass(map.getContainer(), 'crosshair-cursor-enabled');
    map.addLayer(new L.LayerGroup([this.gridLayer]));
    map.addLayer(this.editableLayers);
    map.addLayer(this.livedataLayer);

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

    L.control.coordinates({
      position: 'bottomright',
      decimals: 0,
      decimalSeperator: '.',
      labelTemplateLat: 'Y: {y}',
      labelTemplateLng: 'X: {x}',
      enableUserInput: false,
    }).addTo(map);

    const connection = new WebSocket('ws://localhost:3000/red/ws/data', ['soap', 'xmpp']);

    connection.onerror = (err) => {
      console.log('WebSocket Error ' + err);
    };

    connection.onmessage = (e) => {
      const data = JSON.parse(e.data);
      for (let i = 0; i < data.features.length; i++) {
        this.realtime.update(data.features[i]);
        this.updateDroneData(data.features[i]);
      }
    };
    this.realtime.addTo(map);
  }

  onDrawReady(drawControl: L.Control.Draw) {

  }

  setFlightPath(geoJSON) {
    const coords = geoJSON.geometry.coordinates;
    const waypoints = [];
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
    const obstacles = this.simulator.map.obstacles;

    obstacles.forEach(o => {
      const p1 = o.positions[0];
      const p2 = o.positions[1];

      const x1 = p1.x;
      const y1 = p1.y;
      const x2 = p2.x;
      const y2 = p2.y;

      const feature = L.geoJSON({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]]]
        } as geojson.Polygon
      } as geojson.Feature);

      feature.eachLayer(l => {
        const layer = l as L.GeoJSON;
        const rect = L.rectangle(layer.getBounds());
        rect.setStyle({
          color: '#a80a0a',
          stroke: true,
          weight: 4,
          opacity: 0.5,
          fill: true,
          fillColor: null,
          fillOpacity: 0.2,
        });
        rect.on('click', () => {
          console.log(JSON.stringify(layer.toGeoJSON()));
        });
        rect.addTo(this.editableLayers);
      });
    });
  }

  drawScanZones() {
    const scanzones = this.simulator.map.scanzones;
    scanzones.forEach(sz => {
      const m = sz.position;

      const x1 = m.x;
      const y1 = m.y;

      const r = sz.range;

      const feature = L.geoJSON({
        type: 'Feature',
        properties: {
          range: sz.range
        },
        geometry: {
          type: 'Point',
          coordinates: [x1, y1]
        } as geojson.Point
      } as geojson.Feature);

      feature.eachLayer(l => {
        const layer = l as L.GeoJSON;
        const circle = L.circle([y1, x1], {
          radius: r
        });
        circle.setStyle({
          stroke: true,
          color: '#3388ff',
          weight: 4,
          opacity: 0.5,
          fill: true,
          fillColor: null,
          fillOpacity: 0.2,
        });
        circle.on('click', () => {
          console.log(JSON.stringify(layer.toGeoJSON()));
        });
        circle.addTo(this.editableLayers);
      });
    });

  }

  onDrawCreated(e) {
    if (e.layer.toGeoJSON().geometry.type === 'LineString') { // flightpath
      this.flightpathLayerId = e.layer._leaflet_id;
      this.setFlightPath(e.layer.toGeoJSON());
      this.simulator.validateFlightPath();
    } else if (e.layer.toGeoJSON().geometry.type === 'Polygon') { // obstacle
      const coordinates = e.layer.toGeoJSON().geometry.coordinates[0];
      const p1 = coordinates[0];
      const p2 = coordinates[2];
      const positions = [{x: p1[0], y: p1[1]}, {x: p2[0], y: p2[1]}];
      this.simulator.map.addObstacle(positions);
      this.simulator.updateMap(false);
    } else if (e.layer.toGeoJSON().geometry.type === 'Point') { // scanzone
      const coordinate = e.layer.toGeoJSON().geometry.coordinates;
      const position = {x: coordinate[0], y: coordinate[1]};
      this.simulator.map.addScanZone(e.layer._leaflet_id.toString(), position.x, position.y, 0, e.layer._mRadius);
      this.simulator.updateMap(false);
    }
    e.layer.on('click', () => {
      const geoJSON = e.layer.toGeoJSON();
      console.log(JSON.stringify(geoJSON));
    });
  }

  ngOnInit() {
    if (this.simulator.loaded) {
      this.drawObstacles();
      this.drawScanZones();
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.drawObstacles();
          this.drawScanZones();
        }
      });
    }
  }

  onDrawStart(e) {
    if (e.layerType === 'polyline') {
      if (this.flightpathLayerId) {
        this.editableLayers.removeLayer(this.flightpathLayerId);
        this.simulator.map.flightpath.waypoints = [];
      }
    }
  }

  editingLayers;

  onDrawEdited(e) {
    console.log('editingLayers:', this.editingLayers);

    if (this.flightpathLayerId) {
      const layer = this.editableLayers.getLayer(this.flightpathLayerId) as L.GeoJSON;
      this.setFlightPath(layer.toGeoJSON());

    }
    const editedLayers = e.layers._layers;
    console.log('editedLayers:', editedLayers);

    Object.keys(editedLayers).forEach(id => {
      const oldLayer = JSON.parse(this.editingLayers[id]);
      const newLayer = editedLayers;
      console.log('oldLayer:', oldLayer);
      console.log('newLayer:', newLayer);

      if (oldLayer._bounds) { // obstacle
        const bounds = oldLayer._bounds;
        const p1 = bounds._southWest;
        const p2 = bounds._northEast;
        const x1 = p1.lng;
        const y1 = p1.lat;
        const x2 = p2.lng;
        const y2 = p2.lat;
        const oldPositions = [{x: x1, y: y1}, {x: x2, y: y2}];
        this.simulator.map.removeObstacle(oldPositions);
        // const newPositions;

      } else if (oldLayer._latlng) { // scanzone
        const p = oldLayer._latlng;
        const x1 = p.lng;
        const y1 = p.lat;
        const r = oldLayer._mRadius;
        this.simulator.map.removeScanZone(x1, y1);
      }
    });

    this.simulator.updateMap();

  }

  oDrawEditStart(e) {
    this.editingLayers = JSON.stringify(e.target._layer);
    console.log(this.editingLayers);
  }


  onLeafletClick(e) {
    const coord = e.latlng;
    // console.log('X:' + coord.lng + '\nY:' + coord.lat);
  }

  updateDroneData(feature) {
    const drone = this.simulator.drone;
    console.log(feature);
    drone.position.x = feature.properties.position.x;
    drone.position.y = feature.properties.position.y;
    drone.position.z = feature.properties.position.z;
    drone.radius = feature.properties.radius;
    console.log(drone);
  }

  onDrawDeleted(e) {
    const layers = e.layers._layers;
    Object.keys(layers).forEach(id => {
      const layer = layers[id];
      if (layer._bounds) { // obstacle
        const bounds = layer._bounds;
        const p1 = bounds._southWest;
        const p2 = bounds._northEast;
        const x1 = p1.lng;
        const y1 = p1.lat;
        const x2 = p2.lng;
        const y2 = p2.lat;
        const positions = [{x: x1, y: y1}, {x: x2, y: y2}];
        this.simulator.map.removeObstacle(positions);
      } else if (layer._latlng) { // scanzone
        const p = layer._latlng;
        const x1 = p.lng;
        const y1 = p.lat;
        const r = layer._mRadius;
        this.simulator.map.removeScanZone(x1, y1);
      }
    });
    this.simulator.updateMap();
  }
}
