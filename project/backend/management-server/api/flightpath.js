const express = require('express');
const dijkstra = require('../app');

const router = express.Router();

router.route('')
    .post((req, res, next) => {
        console.log('received flightpath', req.body.waypoints);
        // res.send(dijkstra.Dijkstra.zoekPad(req.body.mapId, req.body.waypoints));
        // client.send(result);
    });

module.exports = router;

