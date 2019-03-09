const express = require('express');
const router = express.Router();

const Product = require('../models/product'); // eigen product module implementeren
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
	Product.find().select('name quantity _id xCoord yCoord').exec().then(docs => { // in de select wordt er beslist welke velden je precies allemaal gaat terug sturen
		console.log(docs);
		const response = {
			count : docs.length, // je geeft al mee hoeveel verschillende producten er in totaal al in de database zitten
			products: docs.map(doc => {
				return {
					name : doc.name,
					quantity : doc.quantity,
					xCoord : doc.xCoord,
					yCoord : doc.yCoord,
					_id : doc._id,
					request : {
						type : 'GET',
						url : 'http://localhost:3001/products/'+ doc._id // er wordt ook een soort van url voor extra info over een bepaald product terug gegeven
					}
				};
			})
		};
		res.status(200).json(response);
	}).catch(err =>{
		console.log(err);
		res.status(500).json({ // als er een fout optreedt dan stuur je een error-antwoord terug
			error: err
		});
	}); 
});

router.post('/', (req, res, next) => {
	// je maakt een nieuw product aan, dat je wilt opslaan in de database
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		quantity: req.body.quantity
	});
	product.save().then(result =>{ // je slaat het nieuw aangemaakte product effectief op in de database
		console.log(result);
		res.status(201).json({
        	message: 'Product was succesfully created', 
        	createdProduct: {
        		name: result.name,
        		quantity: result.quantity,
        		xCoord: result.xCoord,
        		yCoord: result.yCoord,
        		_id: result._id,
        		request: {
        			type: 'GET',
        			url: 'http://localhost:3001/products' + result._id // je geeft een link terug om het nieuw aangemaakte product makkelijker te kunnen opzoeken
        		}
        	}
    	});
	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('name quantity _id xCoord yCoord').exec().then(doc => { // de select bepaal wat je exact gaat terug kunnen geven, zo voorkom je dat er ongewenst interne gegevens naar buiten lekken
    	console.log(doc);
    	if(doc){
    		res.status(200).json({
    			product: doc,
    			request: {
    				type: 'GET',
    				description: 'to get all the products',
    				url: 'http://localhost:3001/products'
    			}
    		});
    	}
    	else{
    		res.status(404).json({message: "Dit is geen geldig id"}); // foutbericht
    	}
    }).catch(err => {
    	console.log(err);
    	res.status(500).json({error: err});
    });
});

/*
router.get('/find/:parameter',(req,res,next) => {
	const param = reg.params.parameter;
	Product.findOne(){

	}
});
*/

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId; 
	const updateOps = {};
	// deze manier van werken zorgt er voor dat je niet alle gegevens die je niet wilt aanpassen opnieuw moet opgeven
	// een mogelijk nadeel kan zijn dat je geen nieuwe attributen kan toevoegen
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id: id},{$set: updateOps}).exec().then(result => {
		console.log(result);
		res.status(200).json({
			message: 'product updated',
			request: {
    				type: 'GET',
    				url: 'http://localhost:3001/products' + id
    			}
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
    Product.remove({_id: id}).exec().then(result => {
    	res.status(200).json({
    		message: 'product was succesfully deleted'
    	});
    }).catch(err => {
    	console.log(err);
    	res.status(500).json({
    		error: err
    	});
    });
});
// einde
module.exports = router;