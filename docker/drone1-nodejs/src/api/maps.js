const express = require('express');
const mapsDAO = require('../database/dao/maps');

const mapRouter = express.Router({mergeParams: true});
const scanzoneRouter = express.Router({mergeParams: true});
const productRouter = express.Router({mergeParams: true});
const obstacleRouter = express.Router({mergeParams: true});

mapRouter.use('/:mapId/scanzones', scanzoneRouter);
mapRouter.use('/:mapId/products', productRouter);
mapRouter.use('/:mapId/obstacles', obstacleRouter);

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
                console.log(error);

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
        mapsDAO.updateMap(req.params.mapId, req.body)
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

scanzoneRouter.route('/')
    .get((req, res) => {
        mapsDAO.getMap(req.params.mapId)
            .then((result) => {
                res.status(200).send(result.scanzones);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .post((req, res) => {
        mapsDAO.addScanzone(req.params.mapId, req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

scanzoneRouter.route('/:scanzoneId')
    .get((req, res) => {
        mapsDAO.getScanzone(req.params.mapId, req.params.scanzoneId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .put((req, res) => {
        mapsDAO.updateScanzone(req.params.mapId, req.params.scanzoneId, req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    })
    .delete((req, res) => {
        mapsDAO.removeScanzone(req.params.mapId, req.params.scanzoneId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

productRouter.route("")
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
        mapsDAO.getProduct(req.params.mapId, req.params.productId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .put((req, res) => {
        mapsDAO.updateProduct(req.params.mapId, req.params.productId, req.body)
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

obstacleRouter.route("")
    .get((req, res) => {
        mapsDAO.getMap(req.params.mapId)
            .then((result) => {
                res.status(200).send(result.obstacles);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .post((req, res) => {
        mapsDAO.addObstacle(req.params.mapId, req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

obstacleRouter.route('/:obstacleId')
    .get((req, res) => {
        mapsDAO.getObstacle(req.params.mapId, req.params.obstacleId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .put((req, res) => {
        mapsDAO.updateObstacle(req.params.mapId, req.params.obstacleId, req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    })
    .delete((req, res) => {
        mapsDAO.removeObstacle(req.params.mapId, req.params.obstacleId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    });

module.exports = mapRouter;
