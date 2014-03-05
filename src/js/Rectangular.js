angular.module('Rectangular',[]);

angular.module('Rectangular')
.service("ngWorld",function(){
	 var world = {};
	 this.scale = 30;

	 this.addElement = function(definition) {
	 	 world.CreateBody(definition.b)
		 .CreateFixture(definition.f);
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

.service('ngrLoop', function(){
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
			height: 2,
			width: 2,
			x: 10,
			y: 1,
			radius: 1,
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

   		console.log("Options?", options)

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


	 this.getFloor = function() {
	 	 	var SCALE = ngWorld.scale;
		 	   
 	     var fixDef = new b2FixtureDef;
 	     var bodyDef = new b2BodyDef;
 	   
 	     bodyDef.type = b2Body.b2_staticBody;
 	    
 	     bodyDef.position.x = 300 / 2 / SCALE;
 	     bodyDef.position.y = 350 / SCALE;
 	     
 	     fixDef.shape = new b2PolygonShape;
 	    
 	     fixDef.shape.SetAsBox((600 / SCALE) / 2, (10/SCALE) / 2);

 	 	  return {b:bodyDef, f:fixDef};
	 }
})

.directive('ngBox',function(ngWorld, ngBox){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
  		var box = ngBox.shape("box")
  		ngWorld.addElement(box);
		}
	}
})
.directive('ngCircle',function(ngWorld, ngBox){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
  		var circle = ngBox.shape("ellipse");
  		ngWorld.addElement(circle);
		}
	}
})