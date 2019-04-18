const express = require('express');
const ASter = require('../app');

const router = express.Router();

router.route('')
    .post((req, res, next) => {
        console.log('received flightpath', req.body.waypoints);
        try {
            res.send(ASter.ASter.zoekPad(req.body.mapId, req.body.waypoints));
        } catch (e) {
            console.log("reeeeee");
            res.send("niet mogelijk");
        }

        // client.send(result);
    });

module.exports = router;

