'use strict'

//variables sistema de ficheros
var path = require("path");
var fs = require("fs");
var mongoosePaginate = require("mongoose-pagination");


//necesito modelos album artista y canción
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


//método obtener artista
function getArtist(req,res){
	var artistId = req.params.id;
	
	//va a guardar por el artistId en mongo
	Artist.findById(artistId, (err,artist) =>{
		if(err){
			res.status(500).send({message: "Error en la petición"});	
		}else{
			//comprobar que el artista llega ok
			if(!artist){
				res.status(404).send({message: "Artista no existe"});	
			}
			else{//si ok devuelve objeto artista
				res.status(200).send({artist});	
			}
		}
		
	});	
}



//guardar artista
function saveArtist(req,res){
	//objeto artista
	var artist  = new Artist();
	
	//parámetros que recogemos
	var params = req.body;
	
	artist.name = params.name;
	artist.description = params.description;
	artist.image = "null"; 
	
	
	//gauardar el artista
	artist.save((err,artistStored)=>{
		if(err){
			res.status(500).send({message: "Error guardando artista"});				
		}else{
			if(!artistStored){
				res.status(404).send({message: "El artista no ha sido guardado"});	
			}else{
				res.status(200).send({artist: artistStored});	
			}
			
		}
		
		
	});
	
	
}


//obtener artistas
function getArtists(req,res){
	
	//como vamos a paginar
	//si paso paginas
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	
	var itemsPerPage = 3;
	//consulto todo ordenado por nombre
	Artist.find().sort("name").paginate(page, itemsPerPage, function(err, artists, total){
		if(err){
			res.status(500).send({message: "Error en la petición"});		
		}else{
			if(!artists){
				res.status(404).send({message: "No hay artistas"});		
			}else{
				return res.status(200).send({
					totalitems : total,
					artist : artists
				});
			}
			
		}
	});
	
	
	
	
}



function updateArtist(req,res){
	
	var artistId = req.params.id;
	//y por post en el body
	var update = req.body;
	
	//buscar en la base de datos
	Artist.findByIdAndUpdate(artistId,update,(err,artistUpdated) =>{
		if(err){
			res.status(500).send({message: "Error en la petición"});	
		}else{
			if(!artistUpdated){
				res.status(404).send({message: "El artista no ha sido actualizado"});	
			}else{
				res.status(200).send({artist:artistUpdated});
			}
		}
	});
	
}




function deleteArtist(req,res){
	//borrar artista/ albumes y canciones
	var artistId = req.params.id; //recibo por url 
	
	Artist.findByIdAndRemove(artistId, (err,artistRemoved) =>{
		if(err){
			res.status(500).send({message: "Error en la petición"});
		}else{
			if(!artistRemoved){
				res.status(404).send({message: "El artista no ha sido eliminado"});
			}else{
				//res.status(200).send({artistRemoved});
				//console.log(artistRemoved);
				
				//buscar albumes
				Album.find({artist: artistRemoved._id}).remove((err,albumRemoved)=>{
					if(err){
						res.status(500).send({message: "Error en la petición"});
					}else{
							if(!albumRemoved){
								res.status(404).send({message: "El album no ha sido eliminado"});
							}else{
								//res.status(200).send({albumRemoved});
								//borrar las canciones
								Song.find({album: albumRemoved._id}).remove((err,songRemoved)=>{
									if(err){
										res.status(500).send({message: "Error en la petición"});
									}else{
											if(!songRemoved){
												res.status(404).send({message: "La canción no ha sido eliminado"});
											}else{
												res.status(200).send({artist : artistRemoved});
											}
									}
								});
							}
					}
				});
				
				
			}
		}
	
	
	});
		
		
	
	
	
	
}


function uploadImage(req,res){
	//recibimos por url
	var artistId = req.params.id;
	var file_name = "No subido"; //valor por defecto 
	
	//usar el middleware para subir la imagen 
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
			 //subir imagen	(Artist es la colección de mongodb)
			 Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) =>{			
					if(!artistUpdated){
						res.status(404).send({message:"No se ha podido actualizar el artista"});				
					}
					else{
						res.status(200).send({artist:artistUpdated});
					}				 
			 });		
			console.log(ext_split);		
		}else{
			res.status(200).send({message:"no ha subido ninguna imagen"});
		}
	}
}



//función para obtener la imagen
function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file ="./uploads/artists/" + imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			//en vez de dar una respuesta envía el fichero
			res.sendFile(path.resolve(path_file));
			
		}else{
			res.status(200).send({message:"No existe la imagen"});
		}
		
	});
	
}



//exportar
module.exports = {
	getArtist,
	saveArtist,
	getArtists,
	updateArtist,
	deleteArtist,
	uploadImage,
	getImageFile
	
};