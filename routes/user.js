'use strict'

//cargar extpress
var express = require("express");
//cargar user controllers
var UserController = require("../controllers/user");

//el router y ya podemos crear rutas
var api  = express.Router();

//cargar middleware en objeto 
var md_auth = require("../middlewares/authenticated");

//para subir ficheros modulo
var multipart = require("connect-multiparty");
//middleare para subida dónde subir las imagenes usuario
var md_upload = multipart({uploadDir: "./uploads/users"});



//¿cómo crear una ruta? api.get('ruta',metodo a cargar);
//api.get('/probando-controlador', UserController.pruebas);
//para usarlo como middleware segundo parámetro 
api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
//prueba post
api.post('/register', UserController.saveUser);
//login por post
api.post('/login', UserController.loginUser);
//para el update put: para actualizar id? es opcional,sino oblig / oblig autent /
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//subida imagenes
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload],UserController.uploadImage);
//obtener imagen
api.get('/get-image-user/:imageFile', UserController.getImageFile);

//exportar
module.exports = api;
