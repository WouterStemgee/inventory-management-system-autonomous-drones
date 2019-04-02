const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dijkstra = require('./dijkstra/dijkstra');

const mapRouter = require('./api/maps');
const droneRouter = require('./api/drone');
const waypointRouter = require('./api/flightpath');

const app = express();

// CORS om vanuit angular lokaal toegang te krijgen naar express
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/",express.static(path.join(__dirname, 'public')));

app.use('/api/maps', mapRouter);
app.use('/api/drone', droneRouter);
app.use('/api/flightpath', waypointRouter);

// je hebt MongoDB lokaal geinstalleerd, indien deze nog niet bestaat wordt dit automatisch aangemaakt
mongoose.connect('mongodb://localhost/drone1', {useNewUrlParser: true});

let Dijkstra = new dijkstra();
//Dijkstra.initializeMaps();

module.exports = app;
exports.Dijkstra = Dijkstra;
