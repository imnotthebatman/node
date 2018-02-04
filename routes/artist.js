'use strict'

//cargar extpress para poder crear nuevas rutas 
var express = require("express");
//cargar artist controllers
var ArtistController = require("../controllers/artist");
//el router y ya podemos crear rutas con las funciones get/post/put
var api  = express.Router();
//midleware autenticaion
var md_auth = require("../middlewares/authenticated");



//para la subida imagenes
//para subir ficheros modulo
var multipart = require("connect-multiparty");
//middleare para subida dónde subir las imagenes usuario
var md_upload = multipart({uploadDir: "./uploads/artists"});






//rutas
api.get('/artist/:id',md_auth.ensureAuth , ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth , ArtistController.saveArtist); //guardar artista
//mostrar artistas
api.get('/artists/:page?',md_auth.ensureAuth , ArtistController.getArtists);
//put actualizar artistas
api.put('/artist/:id',md_auth.ensureAuth , ArtistController.updateArtist);
//borrar artista
api.delete('/artist/:id',md_auth.ensureAuth , ArtistController.deleteArtist);
//subida imagenes
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload],ArtistController.uploadImage);
//obtener imagen
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);



//exportamos los métodos del api
module.exports = api;