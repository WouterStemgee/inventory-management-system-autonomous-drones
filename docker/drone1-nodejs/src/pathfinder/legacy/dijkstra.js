const Graaf = require('./graaf');
const mapsDAO = require('../../database/dao/maps');

class Dijkstra {
    constructor() {
        this.grafen = [];
        this.id = 0;
        this.huidigeGraaf;
        this.droneValue;
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
                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    setID(id){
        this.id = id;
        this.huidigeGraaf = this.grafen.find(g => g.mapId == id);
    }

    setDroneValue(droneValue){
        this.droneValue = dronevalue;
    }

    recalculateGraaf() {
        // Wanneer een nieuwe map toegevoegd wordt of een bestaande map aangepast werd, moet de graaf herberekend worden
        console.log('recalculating graph for id: ' + this.id);
        let dijkstra = this;
        return new Promise((resolve, reject) => {
            mapsDAO.getMap(this.id)
                .then(res => {
                    let mapIndex = this.grafen.findIndex(g => g.mapId == id);
                    if (mapIndex > -1) {
                        dijkstra.grafen[mapIndex] = dijkstra.jsonMapNaarGraaf(res);
                    } else {
                        dijkstra.grafen.push(dijkstra.jsonMapNaarGraaf(res));
                    }
                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    verwijderknopen(knoopLB, knoopRO){
        this.huidigeGraaf.verwijderKnopenV2(knoopLB, knoopRO, this.droneValue);
    }

    zoekPad(waypointsJSON) {
        console.log('calculating path for id: ' + this.id);
        let graaf = this.grafen.find(g => g.mapId == this.id);
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
