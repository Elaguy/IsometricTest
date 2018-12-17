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
		[2, 1, 1, 1, 1, 2],
		[1, 0, 0, 0, 0, 1],
		[1, 0, 2, 2, 0, 1],
		[1, 0, 2, 2, 0, 1],
		[1, 0, 0, 0, 0, 1],
		[2, 1, 1, 1, 1, 2]
	];
	
	level.map = [
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	];

	level.tileWidth = 64;
	level.tileHeight = 31;
	
	level.tile0;
	level.tile1;
	level.tile2;
	
	level.type;
	
	level.wholeMapX;
	level.wholeMapY;
	level.wholeMap;
	
	// or: mapToScreen
	level.cartToIso = function(pt) {
		var tempPt = new Point(0, 0);
		
		var offsetX = (app.canvas.width/2) - (level.tileWidth/2);
		var offsetY = (app.canvas.height/2) - (level.tileHeight/2) - ((app.level.map.length * level.tileHeight)/2) + (app.level.tileHeight/2);
		
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
    app.ctx = canvas.getContext("2d");
	
	app.fps = 60; // target fps
	app.dt;
	app.gameStop = false;
	app.gamePaused = false;
	
	app.keys = [];
	
	app.level = new Level();
	
	app.run = function() {
		app.init();
	
		app.last = (new Date()).getTime();
		
		app.gameInterval = setInterval(app.gameLoop, 1000/app.fps);
	};
	
	app.init = function() {
		app.initMap();
		app.initImages();
	}
	
	app.initMap = function() {
		var tempX = app.level.cartToIso(new Point(0, 5));
		var tempY = app.level.cartToIso(new Point(0, 0));
		app.level.wholeMap = new Point(tempX.x, tempY.y);
	}
	
	app.initImages = function() {
		var sheet = new Image();
		sheet.src = "img/tiles.png";
		
		app.level.tile0 = new Sprite(sheet, 0, 0, app.level.tileWidth, app.level.tileHeight);
		app.level.tile1 = new Sprite(sheet, 64, 0, app.level.tileWidth, app.level.tileHeight);
		app.level.tile2 = new Sprite(sheet, 128, 0, app.level.tileWidth, app.level.tileHeight);
		
		app.level.type = [app.level.tile0, app.level.tile1, app.level.tile2];
	}
	
	app.gameLoop = function() {
		var current = (new Date()).getTime();
		var dt = (current - app.last) / 1000;
		
		app.draw();
		
		if(!app.gameStop || !app.gamePaused)
			app.update(dt);
		
		app.last = current;
	};
	
	app.update = function(dt) {
	
	};
	
	app.draw = function() {
		app.ctx.fillStyle = "black"; 
		app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
		
		app.drawMap();
		
		// for debugging:
		//app.ctx.strokeStyle = "white";
		//app.ctx.strokeRect(app.level.wholeMap.x, app.level.wholeMap.y, 
		//	app.level.map[0].length * app.level.tileWidth, app.level.map.length * app.level.tileHeight);
	};
	
	app.drawMap = function() {
		for(var i = 0; i < app.level.map.length; i++) {
			for(var j = 0; j < app.level.map[i].length; j++) {
				var tile = app.level.type[app.level.map[i][j]];
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
}

var app = new App();

window.onload = app.run;
