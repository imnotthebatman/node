'use strict'

//cargar extpress para poder crear nuevas rutas 
var express = require("express");
//cargar artist controllers
var ArtistController = require("../controllers/artist");
//el router y ya podemos crear rutas con las funciones get/post/put
var api  = express.Router();
//midleware autenticaion
var md_auth = require("../middlewares/authenticated");

//rutas
api.get('/artist',md_auth.ensureAuth , ArtistController.getArtist);



//exportamos los métodos del api
module.exports = api;