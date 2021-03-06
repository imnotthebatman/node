'use strict'

//para trabajar con los ficheros del sistema
var fs = require("fs");
var path = require("path");


//encriptar contraseña
var bcrypt = require("bcrypt-nodejs");
//para el save User importo el modelo 
var User = require('../models/user');
//para el token
var jwt = require("../services/jwt");










//método
function pruebas(req,res){
	res.status(200).send({
		message : 'Probando una acción del controlador de usuarios del api rest con node'
		
	});
}

//para guardar usuarios
function saveUser(req,res){
	//tenemos que importar el modelo (var user): ver arriba
	//creo un objeto tipo user
	var user = new User();
	
	//parámetros que llegan por post (req)
	var params = req.body;
	
	
	//ver que nos llegan
	console.log(params);
	//ver que nos llegan
	//console.log(params.password);
	
	//valores que le doy
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	//la contraseña la encripto	
	user.role = "ROLE_USER";
	user.image = "null";
	
	//contraseña encriptada
	if(params.password){
		
		
		//encriptar contraseña y guardar datos, le paso tb una función de callback
		bcrypt.hash(params.password,null,null, function(err,hash){
			//si ningún error le asigno al pass del usuario el valor del hash
			user.password = hash;
			//compruebo que los otros valores no estén vacíos
			if(user.name!=null && user.surname !=null && user.email !=null){
				//registro con el método de mongoose save
				user.save((err,userStored) => {
					if(err){
						res.status(500).send({message:"Error al guardar el usuario"});
					}else{
						//compruebo que lo ha guardado correctamente
						if(user.Stored){ //si quito el ! guarda bien 
							res.status(404).send({message: "No se ha registrado el usuario "  + err});							
						}else{
							res.status(200).send({user:userStored});
						}
					}
					
				});
			}else{
				//si incompletos no guardo 
				res.status(200).send({message:"Introduce todos los campos"});
			}
			
		});
	}else{
		//error 200
		res.status(200).send({message:"Introduce la contraseña"});
	}
	
	
}


function loginUser(req,res){
	//comprobar si el email y la contraseña coinciden 
	var params = req.body
	
	var email = params.email;
	var password = params.password;
	
	
	//utilizamos el modelo user para hacer un find, la función puede error o devolver un user
	User.findOne({email: email.toLowerCase()}, (err,user) => {
		if(err){
			res.status(500).send({message :"Error en la petición"});
			
		}else{ //usuario existe o no
			if(!user){
					res.status(404).send({message:"Usuario no existe"});
			}else{ //compruebo contraseña, user.password hace referencia a lo que recibo
				bcrypt.compare(password,user.password, function(err,check){
					
					
					
					//corregir esto del password 
					//console.log(password);
					//console.log(user.password);
					
					
					
					
					if(check){
						//check correcto datos del usuario logeado
						if(params.gethash){
							//guardar en un token todos los datos del usuario
							//en cada petición se envía el token
							//devuelve un token de jwt
							//el middleware comprueba si el token es correcto
							
							//respuesta http con el token
							
							
							res.status(200).send({ //propiedad llamada token
								token: jwt.createToken(user)								
							});
						}
						else{ //el nombre de la propiedad es user si no indico otra cosa
							res.status(200).send({user});
						}
					}else{ //error contraseña incorrercta 
						res.status(404).send({message:"Contraseña incorrecta"});
					}
					
					
				});
			}
			
		}
	
	});
	
	
}


//actualizar usuarios
function updateUser(req,res){
	//lleva variable por url
	var userId = req.params.id;
	//conseguir el body del post 
	var update = req.body;
	
	//userId es el idactual, update los queremos modificar
	User.findByIdAndUpdate(userId,update,(err,userUpdated)=> {
		if(err){
			res.status(500).send({message:"Error al actualizar el usuario"});			
		}else{
			if(!userUpdated){
				res.status(404).send({message:"No se ha podido actualizar el usuario"});				
			}
			else{
				res.status(200).send({user:userUpdated});
			}
		}
		
		
	});
	
}


//método del controlador
function uploadImage(req,res){
	//id usuario
	var userId = req.params.id;
	//nombre fichero por defecto no subido
	var fileName = "No subido...";	
	//si viene algo por files
	if(req.files){
			// fichero que vamos a subir 
			var file_path=req.files.image.path;
			
			//voy a recortar el filepath
			var file_split = file_path.split('\\');//array
			var file_name = file_split[2];
			
			//extension
			var ext_split = file_name.split('\.');
			var file_ext = ext_split[1];
			
			
			//comprobar extension
		if(file_ext == "png" || file_ext == "jpg" || file_ext == "gif"){
			 //subir imagen	
			 User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) =>{			
					if(!userUpdated){
						res.status(404).send({message:"No se ha podido actualizar el usuario"});				
					}
					else{
						res.status(200).send({user:userUpdated});
					}				 
			 });		
			console.log(ext_split);		
		}else{
			res.status(200).send({message:"no ha subido ninguna imagen"});
		}

	}

};





//función para obtener la imagen
function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file ="./uploads/users/" + imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			//en vez de dar una respuesta envía el fichero
			res.sendFile(path.resolve(path_file));
			
		}else{
			res.status(200).send({message:"No existe la imagen"});
		}
		
	});
	
}


//para usarla
module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};