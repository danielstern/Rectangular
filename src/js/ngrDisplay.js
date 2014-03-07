angular.module('Rectangular')
.service('ngrDisplay',function(ngrStage,ngrState,ngrActor){
	this.skin = function(body, options) {

		var defaults = {
			height: 100,
			width: 100,
			snapToPixel: true,
			mouseEnabled: false,
			y: 1,
			x: 10,
			angle: 0,
			src:''
		};

		options = _.extend(defaults,options);

		var env = ngrState.getProperties();

		var stage = ngrStage.stage;
		var imgData;

		if (options.src) {
			imgData = new Bitmap(options.src);
		} else {
			imgData = new Bitmap('img/null.png');
		}

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

			var scaleY = options.height / img.height;
			var scaleX = options.width / img.width;

			var regY = (img.height) / 2;
			var regX = (img.width) / 2;

			imgData.x = options.x;
			imgData.y = options.y;
			imgData.scaleX = scaleX;
			imgData.scaleY = scaleY;

			imgData.regX = regX;
			imgData.regY = regY;

			imgData.snapToPixel = options.snapToPixel;
			imgData.mouseEnabled = options.mouseEnabled;
			stage.addChild(imgData);

			var actor = ngrActor.newActor(body, imgData);
			ngrStage.actors.push(actor);

			return actor;
		}

	}
})
