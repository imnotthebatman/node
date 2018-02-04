'use strict'

//modulo mongoose
var mongoose = require("mongoose");
//esquema de la base d datos : crea un objeto tipo esquema 
var Schema = mongoose.Schema;

//esquema modelo Artist
var SongSchema = Schema({
	number: String, //orden dentro del album
	name : String,	
	duration: String,
	file : String,	
	album : { type: Schema.ObjectId, ref:'Album' }
	//el id ya lo crea automáticamente mongodb
});

//exportamos el modelo : Song(nombre de la entidad, esquema artist)
//así tenemos un objeto Song que podremos instanciar
module.exports = mongoose.model('Song', SongSchema);
