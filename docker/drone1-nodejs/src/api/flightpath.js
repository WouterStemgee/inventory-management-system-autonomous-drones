const express = require('express');
const ASter = require('../app');

const router = express.Router();

router.route('')
    .post((req, res, next) => {
        console.log('received flightpath', req.body.waypoints, 'radius', req.body.radius);
        try {
            res.send(ASter.ASter.zoekPad(req.body.mapId, req.body.waypoints, req.body.radius));
        } catch (e) {
            console.log("reeeeee");
            res.send("niet mogelijk");
        }

        // client.send(result);
    });

module.exports = router;

