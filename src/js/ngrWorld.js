angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld",function(ngrBox,ngrStage,ngrModels,ngrState,ngrDisplay){

	var world = {};
	var bodies = [];
	var properties = {};
	var ngrWorld = this;
	var env;

	this.SCALE = 30;
	this.actors = [];

	var gravity = new b2Vec2(0,0);
	var hooks = [];

	world = new b2World(gravity , true);

	this.addElement = function(definition, options) {
		 var b = world.CreateBody(definition.b);
		 var f =b.CreateFixture(definition.f);

      if (options && options.moves) {
		 		options.cycle = 0;
		    ngrWorld.addHook(function(){
		    	ngrWorld.cycleBody(b, options);
		    })
		  }

		 bodies.push(b);
		 return b;
	};

	this.cycleBody = function(b,options) {
		 options.cycle += Math.PI / 200 / options.movement.period;
     var phase = options.movement.phaseShift || 0;
     var currentY = b.GetPosition().y;
     var currentX = b.GetPosition().x;
     var newY = currentY - (Math.sin(options.cycle + phase) / 50)  * options.movement.shiftY;
     var newX = currentX - (Math.sin(options.cycle + phase) / 50)  * options.movement.shiftX;

     b.SetPosition(new b2Vec2(newX, newY));
    // pSubBody.SetPosition(new b2Vec2(newX, newY + 0.3));

	}

	this.addHook = function(func) {
		hooks.push(func);
	}

	this.tick= function() {
		_.each(hooks,function(l){
			l();
		})
	}

	this.removeElement = function(body) {
		 world.DestroyBody(body);
	}

	this.clearAll = function() {
		_.each(bodies,function(body){
			world.DestroyBody(body);
			ngrStage.stage.removeAllChildren();
		});

	}

	this.setWorld = function(gravityX, gravityY, sleep) {

	 	var gravity = new b2Vec2(gravityX, gravityY);
	 	var doSleep = sleep;
			env = ngrState.getProperties();
	 	 
	 	world = new b2World(gravity , doSleep);

	 	return world;
	}

	this.getWorld = function() {
		return world;
	}

	this.room = function() {

		ngrBox.floor();
		ngrBox.leftWall();
		ngrBox.rightWall();

	}

	this.floor = function(options) {

		options = options || {};

		var floor = ngrModels.floor(options);
		options.src = 'img/tile.png';
		options.bg = 'tiled';
		options.height = 0.3;
		var body = ngrWorld.addElement(floor);
		body.SetUserData({isFloor:true})
		ngrDisplay.skin(body, options);
	}

	this.leftWall = function(options) {

		options = options || {};

		var leftWall = ngrModels.leftWall(options);
		var lBody = ngrWorld.addElement(leftWall);
		options.src = 'img/tile.png';
		options.bg = 'tiled';
		options.width = 0.3;
		ngrDisplay.skin(lBody, options);

	}

	this.rightWall = function(options) {

		options = options || {};
		
		var rBody = ngrWorld.addElement(ngrModels.rightWall(options));
		options.src = 'img/tile.png';
		options.bg = 'tiled';
		options.width = 0.3;
		ngrDisplay.skin(rBody, options);

	}
})
