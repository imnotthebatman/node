'use strict'

//modulo mongoose
var mongoose = require("mongoose");
//esquema de la base d datos : crea un objeto tipo esquema 
var Schema = mongoose.Schema;

//esquema modelo Artist
var AlbumSchema = Schema({
	title: String,
	description : String,	
	year : Number,
	image : String,
	artist : { type: Schema.ObjectId, ref:'Artist' }
	//el id ya lo crea automáticamente mongodb
});

//exportamos el modelo : Album (nombre de la entidad, esquema artist)
//así tenemos un objeto Album que podremos instanciar
module.exports = mongoose.model('Album', AlbumSchema); //sin comillas el segundo
