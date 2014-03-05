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
	 this.getBox = function(x, y, width, height, options) {

		 //default setting
		     var options = {
		         'density' : 1.0 ,
		         'friction' : 0.2 ,
		         'restitution' : 0.2 ,
		          
		         'linearDamping' : 0.0 ,
		         'angularDamping' : 0.0 ,
		          
		         'gravityScale' : 1.0 ,
		         'type' : b2Body.b2_dynamicBody
		     };

		     var world = ngWorld.getWorld();

		     var body_def = new b2BodyDef();
		     var fix_def = new b2FixtureDef;
		      
		     fix_def.density = options.density;
		     fix_def.friction = options.friction;
		     fix_def.restitution = options.restitution;
		      
		     fix_def.shape = new b2PolygonShape();
		      
		     fix_def.shape.SetAsBox( width , height );
		      
		     body_def.position.Set(x , y);
		      
		     body_def.linearDamping = options.linearDamping;
		     body_def.angularDamping = options.angularDamping;
		      
		     body_def.type = options.type;

		     return {b:body_def,f:fix_def};


	 };

	  this.getBall = function(x,y,radius) {

	 	 //default setting
	 	     var options = {
	 	         'density' : 1.0 ,
	 	         'friction' : 0.2 ,
	 	         'restitution' : 0.2 ,
	 	          
	 	         'linearDamping' : 0.0 ,
	 	         'angularDamping' : 0.0 ,
	 	          
	 	         'gravityScale' : 1.0 ,
	 	         'type' : b2Body.b2_dynamicBody
	 	     };

	 	     var world = ngWorld.getWorld();

	 	     var body_def = new b2BodyDef();
	 	     var fix_def = new b2FixtureDef;
	 	      
	 	     fix_def.density = options.density;
	 	     fix_def.friction = options.friction;
	 	     fix_def.restitution = options.restitution;
	 	      
	 	     fix_def.shape = new b2CircleShape();
	 	      
	 	     fix_def.shape.SetRadius( radius );
	 	      
	 	     body_def.position.Set(x , y);
	 	      
	 	     body_def.linearDamping = options.linearDamping;
	 	     body_def.angularDamping = options.angularDamping;
	 	      
	 	     body_def.type = options.type;

	 	     return {b:body_def,f:fix_def};


	  };

	 this.getFloor = function() {
	 	 	var SCALE = 30;
		 	   
 	     var fixDef = new b2FixtureDef;
 	     fixDef.density = 1.0;
 	     fixDef.friction = 0.5;
 	     fixDef.restitution = 0.2;
 	   
 	     var bodyDef = new b2BodyDef;
 	   
 	     //create ground
 	     bodyDef.type = b2Body.b2_staticBody;
 	     
 	     // positions the center of the object (not upper left!)
 	     bodyDef.position.x = 300 / 2 / SCALE;
 	     bodyDef.position.y = 350 / SCALE;

 	     bodyDef.angle = 0.01*Math.PI;
 	     
 	     fixDef.shape = new b2PolygonShape;
 	     
 	     // half width, half height. eg actual height here is 1 unit
 	     fixDef.shape.SetAsBox((600 / SCALE) / 2, (10/SCALE) / 2);
 	   //  world.CreateBody(bodyDef).CreateFixture(fixDef);

 	   return {b:bodyDef, f:fixDef};
	 }
})
.directive('ngStage',function(ngWorld, ngBox, ngrDebug, ngrLoop){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			console.log("New stage",elem, attrs)
			// debugging block
		}
	}
})
.directive('ngBox',function(ngWorld, ngBox){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			console.log("New stage",elem, attrs);
			 var box = ngBox.getBox(5, 5, 2,2);
    		ngWorld.addElement(box);
			// debugging block
		}
	}
})