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

		var regY = (img.height) / 2;
		var regX = (img.width) / 2;

		console.log("Options, img",options,img)

		var iterationsY = options.height / img.height * 2;

		for (iterationsY; iterationsY > 0; iterationsY--) {

			var iterationsX = options.width / img.width * 2;
		//	console.log("Iterating...");

		  var	_imgData = new createjs.Bitmap(options.src || 'img/null.png');

		  _imgData.regX = regX;
		  _imgData.regY = (options.height) - ((iterationsY - 1) * img.height);

		  container.addChild(_imgData);


		  for (iterationsX; iterationsX > 0; iterationsX--) {

		  	console.log("Iterating x...");

		    var	_imgData = new createjs.Bitmap(options.src || 'img/null.png');

		    _imgData.regY = (options.height) - ((iterationsY - 1) * img.height);
		    _imgData.regX = (options.width) - ((iterationsX - 1) * img.width);

		    container.addChild(_imgData);

		  }

		}

		return container;

	}
})
