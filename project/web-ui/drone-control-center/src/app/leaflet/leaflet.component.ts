import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import 'leaflet-realtime';
import 'leaflet-rotatedmarker';
import '../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
import './plugins/L.SimpleGraticule';
import './plugins/L.RotateImageLayer';
import {circleToPolygon} from '../../../node_modules/circle-to-polygon';

import {HttpService} from '../http.service';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';


@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {

  @Input() height;

  constructor(private http: HttpService, public simulator: DroneSimulatorService) {

  }

  show = false;

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
          });
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

    setTimeout(() => {
      map.invalidateSize();
    }, 0);

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
      console.log('WebSocket - update received');
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

  checkScanZoneOverlap(flightpath) {
    const poly1 = flightpath;
    const poly2 = flightpath;
    // const overlapping = overlaps(poly1, poly2);
    // console.log(overlapping);
  }

  setFlightPath(geoJSON) {
    const coords = geoJSON.geometry.coordinates;
    const dronePosition = this.simulator.drone.position;
    const startPosition = {x: dronePosition.x, y: dronePosition.y};
    // const waypoints = [startPosition];
    const waypoints = [];
    coords.forEach(c => {
      waypoints.push({
        x: Math.floor(c[0]),
        y: Math.floor(c[1])
      });
    });
    console.log(waypoints);
    this.simulator.map.flightpath.waypoints = waypoints;
    this.checkScanZoneOverlap(geoJSON);
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
    } else if (e.layer.toGeoJSON().geometry.type === 'Polygon') { // obstacle
      const coordinates = e.layer.toGeoJSON().geometry.coordinates[0];
      const p1 = coordinates[0];
      const p2 = coordinates[2];
      const positions = [{x: p1[0], y: p1[1]}, {x: p2[0], y: p2[1]}];
      this.simulator.map.addObstacle(positions);
    } else if (e.layer.toGeoJSON().geometry.type === 'Point') { // scanzone
      const coordinate = e.layer.toGeoJSON().geometry.coordinates;
      const position = {x: coordinate[0], y: coordinate[1]};
      this.simulator.map.addScanZone(e.layer._leaflet_id.toString(), position.x, position.y, 0, e.layer._mRadius);
    }
    e.layer.on('click', () => {
      const geoJSON = e.layer.toGeoJSON();
      console.log(JSON.stringify(geoJSON));
    });
    this.simulator.updateMap(false);
  }

  ngOnInit() {
    this.show = true;

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

  editingLayers = [];

  onDrawEdited(e) {
    if (this.flightpathLayerId) {
      const layer = this.editableLayers.getLayer(this.flightpathLayerId) as L.GeoJSON;
      this.setFlightPath(layer.toGeoJSON());
    }

    Object.keys(e.layers._layers).forEach(id => {
      const newLayer = e.layers._layers[id];
      const oldLayer = this.editingLayers.find((layer, index) => {
        return layer.id === newLayer._leaflet_id;
      });

      if (oldLayer.bounds) { // obstacle
        const bounds = oldLayer.bounds;
        const p1 = bounds._southWest;
        const p2 = bounds._northEast;
        const x1 = p1.lng;
        const y1 = p1.lat;
        const x2 = p2.lng;
        const y2 = p2.lat;
        const oldPositions = [{x: x1, y: y1}, {x: x2, y: y2}];

        this.simulator.map.removeObstacle(oldPositions);

        const newBounds = newLayer._bounds;
        const newP1 = newBounds._southWest;
        const newP2 = newBounds._northEast;
        const newX1 = newP1.lng;
        const newY1 = newP1.lat;
        const newX2 = newP2.lng;
        const newY2 = newP2.lat;
        const newPositions = [{x: newX1, y: newY1}, {x: newX2, y: newY2}];

        this.simulator.map.addObstacle(newPositions);
      } else if (oldLayer.position) { // scanzone
        const p = oldLayer.position;
        const x1 = p.lng;
        const y1 = p.lat;

        this.simulator.map.removeScanZone(x1, y1);

        const newP = newLayer._latlng;
        const newX1 = newP.lng;
        const newY1 = newP.lat;
        const newR = newLayer._mRadius;

        this.simulator.map.addScanZone('scanzone', newX1, newY1, 0, newR);
      }
    });

    this.simulator.updateMap();
  }

  oDrawEditStart(e) {
    const layers = [];
    Object.keys(e.target._layers).forEach(id => {
      if (e.target._layers[id]._bounds) {
        layers.push({
          id: e.target._layers[id]._leaflet_id,
          bounds: e.target._layers[id]._bounds
        });
      } else if (e.target._layers[id]._mRadius) {
        layers.push({
          id: e.target._layers[id]._leaflet_id,
          position: e.target._layers[id]._latlng,
          range: e.target._layers[id]._mRadius
        });
      }
    });
    this.editingLayers = layers;
  }


  onLeafletClick(e) {
    const coord = e.latlng;
  }

  updateDroneData(feature) {
    const drone = this.simulator.drone;
    drone.position.x = feature.properties.position ? feature.properties.position.x : 0;
    drone.position.y = feature.properties.position ? feature.properties.position.y : 0;
    drone.position.z = feature.properties.position ? feature.properties.position.z : 0;
    drone.yaw = feature.properties.orientation;
    drone.pitch = feature.properties.pitch;
    drone.roll = feature.properties.roll;
    drone.radius = feature.properties.radius;
    drone.battery = feature.properties.battery;
    drone.speed = feature.properties.speed;
    drone.acceleration = feature.properties.acceleration;
  }

  onDrawDeleted(e) {
    console.log(e);
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
      if (layer._latlngs) { // flightpath
        this.simulator.map.flightpath.waypoints = [];
      }
    });
    this.simulator.updateMap();
  }
}
