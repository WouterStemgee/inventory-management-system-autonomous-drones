const express = require('express');
const droneDAO = require('../database/dao/drones');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        droneDAO.getAllDrones()
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .post((req, res) => {
        droneDAO.addDrone(req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);

            });
    });

router.route('/:droneId')
    .get((req, res) => {
        droneDAO.getDrone(req.params.droneId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .put((req, res) => {
        droneDAO.updateDrone(req.params.droneId, req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    })
    .delete((req, res) => {
        droneDAO.deleteDrone(req.params.droneId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

module.exports = router;
