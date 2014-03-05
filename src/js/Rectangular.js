angular.module('Rectangular',[])
.directive('ngStage',function(ngWorld, ngBox){
	console.log("Compinling directive");
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			var ctx = $(elem).get(0).getContext('2d');
			//console.log("Context?",scope.ctx);
			var world = ngWorld.getWorld(0,0,true);
			console.log("World?",world);
			var box = ngBox.getBox(world, 1, 1, 2,2);
			console.log('Box?',box);

			if (attrs.debug || true) {
				console.log("Debugging");
				var debugDraw = new b2DebugDraw();
				var scale = 30;
				debugDraw.SetSprite(ctx);
				debugDraw.SetDrawScale(scale);
				debugDraw.SetFillAlpha(0.5);
				debugDraw.SetLineThickness(1.0);
				debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
				 
				world.SetDebugDraw(debugDraw);
				 
			//	ngBox.getBox(world, 3, 3, 2, 2);
				//createBox(world , game.screen_width -1  , game.screen_height / 2 , 0.1 , game.screen_height/2 -1 , { 'type' : b2Body.b2_staticBody , 'restitution' : 0.5 });
				 
				//few lightweight boxes
				//var free = {'restitution' : 1.0 , 'linearDamping' : 1.0 , 'angularDamping' : 1.0 , 'density' : 0.2};
				//createBox(world , 2 , 2 , 0.5 , 0.5 , free);
				//createBox(world , 5 , 2 , 0.5 , 0.5 , free);
			}

			ctx.save();
			ctx.translate(0 , 200);
			ctx.scale(1 , -1);
			world.DrawDebugData();
			ctx.restore();

		}
	}
});

angular.module('Rectangular')
.service("ngWorld",function(){
	 this.getWorld = function(gravityX, gravityY, sleep) {

		 	var gravity = new b2Vec2(gravityX, gravityY);
		 	var doSleep = sleep;
		 	 
		 	var world = new b2World(gravity , doSleep);

		 	return world;
	 }
})
.service("ngBox",function(){
	 this.getBox = function(world, x, y, width, height, options) {

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