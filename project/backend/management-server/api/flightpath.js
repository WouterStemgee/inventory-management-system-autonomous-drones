const express = require('express');
const dijkstra = require('../dijkstra/dijkstra');
const client = require('../mqtt/client');

const router = express.Router();

let Dijkstra = new dijkstra();
Dijkstra.initializeMaps();

router.route('')
    .post((req, res, next) => {
        console.log(req.body);
        res.send(Dijkstra.zoekPad(req.body.mapId, req.body.waypoints));
        // client.send(result);
    });

module.exports = router;

