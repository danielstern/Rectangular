angular.module('Rectangular',[])

.service('ngrEnvironment',function(ngWorld,ngStage,ngBox,ngrDebug,ngrLoop,display){

	var world = ngWorld.setWorld(0,30,true);
	var envHeight;
	var envWidth;
	var canvas;
	var env = this;
	var SCALE = ngWorld.SCALE;
	// create world

	this.init = function(_canvas){
		ngrLoop.initWorld(60);
	//	console.log("Canvas?",_canvas,_canvas.width);
		envHeight = _canvas.height;
		envWidth = _canvas.width;
		canvas = _canvas;
	}

	this.stop = function() {
		ngrLoop.stop();
	}

	this.room = function() {
		var world = ngWorld.getWorld();

	
		env.floor();
		env.leftWall();
		env.rightWall();

		
		//body.SetUserData(actor); 
	}

	this.floor = function(options) {
		var defaults = {
			width:envWidth / SCALE,
			height: 10 / SCALE,
			position:'static',
			y: envHeight / SCALE,
		};

		options = _.extend(defaults,options);
		
		var shape = ngBox.shape('box',options);
		var body = ngWorld.addElement(shape);
		body.SetUserData({isFloor:true})
		var actor = display.skin(body,{
			height: 20 / SCALE
		});
	}

	this.leftWall = function(options) {

		var leftWall = ngBox.shape('box',{
			width: 10 / SCALE,
			height: envHeight / SCALE,
			position:'static',
			x:0
		});
		var lBody = ngWorld.addElement(leftWall);
		display.skin(lBody,{
			width: 20 / SCALE,
		});
	}

	this.rightWall = function(options) {
		var rightWall = ngBox.shape('box',{
			width: 10 / SCALE,
			height: envHeight / SCALE,
			position:'static',
			x: (envWidth / SCALE),
		});
		var rBody = ngWorld.addElement(rightWall);
		display.skin(rBody,{
			width: 20 / SCALE,
		});

	}

	this.debug = function(_debugCanvas) {
		var ctx = _debugCanvas.getContext('2d');
    ngrDebug.debug(ctx);
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
		_.each(ngWorld.actors,function(actor){
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



.service('ngActor',function(ngWorld){
	this.newActor = function(body, skin) {
		return new actorObject(body,skin);
	}

	var actorObject = function(body, skin) {
		this.body = body;
		this.skin = skin;
		this.update = function() {  // translate box2d positions to pixels
			this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
			this.skin.x = this.body.GetWorldCenter().x * ngWorld.SCALE;
			this.skin.y = this.body.GetWorldCenter().y * ngWorld.SCALE;
			}
		}

})

