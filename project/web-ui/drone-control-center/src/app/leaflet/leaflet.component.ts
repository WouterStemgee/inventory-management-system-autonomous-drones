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
    maps = this.simulator.maps;
    const obstacles = maps[this.simulator.selectedMap].obstacles;

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

  onDrawCreated(e) {
    if (e.layer.toGeoJSON().geometry.type === 'LineString') {
      this.flightpathLayerId = e.layer._leaflet_id;
      this.setFlightPath(e.layer.toGeoJSON());
    } else if (e.layer.toGeoJSON().geometry.type === 'Polygon') {
      console.log('polygon!');
      // add obstacle to simulator model
      const coordinates = e.layer.toGeoJSON().geometry.coordinates[0];
      const p1 = coordinates[0];
      const p2 = coordinates[2];
      const positions = [{x: p1[0], y: p1[1]}, {x: p2[0], y: p2[1]}];
      this.simulator.map.addObstacle(positions);
      console.log(this.simulator.map.obstacles);
    }
    e.layer.on('click', () => {
      const geoJSON = e.layer.toGeoJSON();
      console.log(JSON.stringify(geoJSON));
    });
  }

  ngOnInit() {
    if (this.simulator.loaded) {
      this.drawObstacles();
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.drawObstacles();
          console.log(this.simulator.map.obstacles);
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

  onDrawEdited(e) {
    if (this.flightpathLayerId) {
      const layer = this.editableLayers.getLayer(this.flightpathLayerId) as L.GeoJSON;
      this.setFlightPath(layer.toGeoJSON());
    }
  }

  onLeafletClick(e) {
    const coord = e.latlng;
    // console.log('X:' + coord.lng + '\nY:' + coord.lat);
  }

  updateDroneData(feature) {
    const drone = this.simulator.drone;
    drone.position.x = feature.properties.position[0];
    drone.position.y = feature.properties.position[1];
    drone.position.z = feature.properties.position[2];
    drone.radius = feature.properties.radius;
  }
}
