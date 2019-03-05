const express = require('express');
const client = require('../mqtt/client');
const dijkstra = require('../app');

const router = express.Router();

router.route('')
    .post((req, res, next) => {
        res.send(dijkstra.Dijkstra.zoekPad(req.body.mapId, req.body.waypoints));
        // client.send(result);
    });

module.exports = router;

