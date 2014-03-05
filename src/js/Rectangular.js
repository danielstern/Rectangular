angular.module('Rectangular',[])

.service("ngWorld",function(){
	 var world = {};
	 this.scale = 30;
	 this.SCALE = 30;
	 this.actors = [];

	  this.stage = new Stage(document.getElementById('canvas'));
		this.stage.snapPixelsEnabled = true;

	 this.addElement = function(definition) {
	 	 var b = world.CreateBody(definition.b);
		 b.CreateFixture(definition.f);
		 return b;
	 }

	 this.setWorld = function(gravityX, gravityY, sleep) {
	 		console.log("setting world", canvas);
		 	var gravity = new b2Vec2(gravityX, gravityY);
		 	var doSleep = sleep;
		 	 
		 	world = new b2World(gravity , doSleep);

		 	return world;
	 }

	 this.getWorld = function() {
	 	return world;
	 }
})

.service('ngrLoop', function(ngWorld){
	var l = this;
	var ctx = {};
	var world = {};
	var speed = 60;
	var loop;

	this.tick = function() {
		ctx.save();
		world.Step(1/60,10,10)
		world.ClearForces();
		world.DrawDebugData();
		ctx.restore();
		ngWorld.stage.update();
		_.each(ngWorld.actors,function(actor){
			actor.update();
		})
	}

	this.initWorld = function(_context,_world,_speed) {
		ctx = _context;
		world = _world;
		speed = _speed;
		loop = setInterval(l.tick, 1000 / speed)
	}
})

.service('ngrDebug',function(ngWorld){
	this.debug = function(ctx) {

		var world = ngWorld.getWorld();
			var debugDraw = new b2DebugDraw();
			var scale = 30;
			debugDraw.SetSprite(ctx);
			debugDraw.SetDrawScale(scale);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);

		}
})

.service("ngBox",function(ngWorld){

	this.shape = function(type, options) {

		//default options
		var defaults = {
			height: 1.5,
			width: 1.5,
			x: 10,
			y: 1,
			radius: 1.5,
			density : 1.0 ,
			'friction' : 0.2 ,
			'restitution' : 0.6 ,
			'linearDamping' : 0.0 ,
			'angularDamping' : 0.0 ,
			gravityScale : 1.0 ,
			position : 'dynamic' ,
			angle: 0,
		};

		options = _.extend(defaults,options);
		options = _.each(options,function(value,key){
			if(!isNaN(Number(value))) options[key] = Number(value);
		})

		switch(type) {
			case 'box':
			case 'rectangle':
			case 'square':
				options.type = 'box';
				break;
			case 'circle':
			case 'ellipse':
				options.type = 'circle';
				break;
			default:
			console.log("Can't do that");
			return;
		}

		function NgShape(options) {
			var _shape = this;

			_shape.b = new b2BodyDef();
   		_shape.f = new b2FixtureDef;

   		var fix_def = _shape.f;
   		var body_def = _shape.b;

   		if (options.type == 'box') {
   			fix_def.shape = new b2PolygonShape();
   			fix_def.shape.SetAsBox( options.width , options.height );
   		}

   		if (options.type == 'circle') {
   			fix_def.shape = new b2CircleShape();
   			fix_def.shape.SetRadius( options.radius );
   		}


   		body_def.position.Set(options.x , options.y);


   		fix_def.density = options.density;
   		fix_def.friction = options.friction;
   		fix_def.restitution = options.restitution;


   		if (options.position == 'dynamic') {
   			body_def.type = b2Body.b2_dynamicBody;
   		}

   		body_def.angle = options.angle;


   		body_def.linearDamping = options.linearDamping;
   		body_def.angularDamping = options.angularDamping;
		}

		var s = new NgShape(options);


		return s;
	}
})



.service('display',function(ngWorld){
	this.skin = function(body, options) {

		var defaults = {
			height: 100,
			width: 100,
			snapToPixel: false,
			mouseEnabled: false,
			y: 1,
			x: 10,
			angle: 0,
			src: "img/globe.png",
		};

		options = _.extend(defaults,options);

		var stage = ngWorld.stage;

		var imgData = new Bitmap(options.src);
		//var img = imgData.image;

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
				console.log("READY!");
				clearInterval(imgInt);
				initImg();
			}
		}, 1);

		function initImg() {

			var img = imgData.image;
//			console.log("Width, height?",img.width,img.height);

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
			
			console.log("Imgdata?",imgData);

			var actor = new actorObject(body, imgData);
			ngWorld.actors.push(actor);

			return actor;
		}

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

.directive('ngCircle',function(ngWorld, ngBox,display){


	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
  		var circle = ngBox.shape("ellipse",attrs);
  		var body = ngWorld.addElement(circle);
  		var actor = display.skin(body);
  		body.SetUserData(actor); 
		}
	}
})

.directive('ngBox',function(ngWorld, ngBox,display){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
  		var box = ngBox.shape("box",attrs)
  		var body = ngWorld.addElement(box);
  		var actor = display.skin(body,{src:'img/hi.png'});
		}
	}
})