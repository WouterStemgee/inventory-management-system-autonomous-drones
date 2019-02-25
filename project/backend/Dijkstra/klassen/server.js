let express = require('express');
let router = express.Router();
const fs = require('fs');
const Graaf = require('./graaf');

let graaf = new Graaf();

//testmap
let mapsJSON = `[
    {
        "id" : 0,
        "sizeX" : 20,
        "sizeY" : 20,
        "name" : "Test Map 1",
        "obstacles" :
            [
                {"x" : 15, "y" : 15}
            ],
        "inventoryItems" :
            [
                {"x" : 9, "y" : 15},
                {"x" : 5, "y" : 2},
                {"x" : 12, "y" : 8},
                {"x" : 14, "y" : 18}
            ]
    }]`;

let setMap = (id) =>{
    //map ophalen van db of frontend ?
    let map = mapsJSON;
    graaf.maakGrid(map.sizeX,map.sizeY);

    let obstakels = [];
    map.obstakels.forEach(function(obstakel){
        obstakels.push(obstakel.x + 'X' + obstakel.y + 'Y');
    });
    graaf.verwijderKnopen(obstakels);
};

let getRoute = (waypoints) =>{
    let stops = []
    waypoints.forEach(function(waypoint){
        stops.push(waypoint.x + 'X' + waypoint.y + 'Y');
    });
    let start = stops.splice(stops[0],1);
    return graaf.zoekKortstePadWaypoints(start, stops);
};

