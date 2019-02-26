const express = require('express');
const dijkstra = require('../dijkstra/dijkstra-mockup');
const mqttclient = require('../MQTT/mqttclient');

const router = express.Router();

router.route('')
    .post((req, res, next) => {
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

