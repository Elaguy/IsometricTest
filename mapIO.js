/*
	HTML5 Basic Isometric Graphics Tech Demo
	
	mapIO.js - Code for loading and saving maps.
	
	See LICENSE.txt.
	
	= isometricTest.js includes this file =
*/

var MapIO = function() {
	var mapIO = this;
	
	mapIO.map;
	mapIO.sprites;
	
	mapIO.mapLoaded = false;
	mapIO.spritesLoaded = false;
	mapIO.resetSprites = false;
	
	mapIO.initMapLoad = function() {
		var loadMapBtn = document.getElementById("loadMapBtn");
		loadMapBtn.addEventListener("click", function() {
			var file = document.getElementById("mapInput").files[0];
			var name = file.name.split(".");
			
			if(name[1] == "map") {
				mapIO.load(file);
			}
			
			else {
				console.log("Failed to load map file, not a valid .map file.");
			}
		});
	};
	
	mapIO.load = function(file) {
		var data;
		
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(e) {
			data = reader.result;
			
			if(data.includes("=")) {
				mapIO.resetSprites = false;
				
				data = data.split("=");
			
				mapIO.loadMap(data[0].split(", "));
				mapIO.loadSprites(data[1].split(", "));
			}
			
			else {
				mapIO.loadMap(data.split(", "));
				mapIO.resetSprites = true;
			}
		}
	};
	
	mapIO.loadMap = function(data) {
		//console.log(data);
	
		var mapSize;
				
		for(var j = 0; j < data.length; j++) {
			if(data[j].includes("\n")) {
				mapSize = j + 1;
				break;
			}
		}
			
		mapIO.map = mapIO.initEmpty2DArray(mapSize);	
		
		//console.log(mapIO.map);
		//console.log(data.length);
		
		var i = 0;
		for(var j = 0; j < data.length; j++) {
			if(data[j].includes("\n")) {
				var index = data[j].indexOf("\n");
				mapIO.map[i].push(data[j].substring(0, index));
					
				i++;
					
				if((data[j].substring(index+1, data[j].length)) != "") {
					mapIO.map[i].push(data[j].substring(index+1, data[j].length));
				}
			}
				
			else {
				mapIO.map[i].push(data[j]);
			}
		}
			
		mapIO.mapLoaded = true;
	};
	
	mapIO.loadSprites = function(data) {
		var index = data[0].indexOf("\n");
		data[0] = data[0].substring(index+1);
		//console.log(data);
	
		var spritesArraySize;
				
		for(var j = 0; j < data.length; j++) {
			if(data[j].includes("\n")) {
				spritesArraySize = j + 1;
				break;
			}
		}
		
		mapIO.sprites = mapIO.initEmpty2DArray(spritesArraySize);	
		
		//console.log(mapIO.sprites);
		
		var i = 0;
		for(var j = 0; j < data.length; j++) {
			if(data[j].includes("\n")) {
				var index = data[j].indexOf("\n");
				mapIO.sprites[i].push(data[j].substring(0, index));
					
				i++;
					
				if((data[j].substring(index+1, data[j].length)) != "") {
					mapIO.sprites[i].push(data[j].substring(index+1, data[j].length));
				}
			}
			
			else {
				mapIO.sprites[i].push(data[j]);
			}
		}
			
		mapIO.spritesLoaded = true;
	};
	
	mapIO.initEmpty2DArray = function(length) {
		var array = [];
		
		for(var i = 0; i < length; i++) {
			array[i] = [];
		}
		
		return array;
	}
}
