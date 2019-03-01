const express = require('express');
const joi = require('joi'); //validatie package
const fs = require('fs');

let mapsCache = [];
let mapsJSON;

let getAllMaps = () => {
    return Promise.resolve(getCache());
};

let getMap = (id) => {
    let maps = getCache();
    let res = maps.find(x => x.id === parseInt(id));
    if (res)
        return Promise.resolve(res);
    else return Promise.reject("Map id niet gevonden in db");
};

let updateMap = (id, map) => {
    if (!validateMap(map))
        return Promise.reject("Bad request");

    let mapId = getCache().findIndex(map => {
        return map.id === parseInt(id);
    });
    if (!mapId || mapId < 0)
        return Promise.reject("Map niet gevonden in db");

    mapsCache[mapId] = map;
    return Promise.resolve(map);
};

let postMap = (map) => {
    if (!validateMap(map))
        return Promise.reject("Bad request");

    getCache().push(map);
    return Promise.resolve(map);
};

let deleteMap = (id) => {
    let mapId = getCache().findIndex(map => {
        return map.id === parseInt(id);
    });
    if (mapId < 0)
        return Promise.reject("Map not found");
    let map = getCache().splice(id, 1)[0];
    return Promise.resolve(map);
};


let getCache = () => {
    if (!mapsCache.length) {
        mapsCache = JSON.parse(fs.readFileSync('database/maps.json','utf8'));
    }
    return mapsCache;
};


// VALIDATIE

const coordSchema = joi.object({
    x: joi.number().integer().required(),
    y: joi.number().integer().required()
});

const mapSchema = joi.object({
    id: joi.number().integer(),
    name: joi.string().required(),
    sizeX: joi.number().integer().required(),
    sizeY: joi.number().integer().required(),
    obstacles: joi.array().items(coordSchema),
    inventoryItems: joi.array().items(coordSchema)
});

//doet nog niet aan logging, gewoon true/false
let validateMap = (map) => {
    let result = joi.validate(map, mapSchema);
    return !result.error;
};

//module.exports.validateMap = validateMap;
module.exports.getMap = getMap;
module.exports.getAllMaps = getAllMaps;
module.exports.updateMap = updateMap;
module.exports.postMap = postMap;
module.exports.deleteMap = deleteMap;
