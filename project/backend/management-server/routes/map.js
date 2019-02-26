const express = require('express');
const dbmodule = require('../database/dbmodule-mockup'); // vervangen door ../database/dbmodule-mockup voor te testen

const router = express.Router();

//hier wordt overal gewerkt met json, die van de client of van de database komt
//update: de date die binnen komt wordt automatisch omgezet naar een object
router.route('')
    .get((req, res, next) => {
        dbmodule.getAllMaps().then((result) => {
            res.send(result);
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

