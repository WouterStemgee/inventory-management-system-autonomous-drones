const express = require('express');
const dbmodule = require('../database/dbmodule'); // vervangen door ../database/dbmodule-mockup voor te testen

const router = express.Router();

router.route('')
    .get((req, res, next) => {
        dbmodule.getAllMaps()
            .then((result) => {
                console.log("hey");
                res.send(result);
            })
            .catch((error) => {
                console.log("hey");
                res.status(400).send(error);
        });
    })
    .post((req, res, next) => {
        dbmodule.postMap(req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    });

router.route('/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        dbmodule.getMap(id)
            .then((result) => {
                res.send(result);

            }).catch((error) => {
            res.status(404).send(error);
        });
    })
    .put((req, res, next) => {
        dbmodule.updateMap(req.params.id, req.body)
            .then((result) => {
                res.send(result); //normaal hetzelfde als req.body
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    })
    .delete((req, res, next) => {
        let id = req.params.id;
        dbmodule.deleteMap(id)
            .then((result) => {
                res.send(result);
            }).catch((error) => {
            res.status(404).send(error);
            console.log(error);
        });
    });


module.exports = router;

