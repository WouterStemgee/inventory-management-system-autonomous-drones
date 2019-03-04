const mongoose = require('mongoose');
// deze file bepaalt hoe de producten die in de database opgeslagen zullen worden er uit gaan zien
const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
	quantity: {type: Number, required: true},
	xCoord: Number,
	yCoord: Number
});
// einde
module.exports = mongoose.model('Product',productSchema);