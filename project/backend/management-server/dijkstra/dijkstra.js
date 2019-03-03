const Graaf = require('./graaf');
const mapsDAO = require('../database/dao/maps');

class Dijkstra {
    constructor() {
        this.grafen = [];
    }

    initializeMaps() {
        let dijkstra = this;
        return new Promise((resolve, reject) => {
            console.log('Loading graphs...');
            mapsDAO.getAllMaps()
                .then(res => {
                    res.forEach((map, index) => {
                        dijkstra.grafen[index] = dijkstra.jsonMapNaarGraaf(map);
                    });
                    console.log('Graphs loaded: ' + JSON.stringify(this.grafen));
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    recalculateGraaf() {
      // TODO: Wanneer een nieuwe map toegevoegd wordt of een bestaande map aangepast werd, moet de graaf herberekend worden
    }

    zoekPad(id, waypointsJSON) {
        let graaf = this.grafen.find(graaf => graaf.mapId == id);
        let waypoints = this.jsonWaypointsNaarPad(waypointsJSON);
        let start = waypoints.splice(0, 1);
        let pad = graaf.zoekKortstePadWaypoints(start, waypoints);
        return this.padNaarJsonWaypoints(pad);
    };

    jsonMapNaarGraaf(mapsJSON) {
        //map in JSON omzetten naar graaf
        let map = mapsJSON;
        let graaf = new Graaf();
        graaf.mapId = map._id;
        graaf.maakGrid(map.sizeX, map.sizeY);

        let obstakels = [];
        map.obstacles.forEach(function (obstakel) {
            obstakels.push(obstakel.x + 'X' + obstakel.y + 'Y');
        });
        graaf.verwijderKnopen(obstakels);
        return graaf;
    };

    jsonWaypointsNaarPad(waypointsJSON) {
        let stops = [];
        waypointsJSON.forEach(function (waypoint) {
            stops.push(waypoint.x + 'X' + waypoint.y + 'Y');
        });
        return stops;
    }

    padNaarJsonWaypoints(pad) {
        let waypointsJSON = [];
        let regex = /(\d+)X(\d+)Y/;
        pad.forEach(function (waypoint) {
            if (waypoint.constructor === Array) {
                waypoint.forEach(function (pad) {
                    {
                        let coords = regex.exec(pad);
                        let waypointx = coords[1];
                        let waypointy = coords[2];
                        waypointsJSON.push({x: waypointx, y: waypointy});
                    }
                });
            }
        });
        return waypointsJSON;
    }
}

module.exports = Dijkstra;
