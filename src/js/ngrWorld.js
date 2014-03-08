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

	world = new b2World(gravity , true);


	this.addElement = function(definition) {
		 var b = world.CreateBody(definition.b);
		 var f =b.CreateFixture(definition.f);
		 bodies.push(b);
		 return b;
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
