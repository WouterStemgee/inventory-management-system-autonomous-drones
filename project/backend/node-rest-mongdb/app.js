
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
//const orderRoutes = require('./api/routes/orders');

// connecteren met de database
mongoose.connect('mongodb://localhost/projectDatabase', { useNewUrlParser: true }); // je hebt mongDB lokaal geinstalleerd, indien deze nog niet bestaat wordt dit automatisch aangemaakt

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//dit niet verplaatsen dit regelt de cors. Stelt header in die de browser duidelijk maakt dt het geen probleem is om request te sturen
// dit moet gebeuren voor er effectief iets terug gestuurd word
app.use((req,res,next) => {
	// dit stuurt niets terug het past enkel de headers aan die je terug stuurt
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','*');
	if(req.method === 'OPTIONS'){
		// voor als browser eerst een soort verkennende request stuurt naar de server
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next(); // doorsturen naar de andere routes
});

app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);

// elke request die hier voorbij komt is fout en moet afgehandeld worden als een verkeerde aanvraag
app.use((req,res,next) => {
	const error = new Error('not found');
	error.status = 404;
	next(error);
});

// in dit deel handelen we alle errors af (niet alleen de error van hier boven maar van uit heel de applicatie)
app.use((error,req,res,next) => {
	res.status(error.status || 500);
	res.json({
		error : {
			message : error.message
		}
	});
});

module.exports = app;