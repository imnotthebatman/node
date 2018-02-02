'use strict'
//importar jwt
var jwt = require("jwt-simple");
//para crear el token: fechas creación y expiración
var moment = require("moment");
//variable secreta
var secret = 'clave_secreta_curso';


//creo método 
exports.ensureAuth = function(req,res,next){
	//va a recibir todos los parámetros y valores	
	//comprobar si el header existe
	if(!req.headers.authorization){//propiedad del header authorization
		return res.status(403).send({message: "la petición no tiene la cabecera de authentication"});
	}
	//si existe autorización (le quitamos las "" al token).
	var token = req.headers.authorization.replace(/['"]+/g,"");	
	
	//decodificar el token
	try{
		//decodifico  y guardo en un objeto payload
		var payload = jwt.decode(token,secret);
		
		if(payload.exp <= moment().unix()){ //si ya ha pasado la fecha de expliración 
			return res.status(401).send({message: "El token ha expirado "});			
		}
		
	}catch(ex){
		console.log(ex);
		return res.status(404).send({message: "El token no es válido"});
	}
	//le añadimos una propiedad a request (si no he salido con  un return antes)
	req.user = payload;
	
	next(); //para salir del middleware 
	
};