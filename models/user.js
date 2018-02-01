'use strict'

//modulo mongoose: MongooseJS is an Object Document Mapper (ODM) that makes using MongoDB easier by translating documents in a MongoDB database to objects in the program.
var mongoose = require("mongoose");
//esquema de la base d datos : crea un objeto tipo esquema 
var Schema = mongoose.Schema;

//esquema modelo usuario 
var UserSchema = Schema({
	name : String,
	surname : String,
	email : String,
	password : String,
	role : String,
	image : String	
	//el id ya lo crea automáticamente mongodb
});

//exportamos el modelo : User (nombre de la entidad, esquema user)
//así tenemos un objeto user que podremos instanciar
module.exports = mongoose.model('User', UserSchema);
