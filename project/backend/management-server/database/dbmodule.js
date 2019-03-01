const express = require('express');
const joi = require('joi'); //validatie package

const Map = require('../models/map');
const mongoose = require('mongoose');

let mapCache = [];


let getAllMaps = () => {
    return getCache().then((result) => {
        return Promise.resolve(mapCache);
    });
};

let getMap = (id) => {
    return getCache().then((result) => {
        let map = result.find(map => map._id == id);
        return map ? Promise.resolve(map)
            : Promise.reject("Map id not found in the database");
    });
};

let updateMap = (id, map) => {
    if (!validateMap(map)) {
        //console.log("LOOOOOOOOOL");
        return Promise.reject("Bad request");
    }
    return getCache().then((result) => {
        let cacheId =  result.findIndex(m => m._id == id);
        if (cacheId === -1)
            return Promise.reject("Map id not found in the database, unable to update");

        //opm: dit werkt wrs enkel maar als dit single threaded is, denk ik, als iets anders de db aan past en zijn mapcache aan past
        //maar de mapcache in dit programma niet, dan toont de mapcache foute, onaangevulde data data

        return Map.updateOne({_id: id}, {$set: map}).exec().then(result => {
            console.log(cacheId);
            mapCache[cacheId] = map;
            console.log(result);
            console.log(map);
            return Promise.resolve(map);
        });
    });

};


let postMap = (map) => {
    if (!validateMap(map))
        return Promise.reject("Bad request");

    //nog invullen, mapcache en db aanpassen
    let dbmap = new Map({});
    Object.assign(dbmap, map);
    Object.assign(dbmap, {_id: new mongoose.Types.ObjectId()});

    return dbmap.save().then(result => {
        console.log(result);
        getCache().then((result) => {
            result.push(dbmap);
            return Promise.resolve(dbmap);
        });
    });
};

let deleteMap = (id) => {
    return getCache().then((result) => {
        let cacheId = result.findIndex(map => {
            return id == map._id;
        });
        console.log(cacheId);
        if (cacheId === -1)
            return Promise.reject("Map id not found in the database, unable to delete");

        // verwijder van db en cache
        result.splice(cacheId, 1);
        return Map.deleteOne({_id: id}).exec().then(result => {
            return Promise.resolve(result);
        });
    });
};



let getCache = () => {
    if (mapCache.length) {
        return Promise.resolve(mapCache);
    }
    return Map.find().exec()
        .then(items => {
            mapCache = items;
            return Promise.resolve(mapCache);
        }).catch(err =>{
            return Promise.reject({error: "An error with the database occured"});
        });
};




// VALIDATIE

const coordSchema = joi.object({
    x: joi.number().integer().required(),
    y: joi.number().integer().required()
});

const mapSchema = joi.object({
    _id: joi.string(),
    __v: joi.number(),
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
