const Graaf = require('./graaf');
const http = require('http');
class Dijkstra {
    constructor() {
        this.grafen = [];
        this.url = "http://localhost:3000/api/maps";
    }

    initializeMaps(){
        let dijkstra = this;
        let map = [];
        return new Promise((resolve, reject) => {
            http.get(this.url, function (res) {
                console.log("Got response: " + res.statusCode);
                res.on("data", function (chunk) {
                    map.push(chunk.toString());
                });
                res.on("end", function () {
                    map = JSON.parse(map)[0];
                    dijkstra.grafen[map.id] = dijkstra.jsonMapNaarGraaf(map);
                });
                resolve(res);
            });
        });
    };

    zoekPad(id, waypointsJSON){
        let graaf = this.grafen[id];
        let waypoints = this.jsonWaypointsNaarPad(waypointsJSON);
        let start = waypoints.splice(0,1);
        let pad = graaf.zoekKortstePadWaypoints(start, waypoints);
        return this.padNaarJsonWaypoints(pad);
    };

    jsonMapNaarGraaf(mapsJSON){
        //map in JSON omzetten naar graaf
        let map = mapsJSON;
        let graaf = new Graaf();
        graaf.maakGrid(map.sizeX,map.sizeY);

        let obstakels = [];
        map.obstacles.forEach(function(obstakel){
            obstakels.push(obstakel.x + 'X' + obstakel.y + 'Y');
        });
        graaf.verwijderKnopen(obstakels);
        return graaf;
    };

    jsonWaypointsNaarPad(waypointsJSON){
        let stops = []
        waypointsJSON.forEach(function(waypoint){
            stops.push(waypoint.x + 'X' + waypoint.y + 'Y');
        });
        return stops;
    }

    padNaarJsonWaypoints(pad){
        let waypointsJSON = [];
        let regex = /(\d+)X(\d+)Y/;
        pad.forEach(function(waypoint){
            if (waypoint.constructor === Array) {
                waypoint.forEach(function(pad) {
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
};
module.exports = Dijkstra;
