const express = require('express');
const Joi = require('joi'); //validatie package

let mapsCache = [];
let mapsJSON = `[
    {
        "id" : 0,
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
    },
    {
        "id" : 1,
        "name" : "Test Map 2",
        "obstacles" :
            [
                {"x" : 5, "y" : 2}
            ],
        "inventoryItems" :
            [
                {"x" : 15, "y" : 18},
                {"x" : 12, "y" : 8},
                {"x" : 14, "y" : 18}
            ]
    },
    {
        "id" : 2,
        "name" : "Test Map 3",
        "obstacles" :
            [
                {"x" : 15, "y" : 15},
                {"x" : 5, "y" : 2},
                {"x" : 12, "y" : 8},
                {"x" : 14, "y" : 18}
            ],
        "inventoryItems" :
            [
                {"x" : 18, "y" : 15}
            ]
    }
]`;


let getAllMaps = () =>{
    return Promise.resolve(getCache());
};

let getMap = (id) =>{
    let maps = getCache();
    let res = maps.find(x => x.id === parseInt(id));
    if(res)
        return Promise.resolve(res);
    else return Promise.reject("Map id niet gevonden in db");
};

let updateMap = (id, map) => {
    if(!validateMap(map))
        return Promise.reject("Bad request");

    let mapId = getCache().findIndex(map => {return map.id === parseInt(id);});
    if(!mapId || mapId < 0)
        return Promise.reject("Map niet gevonden in db");

    mapsCache[mapId] = map;
    return Promise.resolve(map);
};

let postMap = (map) => {
    if(!validateMap(map))
        return Promise.reject("Bad request");

    getCache().push(map);
    return Promise.resolve(map);
};

let deleteMap = (id) => {
    let mapId = getCache().findIndex(map => {return map.id === parseInt(id);});
    if(mapId < 0)
        return Promise.reject("Map not found");
    let map = getCache().splice(id, 1)[0];
    return Promise.resolve(map);
};




let getCache = () => {
    if(!mapsCache.length)
        mapsCache = JSON.parse(mapsJSON);
    return mapsCache;
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

//module.exports.validateMap = validateMap;
module.exports.getMap = getMap;
module.exports.getAllMaps = getAllMaps;
module.exports.updateMap = updateMap;
module.exports.postMap = postMap;
module.exports.deleteMap = deleteMap;