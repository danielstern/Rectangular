angular.module('Rectangular')
.service('ngrDisplay',function(ngrStage,ngrState,ngrActor){

	var nd = this;
	this.skin = function(body, options) {

		//console.log("Skinning",body);

		 var f = body.GetFixtureList();
		 var s = f.GetShape();


		 //console.log('s?',s);


		var defaults = {
			height: 1,
			width: 1,
			snapToPixel: true,
			mouseEnabled: false,
			y: 1,
			x: 10,
			angle: 0,
			src:''
		};

		 if (s.constructor == b2CircleShape) {
		 	//console.log("it's a circle");
		 	defaults.radius = s.GetRadius();
		 } else {
		 	 //console.log("it's a square.");
		 	 //window.square = s;
		 	 var v = s.GetVertices();
		 	 var height = v[2].y - v[0].y;
		 	 var width = v[1].x - v[0].x;
		 	 //console.log("HW?",height,width);
		 	 defaults.height = height;
		 	 defaults.width = width;
		 }


		options = _.extend(defaults,options);

		var env = ngrState.getProperties();

		var stage = ngrStage.stage;
		var imgData;

		imgData = new createjs.Bitmap(options.src || 'img/null.png');
		
		if (options.radius) {
			options.width = options.radius * 2 * env.SCALE;
			options.height = options.radius * 2 * env.SCALE;
		} else {
			options.width = options.width * env.SCALE;
			options.height = options.height * env.SCALE;
		}


		function checkImageReady() {

			 var img = imgData.image;
			 if (img.width) {
			 		return true;
			 } else {
			 		return false;
			 }
		};

		var imgInt = setInterval(function(){
			if (checkImageReady()){

				clearInterval(imgInt);
				initImg();
			}
		}, 1);

		function initImg() {

			var img = imgData.image;

			if (options.bg != 'tiled') {

				var scaleY = options.height / img.height;
				var scaleX = options.width / img.width;

				var regY = (img.height) / 2;
				var regX = (img.width) / 2;

				imgData.scaleX = scaleX;
				imgData.scaleY = scaleY;

				imgData.regX = regX;
				imgData.regY = regY;

				imgData.snapToPixel = options.snapToPixel;
				imgData.mouseEnabled = options.mouseEnabled;
				stage.addChild(imgData);

				var actor = ngrActor.newActor(body, imgData);
				ngrStage.actors.push(actor);

			} else {

				var container = nd.tile(img, options) //new createjs.Container();

				stage.addChild(container);

				var actor = ngrActor.newActor(body, container);
				ngrStage.actors.push(actor);

				window.imgData = imgData;

			}

			return actor;

		}
	};

	this.tile = function(img, options) {

		var container = new createjs.Container();
		var SCALE = ngrState.SCALE;

		var regX = 0;
		var regY = 0;

		var config = {};
		config.totalColumns = Math.ceil(options.width * 2 / img.width);
		config.totalRows = Math.ceil(options.height * 2 / img.height);
		config.totalTiles = config.totalColumns * config.totalRows;
		config.tiles = [];
		config.options = options;
		config.img = img;

		config.totalBitmapWidth = config.totalColumns * img.width / 2;
		config.totalBitmapHeight = config.totalRows * img.height / 2;

		config.objectHeight = options.height;
		config.objectWidth = options.width;

		config.scaleX = config.objectWidth / config.totalBitmapWidth;
		config.scaleY = config.objectHeight / config.totalBitmapHeight;

		function Tile() {
			this.x;
			this.y;
			this.width;
			this.height;
		}

		for (var i = 0; i < config.totalColumns; i++) {
			for (var k = 0; k < config.totalRows; k++) {
					var t = new Tile();

					t.x = (i * config.img.width) + config.img.width;
					t.y = (k * config.img.height) + config.img.height;

					t.scaleX = config.scaleX;
					t.scaleY = config.scaleY;
					t.src = config.options.src;
					config.tiles.push(t);
			}
		}

		console.log("Config?",config);

		_.each(config.tiles,function(tile){
			var	_imgData = new createjs.Bitmap(tile.src || 'img/null.png');

			_imgData.regY = tile.y;
			_imgData.regX = tile.x;

			_imgData.scaleX = t.scaleX;
			_imgData.scaleY = t.scaleY;

			container.addChild(_imgData);
		});

		container.regX = - options.width;
		window.c = container;
	//  container.regX = container.getBounds().width / 2;
		container.regY = - options.height;
//		container.regY = container.getBounds().height / 2;

		console.log("Container?",container);


		return container;

	}

	this.background = function(src) {
		var	_imgData = new createjs.Bitmap(src || 'img/null.png');
		console.log("Backgrounding, ",src);
		ngrStage.stage.addChild(_imgData);
	}
})
