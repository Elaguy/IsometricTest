/*
	HTML5 Basic Isometric Graphics Tech Demo
	
	mapIO.js - Code for loading and saving maps.
	
	See LICENSE.txt.
	
	= isometricTest.js includes this file =
*/

var MapIO = function() {
	var mapIO = this;
	
	mapIO.map;
	mapIO.mapLoaded = false;
	
	mapIO.initMapLoad = function() {
		var loadMapBtn = document.getElementById("loadMapBtn");
		loadMapBtn.addEventListener("click", mapIO.load);
	};
	
	mapIO.load = function() {
		var input = document.getElementById("mapInput");
		var files = input.files;
		var file = input.files[0];
		var data;
		
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(e) {
			data = reader.result.split(", ");
			
			var mapSize;
				
			for(var j = 0; j < data.length; j++) {
				if(data[j].includes("\n")) {
					mapSize = j + 1;
					break;
				}
			}
			
			mapIO.map = mapIO.initEmpty2DArray(mapSize);	
			
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
		}
	};
	
	mapIO.initEmpty2DArray = function(length) {
		var array = [];
		
		for(var i = 0; i < length; i++) {
			array[i] = [];
		}
		
		return array;
	}
}
