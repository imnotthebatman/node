'use strict'

//importar jwt
var jwt = require("jwt-simple");

//para crear el token: fechas creación y expiración
//importar
var moment = require("moment");

//variable secreta
var secret = 'clave_secreta_curso';

//método crear token: le pasamos el objeto usuario
exports.createToken = function(user){
	//datos que se van a codificar
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(), //creacion
		exp: moment().add(30,'days').unix() //que expire a los 30 días 
		
	};
	
	//devolver el token codificado, secret es una clave secreta 
	return jwt.encode(payload, secret);
	
	
};