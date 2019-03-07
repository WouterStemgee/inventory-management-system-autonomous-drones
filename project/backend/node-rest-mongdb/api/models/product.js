const mongoose = require('mongoose');
// deze file bepaalt hoe de producten die in de database opgeslagen zullen worden er uit gaan zien
const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, // het id van het product wordt automatisch gegenereerd door mongoose
	name: {type: String, required: true},
	quantity: {type: Number, required: true},
	// zowel name al quantity dienen verplicht opgegeven te worden bij het aanmaken van een nieuw product
	xCoord: Number, // aangezien producten vaak verplaatst zullen worden moeten de coordinaten van hun positie niet verplicht opgegeven worden
	yCoord: Number
});
module.exports = mongoose.model('Product',productSchema); // het schema naar buiten brengen