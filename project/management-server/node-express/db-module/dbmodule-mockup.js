const express = require('express');
const Joi = require('joi'); //validatie package


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
    return Promise.resolve(mapsJSON);
};

let getMap = (id) =>{

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

//module.exports.validateMap = validateMap;
module.exports.getMap = getMap;
module.exports.getAllMaps = getAllMaps;
module.exports.updateMap = updateMap;
module.exports.postMap = postMap;
module.exports.deleteMap = deleteMap;