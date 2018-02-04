'use strict'

var express = require("express");
var bodyParser = require("body-parser");


var app = express();

//cargar rutas
var user_routes = require("./routes/user");
var artist_routes = require("./routes/artist");

//cargar bodyParser
app.use(bodyParser.urlencoded({extended:false})); //cargamos bodyparser, el extended false es por defecto
app.use(bodyParser.json());//convierte a json los datos que me pasan


//configurar las cabeceras http



//carga de rutas base 
app.use('/api',user_routes);//creamos un middleware antes de ejecutar nada, cada ruta va a tener un api delante 
app.use('/api',artist_routes);


/* Lo elimino en archivo 11  vídeo 17
app.get('/pruebas', function(req,res){
	res.status(200).send({message: "Bienvenidos al curso" });
	
});
*/

module.exports=app; //ahora ya podemos usar express 
