const express = require('express');
const mapsDAO = require('../database/dao/maps');

const mapRouter = express.Router();
const productRouter = express.Router({mergeParams: true});

mapRouter.use('/:mapId/products', productRouter);

mapRouter.route('/')
    .get((req, res) => {
        mapsDAO.getAllMaps()
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .post((req, res) => {
        mapsDAO.addMap(req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

mapRouter.route('/:mapId')
    .get((req, res) => {
        mapsDAO.getMap(req.params.mapId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .put((req, res) => {
        mapsDAO.updateMap(req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    })
    .delete((req, res) => {
        mapsDAO.deleteMap(req.params.mapId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

productRouter.route('/')
    .get((req, res) => {
        mapsDAO.getMap(req.params.mapId)
            .then((result) => {
                res.status(200).send(result.products);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .post((req, res) => {
        mapsDAO.addProduct(req.params.mapId, req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

productRouter.route('/:productId')
    .get((req, res) => {
        mapsDAO.getMap(req.params.mapId)
            .then((result) => {
                let product = result.products.find(pr => {return pr._id == req.params.productId} );
                if(product != undefined)
                    res.status(200).send(product);
                else
                    res.status(404).send("Not found");

            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .put((req, res) => {
        mapsDAO.updateProduct(req.params.mapId, req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    })
    .delete((req, res) => {
        mapsDAO.removeProduct(req.params.mapId, req.params.productId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

module.exports = mapRouter;
