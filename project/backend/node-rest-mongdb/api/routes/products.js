const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const mongoose = require('mongoose');


// dit is 1 van de dingen die veranderd werd en een effect heeft op de front-end
router.get('/', (req, res, next) => {
	Product.find().select('name quantity _id xCoord yCoord').exec().then(docs => { // in de select wordt er beslist welke velden je precies allemaal gaat terug sturen
		console.log(docs);
		const response = {
			count : docs.length,
			products: docs.map(doc => {
				return {
					name : doc.name,
					quantity : doc.quantity,
					xCoord : doc.xCoord,
					yCoord : doc.yCoord,
					_id : doc._id,
					request : {
						type : 'GET',
						url : 'http://localhost:3001/products/'+ doc._id
					}
				};
			}) // je geeft nu de oorspronkelijke response weer in een nieuw json antwoord
		};
		res.status(200).json(response);
	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	}); // hier kan je allemal query operators aan toevoegen zoals where, limit,...
});

router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		quantity: req.body.quantity
	});
	product.save().then(result =>{
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
        			url: 'http://localhost:3001/products' + result._id
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
    Product.findById(id).select('name quantity _id xCoord yCoord').exec().then(doc => {
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
    		res.status(404).json({message: "Dit is geen geldig id"});
    	}
    }).catch(err => {
    	console.log(err);
    	res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
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
    	res.status(200).json(result);
    }).catch(err => {
    	console.log(err);
    	res.status(500).json({
    		error: err
    	});
    });
});
// einde
module.exports = router;