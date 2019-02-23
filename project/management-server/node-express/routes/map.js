const express = require('express');
const dbmodule = require('../db-module/dbmodule');

const router = express.Router();

router.route('')
    .get((req, res, next) => {
        dbmodule.getAllMaps().then((result) =>{
            res.send(result);
        });
    })
    .post((req, res, next) => {
        if(!dbmodule.validateMap(req.body)){
            res.status(400).send("Bad request");
            return;
        }
        dbmodule.postMap(req.body)
            .then((result) =>{
                res.send(result);
            })
            .catch((error) => {
                res.status(400).send("Bad request");
            })
    });


router.route('/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        dbmodule.getMap(id)
            .then((result) => {
                res.send(result);
            }).catch((error) =>{
                res.status(404).send("Map id not found");
                console.log(error);
            });
    })
    .put((req, res, next) => {
        if(!dbmodule.validateMap(req.body)){
            res.status(400).send("Bad request");
            return;
        }
        dbmodule.updateMap(req.params.id, req.body)
            .then((result) =>{
                res.send(result); //normaal hetzelfde als req.body
            })
            .catch((error) =>{
                res.status(404).send("Unable to update the map");
            });

    })
    .delete((req, res, next) => {
        let id = req.params.id;
        dbmodule.deleteMap(id)
            .then((result) => {
                res.send(result);
            }).catch((error) =>{
                res.status(404).send("Map id not found");
                console.log(error);
        });
    });


module.exports = router;

