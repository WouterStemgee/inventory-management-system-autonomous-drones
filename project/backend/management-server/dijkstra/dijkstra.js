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
                    console.log('Graphs loaded.');
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    recalculateGraaf(id) {
        // Wanneer een nieuwe map toegevoegd wordt of een bestaande map aangepast werd, moet de graaf herberekend worden
        console.log('recalculating graph for id: ' + id);
        let dijkstra = this;
        return new Promise((resolve, reject) => {
            mapsDAO.getMap(id)
                .then(res => {
                    let mapIndex = this.grafen.findIndex(g => g.mapId == id);
                    if (mapIndex > -1) {
                        dijkstra.grafen[mapIndex] = dijkstra.jsonMapNaarGraaf(res);
                    } else {
                        dijkstra.grafen.push(dijkstra.jsonMapNaarGraaf(res));
                    }
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    zoekPad(id, waypointsJSON) {
        console.log('calculating path for id: ' + id);
        let graaf = this.grafen.find(g => g.mapId == id);
        //console.log(graaf);
        let waypoints = this.jsonWaypointsNaarPad(waypointsJSON);
        //console.log(waypoints);
        let start = waypoints.splice(0, 1);
        let pad = graaf.zoekKortstePadWaypoints(start, waypoints);
        //console.log(pad);
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
        //console.log(obstakels);
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
