angular.module('Rectangular',[])
.directive('ngStage',function(ngWorld, ngBox, ngrDebug, ngrLoop){
	console.log("Compinling directive");
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			console.log("New stage",elem, attrs)
			var ctx = $(elem).get(0).getContext('2d');

			// create world
			var world = ngWorld.setWorld(0,-8,true);

			// demo box function
			var box = ngBox.getBox(1, 1, 2,2);

			// debugging block
			ngrDebug.debug(ctx);

			ngrLoop.initWorld(ctx,world, 60);

				


		}
	}
});

angular.module('Rectangular')
.service("ngWorld",function(){
	 var world = {};
	 this.setWorld = function(gravityX, gravityY, sleep) {

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
		ctx.translate(0 , 200);
		ctx.scale(1 , -1);
		world.Step(1/60,10,10)
		world.DrawDebugData();
		ctx.restore();
	//	console.log("ticking");
	}

	this.initWorld = function(_context,_world,_speed) {
		ctx = _context;
		world = _world;
		speed = _speed;
		console.log("initng");

		loop = setInterval(l.tick, 1000 / speed)
	}
})
.service('ngrDebug',function(ngWorld){
	this.debug = function(ctx) {
	console.log("Debugging");
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
		         'friction' : 0.0 ,
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
		      
		     var b = world.CreateBody( body_def );
		     var f = b.CreateFixture(fix_def);
		      
		     return b;

	 }
})