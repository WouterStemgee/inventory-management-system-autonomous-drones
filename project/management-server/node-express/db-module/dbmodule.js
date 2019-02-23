const express = require('express');
const Joi = require('joi'); //validatie package

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let mapCache;

//methodes moeten promises terug geven, of via Promise.Resolve(result)
//naast connectie enzo maken moet er ook voorzien worden: getAllMaps, getMap(id), deleteMap(id)

let getAllMaps = () =>{
    if(!mapCache){
        //haal mappen op en steek ze in mapcache
        fillCache().then((result) => {return Promise.resolve(result);});
    }
    else {
        return Promise.resolve(mapCache);
    }
};

let getMap = (id) =>{
    if(!mapCache){
        //haal mappen op en steek ze in mapcache
        fillCache().then((result) => {return Promise.resolve(result);});
    }
    else {
        return Promise.resolve(mapCache.find(map => map.id === parseInt(id)));
    }
};

let updateMap = (id, mapJSON) => {

};

let postMap = (mapJSON) => {

};

let deleteMap = (id) => {

};




let fillCache = () => {
    //maak connectie met de db en haal de date op, dit is wrs een promise
    //return promise ((resolve, reject) => { ... ; mapCache = result; resolve(mapCache)})
}




// VALIDATIE

const coordSchema = Joi.object({
    x: Joi.number().integer().required(),
    y: Joi.number().integer().required()
});

const mapSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    obstacles: Joi.array().items(coordSchema),
    inventoryItems: Joi.array().items(coordSchema)
});

//doet nog niet aan logging, gewoon true/false
let validateMap = (map) => {
    let result  = Joi.validate(map, mapSchema);
    return !result.error;
};

module.exports.validateMap = validateMap;
module.exports.getMap = getMap;
module.exports.getAllMaps = getAllMaps;
module.exports.updateMap = updateMap;
module.exports.postMap = postMap;
module.exports.deleteMap = deleteMap;