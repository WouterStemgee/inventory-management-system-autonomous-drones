import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import 'leaflet-realtime';
import 'leaflet-rotatedmarker';
import '../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
import 'node_modules/leaflet.heat/dist/leaflet-heat.js';

import './plugins/L.SimpleGraticule';
import './plugins/L.RotateImageLayer';
import './plugins/leaflet.draw-src';
import {circleToPolygon} from '../../../node_modules/circle-to-polygon';

import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {

  @Input() height;

  constructor(public auth: AuthenticationService, public simulator: DroneSimulatorService) {
    simulator.onFlightpathValidatedEvent.subscribe((valid) => {
        if (valid) {
          this.drawValidFlightpath();
        }
      }
    );

    simulator.onStopEvent.subscribe((stop) => {
      const layer = this.editableLayers.getLayer(this.flightpathLayerId);
      if (layer) {
        this.editableLayers.removeLayer(layer);
      }
      this.simulator.map.flightpath.waypoints = [];
      this.scanlocationLayer.clearLayers();
    });
  }

  collisionCounter = 0;
  frameCounter = 0;

  show = false;

  map;
  drawControl;

  followDrone = false;

  minZoom = -5;
  maxZoom = -2;
  zoom = -5;
  img = {width: this.simulator.map.size.width, height: this.simulator.map.size.height};

  heatPoints = [];

  editingLayers = [];

  flightpathLayerId;

  batteryWarning = false;
  batteryAbort = false;

  MySimple = L.Util.extend({}, L.CRS.Simple, {
    projection: L.Util.extend(L.Projection.LonLat, {
      bounds: L.bounds([0, 0], [this.img.width, this.img.height])
    }),
    transformation: new L.Transformation(1, 0, 1, 0),
    scale: (zoom) => {
      return Math.pow(2, zoom);
    },
    infinite: false
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
    center: [this.img.height / 2, this.img.width / 2],
    zoom: this.zoom,
    minZoom: this.minZoom,
    maxZoom: this.maxZoom,
    maxBounds: this.maxBounds,
    attributionControl: false
  };

  livedataLayer = new L.FeatureGroup();
  editableLayers = new L.FeatureGroup();
  scanlocationLayer = new L.FeatureGroup();

  gridOptions = {
    interval: 2500,
    showshowOriginLabel: true,
    redraw: 'move'
  };

  gridLayer = L.simpleGraticule(this.gridOptions);

  heatLayer = L.heatLayer(this.heatPoints, {
    radius: 10
  });


  drawOptions = {
    edit: {
      featureGroup: this.editableLayers
    },
    position: 'bottomleft',
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
    overlays: {
      'Editable layer': this.editableLayers,
      'Heat layer': this.heatLayer,
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
        if (position.lat !== undefined) {
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
        }
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

  customControl = L.Control.extend({

    options: {
      position: 'bottomleft'
    },

    onAdd(map) {
      const container = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');

      container.style.backgroundColor = '#b71c1c';
      container.style.backgroundImage = 'url(assets/images/leaflet/drone-small.png)';
      container.style.backgroundSize = '28px 28px';
      container.style.width = '32px';
      container.style.height = '32px';

      return container;
    }
  });

  onMapReady(map: L.Map) {
    this.map = map;

    const droneFollowControl = new this.customControl();
    map.addControl(droneFollowControl);

    droneFollowControl.getContainer().onclick = () => {
      if (this.followDrone) {
        this.followDrone = false;
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        map.addControl(map.zoomControl);
        if (this.auth.isAdmin()) {
          map.addControl(this.drawControl);
        }
        droneFollowControl.getContainer().style.backgroundColor = '#b71c1c';
      } else {
        this.followDrone = true;
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        map.removeControl(map.zoomControl);
        if (this.auth.isAdmin()) {
          map.removeControl(this.drawControl);
        }
        droneFollowControl.getContainer().style.backgroundColor = 'white';
      }
      const msg = this.followDrone ? 'enabled' : 'disabled';
      this.simulator.onAlertEvent.emit({title: 'Drone Control Center', message: 'Follow drone ' + msg, type: 'info'});
    };

    L.DomUtil.addClass(map.getContainer(), 'crosshair-cursor-enabled');

    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    map.addLayer(new L.LayerGroup([this.gridLayer]));
    // map.addLayer(this.heatLayer);
    map.addLayer(this.scanlocationLayer);
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

    this.simulator.onDataUpdateEvent.subscribe((e) => {
      const data = JSON.parse(e.data);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.features.length; i++) {
        this.realtime.update(data.features[i]);
        this.updateDroneData(data.features[i]);
      }
    });

    this.realtime.on('update', () => {
      if (this.followDrone) {
        if (this.frameCounter >= 100) {
          map.fitBounds(this.realtime.getBounds(), {maxZoom: this.zoom});
          this.frameCounter = 0;
        } else {
          this.frameCounter++;
        }
      }
    });

    this.realtime.addTo(map);
  }

  onDrawReady(drawControl: L.Control.Draw) {
    this.drawControl = drawControl;
    if (!this.auth.isAdmin()) {
      this.map.removeControl(drawControl);
    }
  }

  /*
  checkScanZoneOverlap(waypoints) {
    const scanzones = this.simulator.map.scanzones;
    scanzones.forEach(sz => {
      const x1 = sz.position.x;
      const y1 = sz.position.y;
      waypoints.forEach((coord, index) => {
        const x2 = coord.x;
        const y2 = coord.y;
        const a = x1 - x2;
        const b = y1 - y2;
        const dist = Math.sqrt(a * a + b * b);
        if (dist <= sz.range && sz.range >= this.simulator.drone.radius) {
          waypoints[index].z = Math.round(sz.position.z);
          waypoints[index].scan = true;
          waypoints[index].orientation = sz.orientation;
          waypoints[index].x = Math.round(x1);
          waypoints[index].y = Math.round(y1);
          waypoints[index].scanzone = sz;
        }
      });
    });
    return waypoints;
  }
   */

  drawValidFlightpath() {
    this.scanlocationLayer.clearLayers();
    const wp = this.simulator.map.flightpath.waypoints;
    // wp = this.checkScanZoneOverlap(wp);
    wp.forEach(w => {
      if (!w.scan) {
        w.z = this.simulator.drone.defaultFlyAltitude;
        w.scan = false;
      } else {
        L.marker(this.xy(Math.round(w.x), Math.round(w.y))).addTo(this.scanlocationLayer);
      }
    });
    const coords = [];

    wp.forEach(w => {
      coords.push([Math.round(w.x), Math.round(w.y)]);
    });
    const feature = L.geoJSON({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coords
      } as geojson.LineString
    } as geojson.Feature);

    feature.eachLayer(l => {
      const layer = l as L.GeoJSON;
      layer.on('click', () => {
        console.log(JSON.stringify(layer.toGeoJSON()));
      });
      const oldLayer = this.editableLayers.getLayer(this.flightpathLayerId);
      this.editableLayers.removeLayer(oldLayer);
      this.flightpathLayerId = l._leaflet_id;
      this.editableLayers.addLayer(layer);
    });
  }

  setFlightPath(geoJSON) {
    const coords = geoJSON.geometry.coordinates;
    const dronePosition = this.simulator.drone.position;
    const startPosition = {x: Math.round(dronePosition.x), y: Math.round(dronePosition.y)};
    const waypoints = [startPosition];
    coords.forEach(c => {
      waypoints.push({
        x: Math.round(c[0]),
        y: Math.round(c[1])
      });
    });
    console.log(waypoints);
    this.simulator.map.flightpath.waypoints = waypoints;
  }

  drawObstacles() {
    const obstacles = this.simulator.map.obstacles;

    obstacles.forEach(o => {
      const p1 = o.positions[0];
      const p2 = o.positions[1];

      const x1 = Math.round(p1.x);
      const y1 = Math.round(p1.y);
      const x2 = Math.round(p2.x);
      const y2 = Math.round(p2.y);

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
      const z1 = m.z;

      const r = sz.range;

      const feature = L.geoJSON({
        type: 'Feature',
        properties: {
          range: Math.round(sz.range)
        },
        geometry: {
          type: 'Point',
          coordinates: [Math.round(x1), Math.round(y1), Math.round(z1)]
        } as geojson.Point
      } as geojson.Feature);

      feature.eachLayer(l => {
        const layer = l as L.GeoJSON;
        const circle = L.circle(L.latLng([Math.round(y1), Math.round(x1), Math.round(z1)]), {
          radius: Math.round(r)
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
        // tslint:disable-next-line:max-line-length
        circle.addTo(this.editableLayers).bindPopup('orientation: ' + sz.orientation + ', height: ' + sz.position.z + ', range: ' + sz.range);
      });
    });
  }

  onDrawCreated(e) {
    if (e.layer.toGeoJSON().geometry.type === 'LineString') { // flightpath
      this.flightpathLayerId = e.layer._leaflet_id;
      this.setFlightPath(e.layer.toGeoJSON());
      // this.simulator.validateFlightPath();
    } else if (e.layer.toGeoJSON().geometry.type === 'Polygon') { // obstacle
      const coordinates = e.layer.toGeoJSON().geometry.coordinates[0];
      console.log(coordinates);
      coordinates.forEach((c, index) => {
        coordinates[index][0] = Math.round(c[0]);
        coordinates[index][1] = Math.round(c[1]);
      });
      const p1 = coordinates[0];
      const p2 = coordinates[2];
      const positions = [{x: Math.round(p1[0]), y: Math.round(p1[1])}, {x: Math.round(p2[0]), y: Math.round(p2[1])}];
      this.simulator.map.addObstacle(positions);
    } else if (e.layer.toGeoJSON().geometry.type === 'Point') { // scanzone
      const coordinate = e.layer.toGeoJSON().geometry.coordinates;
      const position = {x: Math.round(coordinate[0]), y: Math.round(coordinate[1]), z: 1000};
      this.simulator.map.addScanZone(e.layer._leaflet_id.toString(), position.x, position.y, position.z, 0, Math.round(e.layer._mRadius));
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
        const layer = this.editableLayers.getLayer(this.flightpathLayerId);
        this.editableLayers.removeLayer(layer);
        this.simulator.map.flightpath.waypoints = [];
        this.scanlocationLayer.clearLayers();
      }
    }
  }

  onDrawEdited(e) {
    if (this.flightpathLayerId) {
      const layer = this.editableLayers.getLayer(this.flightpathLayerId) as L.GeoJSON;
      this.setFlightPath(layer.toGeoJSON());
    }

    Object.keys(e.layers._layers).forEach(id => {
      console.log(e.layers);
      const newLayer = e.layers._layers[id];
      const oldLayer = this.editingLayers.find((layer, index) => {
        return layer.id === newLayer._leaflet_id;
      });

      if (oldLayer.bounds && newLayer.options.color === '#3388ff') { // valid flightpath
        // this.simulator.validateFlightPath();
      }

      if (oldLayer.bounds && newLayer.options.color === '#a80a0a') { // obstacle
        console.log(oldLayer);
        const bounds = oldLayer.bounds;
        const p1 = bounds._southWest;
        const p2 = bounds._northEast;
        const x1 = p1.lng;
        const y1 = p1.lat;
        const x2 = p2.lng;
        const y2 = p2.lat;
        const oldPositions = [{x: Math.round(x1), y: Math.round(y1)}, {x: Math.round(x2), y: Math.round(y2)}];

        this.simulator.map.removeObstacle(oldPositions);

        const newBounds = newLayer._bounds;
        const newP1 = newBounds._southWest;
        const newP2 = newBounds._northEast;
        const newX1 = newP1.lng;
        const newY1 = newP1.lat;
        const newX2 = newP2.lng;
        const newY2 = newP2.lat;
        const newPositions = [{x: Math.round(newX1), y: Math.round(newY1)}, {
          x: Math.round(newX2),
          y: Math.round(newY2)
        }];

        this.simulator.map.addObstacle(newPositions);

        // this.simulator.validateFlightPath();
      } else if (oldLayer.position) { // scanzone
        const p = oldLayer.position;
        const x1 = p.lng;
        const y1 = p.lat;
        const alt = p.alt;

        this.simulator.map.removeScanZone(Math.round(x1), Math.round(y1));

        const newP = newLayer._latlng;
        const newX1 = newP.lng;
        const newY1 = newP.lat;
        const newR = newLayer._mRadius;

        this.simulator.map.addScanZone('scanzone', Math.round(newX1), Math.round(newY1), Math.round(alt), 0, Math.round(newR));
      }
    });

    this.simulator.updateMap().catch((err) => console.log(err));
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
    this.collisionCounter++;
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
    if (this.heatPoints.length >= 6000) { // elke 5 minuten de heatmap resetten (voorlopig)
      this.heatPoints = [];
    }
    this.heatPoints.push(this.xy(drone.position.x, drone.position.y));
    drone.pushAllDatasets();

    if (this.batteryWarning !== true && drone.battery > 15 && drone.battery < 30) {
      this.batteryWarning = true;
      this.batteryAbort = false;
      console.log(this.batteryWarning);
      this.simulator.batteryWarning();
    } else if (this.batteryAbort !== true && drone.battery < 15) {
      this.batteryAbort = true;
      this.simulator.batteryAbort();
    } else if (drone.battery > 30){
      this.batteryWarning = false;
      this.batteryAbort = false;
    }

    if (this.collisionCounter === 50) {
      // deze functie zou de korste afstand van de drone tot het dichtste obstakel moeten teruggeven,
      // maar dit geveurd via API calls ipv een websocket
      // waardoor dit ervoor zorgt dat de volledige applicatie begint te vertragen en wordt dus niet geimplementeerd.

      // this.simulator.checkCollision();
      this.collisionCounter = 0;
    }
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
        const x1 = Math.round(p1.lng);
        const y1 = Math.round(p1.lat);
        const x2 = Math.round(p2.lng);
        const y2 = Math.round(p2.lat);
        const positions = [{x: x1, y: y1}, {x: x2, y: y2}];
        this.simulator.map.removeObstacle(positions);
      } else if (layer._latlng) { // scanzone
        const p = layer._latlng;
        const x1 = p.lng;
        const y1 = p.lat;
        const r = layer._mRadius;
        this.simulator.map.removeScanZone(Math.round(x1), Math.round(y1));
      }
      if (layer._latlngs && layer.options.color === '#3388ff') { // flightpath
        this.simulator.map.flightpath.waypoints = [];
        this.scanlocationLayer.clearLayers();
      }
    });
    this.simulator.updateMap().catch((err) => console.log(err));
  }
}
