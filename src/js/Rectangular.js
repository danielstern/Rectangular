angular.module('Rectangular',[])
.service('ngrEnvironment',function(ngWorld,ngStage,ngrState,ngBox,ngrDebug,ngrLoop,display){

	var world;

	var envHeight;
	var envWidth;
	var canvas;
	var env = {};
	var ngEnv = this;
	var SCALE = 30;


	this.init = function(_canvas){
		env.height = _canvas.height;
		env.width = _canvas.width;
		env.SCALE = SCALE;
		ngrState.setProperties(env);
		canvas = _canvas;
		world = ngWorld.setWorld(0,30,true);
		ngrLoop.initWorld(60,env);
	}

	this.stop = function() {
		ngrLoop.stop();
	}

	this.addHook = ngrLoop.addHook;
	this.clearHooks = ngrLoop.clearHooks;

	this.floor = ngWorld.floor;
	this.room = ngWorld.room;
	this.leftWall = ngWorld.leftWall;
	this.rightWall = ngWorld.rightWall;
	

	this.debug = function(_debugCanvas) {
		var ctx = _debugCanvas.getContext('2d');
    ngrDebug.debug(ctx);
	}

})

.service('ngrState',function(){
	 var properties;
	 var state = this;
	 this.state = properties;
	 this.SCALE = 30;

	 this.setProperties = function(_properties) {
	 		properties = _properties;
	 		state.SCALE = properties.SCALE;

	 }

	 this.getProperties = function() {
	 		if (!properties) {
	 			throw new Error("Attempting to access undefined properties.")
	 		}
	 		return properties;
	 }


})


.service('ngrLoop', function(ngWorld, ngStage){
	var l = this;
	var ctx = ngStage.context;
	var speed = 60;
	var loop;
	var world;
	var hooks = [];

	this.tick = function() {
		world = ngWorld.getWorld();
		ctx.save();
		world.Step(1/60,10,10)
		world.ClearForces();
		world.DrawDebugData();
		ctx.restore();
		ngStage.stage.update();
		_.each(ngStage.actors,function(actor){
				actor.update();
		})

		_.each(hooks,function(hook){
			hook();
		})
	}

	this.addHook = function(func) {
		hooks.push(func);
	};

	this.clearHooks = function() {
		hooks = [];
	}

	this.stop = function() {
		clearInterval(loop);
	}

	this.initWorld = function(_speed) {
		speed = _speed;
//		console.log("Initigin world")
		loop = setInterval(l.tick, 1000 / speed)
	};
})

.service('ngrDebug',function(ngWorld){
	this.debug = function(ctx) {

		var world = ngWorld.getWorld();
			var debugDraw = new b2DebugDraw();
			var scale = ngWorld.SCALE;
			debugDraw.SetSprite(ctx);
			debugDraw.SetDrawScale(scale);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
		}
})





.service('display',function(ngStage,ngrState,ngActor){
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
		console.log("env:display?",env)

		var stage = ngStage.stage;
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

			var actor = ngActor.newActor(body, imgData);
			ngStage.actors.push(actor);

			return actor;
		}

	}

	

})
