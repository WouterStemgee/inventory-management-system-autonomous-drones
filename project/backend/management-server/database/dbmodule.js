const express = require('express');
const joi = require('joi'); //validatie package

const mongodb = require('mongodb');

let mapCache = [];

//methodes moeten promises terug geven, of via Promise.Resolve(result)
//naast connectie enzo maken moet er ook voorzien worden: getAllMaps, getMap(id), deleteMap(id)

let getAllMaps = () => {
    getCache().then((result) => {
        return Promise.resolve(result)
    });
};

let getMap = (id) => {
    getCache().then((result) => {
        let map = result.find(map => map.id === parseInt(id));
        return map ? Promise.resolve(map)
            : Promise.reject("Map id not found in the database");
    });
};


//NOG NIET KLAAR
let updateMap = (id, map) => {
    if (!validateMap(map))
        return Promise.reject("Bad request");

    let gecacheteMap = getCache().then((result) => {
        return result.find(m => m.id === parseInt(id))
    });

    //opm: dit werkt wrs enkel maar als dit single threaded is, denk ik, als iets anders de db aan past en zijn mapcache aan past
    //maar de mapcache in dit programma niet, dan toont de mapcache foute, onaangevulde data data
    if (!gecacheteMap)
        return Promise.reject("Map id not found in the database, unable to update");

    //nog invullen, mapcache en db aanpassen


    return Promise.resolve(map);
};

//NOG NIET KLAAR
let postMap = (map) => {
    if (!validateMap(map))
        return Promise.reject("Bad request");

    getCache().then((result) => {
        result.push(map)
    });
    //nog invullen, mapcache en db aanpassen


    return Promise.resolve(map);
};

//NOG NIET KLAAR
let deleteMap = (id) => {
    getCache().then((result) => {
        let map = result.find(map => {
            return id === parseInt(map.id)
        });
        if (!map)
            return Promise.reject("Map id not found in the database, unable to delete");

        // verwijder van db en cache
        return Promise.resolve(map);
    });
};


let getCache = () => {
    if (mapCache.length) {
        return Promise.resolve(mapCache);
    }
    //else ...
    //maak connectie met de db en haal de data op, en steek deze in mapcache
    //return promise ((resolve, reject) => { ... ; mapCache = result; resolve(mapCache)})
};


// VALIDATIE

const coordSchema = joi.object({
    x: joi.number().integer().required(),
    y: joi.number().integer().required()
});

const mapSchema = joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required(),
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
