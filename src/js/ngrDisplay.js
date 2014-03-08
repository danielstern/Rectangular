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
		config.totalColumns = options.width * 2 / img.width;
		config.totalRows = options.height * 2/ img.height;
		config.totalTiles = config.totalColumns * config.totalRows;
		config.tiles = [];
		config.options = options;
		config.img = img;

		function Tile() {
			this.x;
			this.y;
			this.width;
			this.height;
		}

		for (var i = 0; i < config.totalRows; i++) {
			for (var k = 0; k < config.totalColumns; k++) {
					var t = new Tile();
					t.x = (i * config.img.width) + config.img.width / 2;
					t.y = (k * config.img.height) + config.img.width / 2;

					t.width = config.img.width;
					t.height = config.img.height;
					t.src = config.options.src;
					config.tiles.push(t);
			}
		}

		console.log("Config?",config);

		_.each(config.tiles,function(tile){
			var	_imgData = new createjs.Bitmap(tile.src || 'img/null.png');

			_imgData.regY = tile.x;
			_imgData.regX = tile.y;

			container.addChild(_imgData);
		});

		container.regX = - options.width;
		container.regY = - options.height;


		return container;

	}
})
