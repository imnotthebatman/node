'use strict'

//cargar extpress
var express = require("express");
//cargar user controllers
var UserController = require("../controllers/user");

//el router y ya podemos crear rutas
var api  = express.Router();

//¿cómo crear una ruta? api.get('ruta',metodo a cargar);
api.get('/probando-controlador', UserController.pruebas);
//prueba post
api.post('/register', UserController.saveUser);
//login por post
api.post('/login', UserController.loginUser);


//exportar
module.exports = api;
