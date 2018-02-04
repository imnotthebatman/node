'use strict'

//variables sistema de ficheros
var path = require("path");
var fs = require("fs");


//necesito modelos album artista y canción
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


//método obtener artista
function getArtist(req,res){
	res.status(200).send({message: "método get artist"});	
	
}


//exportar
module.exports = {
	getArtist
	
};