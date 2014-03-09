angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld",function(ngrBox,ngrModels,ngrState,ngrDisplay,ngrLoop){

	var world = {};
	var bodies = [];
	var properties = {};
	var ngrWorld = this;
	var env;

	this.SCALE = 30;
	var elements = [];

	var gravity = new b2Vec2(0,0);
	var hooks = [];

	world = new b2World(gravity , true);

	this.addElement = function(definition, options) {
		 var b = world.CreateBody(definition.b);
		 var f =b.CreateFixture(definition.f);

		 options = _.clone(options) || {};

		 options.cycle = 0;
		 b.options = _.clone(options);

		 bodies.push(b);

		 console.log("adding element..",b);
		 return b;
	};

	this.cycleBody = function(b) {

		 var options = b.options;

		 options.cycle += Math.PI / 200 / options.movement.period || 1;
     var phase = options.movement.phaseShift || 0;
     var currentY = b.GetPosition().y;
     var currentX = b.GetPosition().x;
     var currentRotation= b.GetAngle();
     if (options.movement.shiftX || options.movement.shiftY) {
	     var newY = currentY - (Math.sin(options.cycle + phase) / 50)  * options.movement.shiftY;
	     var newX = currentX - (Math.sin(options.cycle + phase) / 50)  * options.movement.shiftX;
	     b.SetPosition(new b2Vec2(newX, newY));
   	}

   	if (options.movement.rotation) {
     var newRotation = (phase / 50) + (options.cycle / 50)  * options.movement.rotation || 1;
   		//console.log("Rotation,", newRotation);
     b.SetAngle(newRotation);
  	}

	}

	this.addHook = function(func) {
 		throw new Error();
	}


	this.removeElement = function(body) {
		 world.DestroyBody(body);

	}

	this.clearAll = function() {
		_.each(bodies,function(body){
			world.DestroyBody(body);
			bodies = [];
		});

	}

	this.setWorld = function(gravityX, gravityY, sleep) {

	 	var gravity = new b2Vec2(gravityX, gravityY);
	 	var doSleep = sleep;
			env = ngrState.getProperties();
	 	 
	 	world = new b2World(gravity , doSleep);

	 	ngrLoop.addHook(function(){
	 	
	 		world.Step(1/60,10,10)
	 		world.ClearForces();
	 		world.DrawDebugData();

	 		_.each(bodies, function(body){

	      if (body.options && body.options.moves) {			
	     
			    	ngrWorld.cycleBody(body);   
			  }

	 		})
	 	})

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
		options = floor.options;

		var body = ngrWorld.addElement(floor);
		body.SetUserData({isFloor:true})
		ngrDisplay.skin(body, options);
	}

	this.leftWall = function(options) {

		options = options || {};

		var leftWall = ngrModels.leftWall(options);
		options = leftWall.options;

		var lBody = ngrWorld.addElement(leftWall);
		ngrDisplay.skin(lBody, options);

	}

	this.rightWall = function(options) {

		options = options || {};

		var rightWall = ngrModels.rightWall(options);		
		options = rightWall.options;
		var rBody = ngrWorld.addElement(rightWall);

		ngrDisplay.skin(rBody, options);

	}
})
