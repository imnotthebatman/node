'use strict' //meter nuevas instrucciones de javascript 

//cargar el móduclo de mongodb
var mongoose = require('mongoose');

//cargamos el app
var app = require("./app");
//configuramos puerto por defecto 3977
var port = process.env.PORT || 3977; 

//hacer la conexión
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err,res) => {
	if(err){
		throw err;
	}else{
			console.log("La conexión a la  bd está corriendo correctament ee");
			//poner el servidor a escuchar
			app.listen(port,function(){
				console.log("servidor del app escuchando en localhost:3977");
				
			});
	}
	
	
});
