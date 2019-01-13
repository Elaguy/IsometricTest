/*
	HTML5 Basic Isometric Graphics Tech Demo
	
	isometricTest.js - Includes rendering, maps,
	and other important elements.
	
	See LICENSE.txt.
	
	= Includes mapIO.js =
*/

var Tile = function(img, imgX, imgY, imgW, imgH) {
	var tile = this;
	
	tile.img = img;
	
	tile.imgX = imgX;
	tile.imgY = imgY;
	tile.imgW = imgW;
	tile.imgH = imgH;
}

var Sprite = function(img, imgX, imgY, imgW, imgH) {
	var sprite = this;
	
	sprite.img = img;
	
	sprite.imgX = imgX;
	sprite.imgY = imgY;
	sprite.imgW = imgW;
	sprite.imgH = imgH;
}

var Point = function(x, y) {
	var point = this;
	
	point.x = x;
	point.y = y;
}

var Level = function() {
	var level = this;
	
	level.map = [
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 2, 2, 1, 1, 1, 1, 2, 2, 2],
		[2, 2, 2, 1, 3, 3, 1, 1, 2, 2],
		[2, 2, 1, 1, 3, 3, 3, 1, 2, 2],
		[2, 2, 1, 3, 3, 3, 1, 1, 2, 2],
		[2, 2, 1, 1, 1, 3, 1, 1, 2, 2],
		[2, 2, 2, 2, 1, 1, 1, 2, 2, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
	];
	
	level.sprites = [
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
	];
	
	level.tileWidth = 64;
	level.tileHeight = 31;
	
	level.tileTypes = [];
	level.spriteTypes = [];
	
	// or: mapToScreen
	level.cartToIso = function(pt) {
		var tempPt = new Point(0, 0);
		
		var offsetX = (app.canvas.width/2) - (level.tileWidth/2);
		var offsetY = (app.canvas.height/2) - (level.tileHeight/2) - ((app.level.map.length * level.tileHeight)/2) + (level.tileHeight/2);
		
		tempPt.x = ((pt.x - pt.y) * (level.tileWidth/2)) + offsetX;
		tempPt.y = (pt.x + pt.y) * (level.tileHeight/2) + offsetY;
		
		return tempPt;
	};
	
	// or: screenToMap
	level.isoToCart = function(pt) {
		var tempPt = new Point(0, 0);
	
		tempPt.x = (2 * pt.y + pt.X) / 2;
		tempPt.y = (2 * pt.y - pt.x) / 2;
		
		return tempPt;
	};
}

var App = function() {
	var app = this;
    app.canvas = document.getElementById("canvas");
    app.ctx = app.canvas.getContext("2d");
	
	app.fps = 60; // target fps
	app.dt;
	app.gameStop = false;
	app.gamePaused = false;
	
	app.keys = [];
	
	app.level = new Level();
	app.mapIO = new MapIO();
	
	app.run = function() {
		app.init();
	
		app.last = (new Date()).getTime();
		
		app.gameInterval = setInterval(app.gameLoop, 1000/app.fps);
	};
	
	app.init = function() {
		app.initImages();
		app.initSprites();
		app.mapIO.initMapLoad();
	};
	
	app.initImages = function() {
		var sheet = new Image();
		sheet.src = "img/tiles.png";
		
		app.level.tileTypes.push(new Tile(sheet, 0, 0, app.level.tileWidth, app.level.tileHeight));
		app.level.tileTypes.push(new Tile(sheet, 64, 0, app.level.tileWidth, app.level.tileHeight));
		app.level.tileTypes.push(new Tile(sheet, 128, 0, app.level.tileWidth, app.level.tileHeight));
		app.level.tileTypes.push(new Tile(sheet, 192, 0, app.level.tileWidth, app.level.tileHeight));
	};
	
	app.initSprites = function() {
		var sheet = new Image();
		sheet.src = "img/buildings.png";
		
		app.level.spriteTypes.push(new Sprite(sheet, 0, 0, 36, 59));
	};
	
	app.gameLoop = function() {
		var current = (new Date()).getTime();
		var dt = (current - app.last) / 1000;
		
		app.draw();
		
		if(!app.gameStop || !app.gamePaused)
			app.update(dt);
		
		app.last = current;
	};
	
	app.update = function(dt) {
		app.checkMapLoaded();
		app.checkSpritesLoaded();
		app.checkResetSprites();
	};
	
	app.checkMapLoaded = function() {
		if(app.mapIO.mapLoaded == true) {
			app.level.map = app.mapIO.map;
		}
	};
	
	app.checkSpritesLoaded = function() {
		if(app.mapIO.spritesLoaded == true) {
			app.level.sprites = app.mapIO.sprites;
		}
	};
	
	app.checkResetSprites = function() {
		if(app.mapIO.resetSprites == true) {
			app.level.sprites = [
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
			];
		}
	};
	
	app.draw = function() {
		app.ctx.fillStyle = "black"; 
		app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
		
		app.drawMap();
		app.drawSprites();
		
		// for debugging:
		//app.ctx.strokeStyle = "white";
		//app.ctx.strokeRect(app.level.wholeMap.x, app.level.wholeMap.y, 
		//	app.level.map[0].length * app.level.tileWidth, app.level.map.length * app.level.tileHeight);
	};
	
	app.drawMap = function() {
		for(var i = 0; i < app.level.map.length; i++) {
			for(var j = 0; j < app.level.map[i].length; j++) {
				var tile = app.level.tileTypes[app.level.map[i][j]];
				var x = j;
				var y = i;
				var isoPt = app.level.cartToIso(new Point(x, y));
				
				// for debugging:
				//app.ctx.strokeStyle = "white";
				//app.ctx.strokeRect(isoPt.x, isoPt.y, app.level.tileWidth, app.level.tileHeight);
				
				app.ctx.drawImage(tile.img, tile.imgX, tile.imgY,
					tile.imgW, tile.imgH, isoPt.x, isoPt.y, app.level.tileWidth, app.level.tileHeight);
			}
		}
	};
	
	app.drawSprites = function() {
		for(var i = 0; i < app.level.map.length; i++) {
			for(var j = 0; j < app.level.map[i].length; j++) {
				if(app.level.sprites[i][j] != -1) {
					var sprite = app.level.spriteTypes[app.level.sprites[i][j]];
					var x = j;
					var y = i;
					var isoPt = app.level.cartToIso(new Point(x, y));
					var offsetX = (app.level.tileWidth/2) - (sprite.imgW/2);
					var offsetY = (app.level.tileHeight/2) - (sprite.imgH/2) - (sprite.imgH * 0.339);
				
					app.ctx.drawImage(sprite.img, sprite.imgX, sprite.imgY,
						sprite.imgW, sprite.imgH, isoPt.x + offsetX, isoPt.y + offsetY, sprite.imgW, sprite.imgH);
				}
			}
		}
	};
}

var app = new App();

window.onload = app.run;

