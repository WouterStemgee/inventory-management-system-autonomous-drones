const express = require('express');
const dijkstra = require('../dijkstra/dijkstra-mockup');
const mqttclient = require('../MQTT/mqttclient');

const router = express.Router();

router.route(':id')
    .post((req, res, next) => {
        let id = req.params.id;
        console.log(id);
        let body = req.body;
        console.log(body);
        dijkstra.zoekPad(body.id, body.waypoints)
            .then(result => {
                res.send(result);
                //mqttclient.send(result);
            })
            .catch(error => {
                res.status(400).send(error)
            });
    });

module.exports = router;

