'use strict'

//modulo mongoose
var mongoose = require("mongoose");
//esquema de la base d datos : crea un objeto tipo esquema 
var Schema = mongoose.Schema;

//esquema modelo Artist
var ArtistSchema = Schema({
	name : String,
	description : String,	
	image : String	
	//el id ya lo crea automáticamente mongodb
});

//exportamos el modelo : Artist (nombre de la entidad, esquema artist)
//así tenemos un objeto artist que podremos instanciar
module.exports = mongoose.model('Artist', ArtistSchema);
