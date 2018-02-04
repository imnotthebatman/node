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
api.get('/artist/:id',md_auth.ensureAuth , ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth , ArtistController.saveArtist); //guardar artista
//mostrar artistas
api.get('/artists/:page?',md_auth.ensureAuth , ArtistController.getArtists);
//put actualizar artistas
api.put('/artist/:id',md_auth.ensureAuth , ArtistController.updateArtist);
//borrar artista
api.delete('/artist/:id',md_auth.ensureAuth , ArtistController.deleteArtist);



//exportamos los métodos del api
module.exports = api;