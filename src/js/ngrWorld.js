angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld",function(ngrBox,ngrStage,ngrState,ngrDisplay){
	var _ngrWorld = this;
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
	 	var world = ngrWorld.getWorld();
	 
	 	ngrBox.floor();
	 	ngrBox.leftWall();
	 	ngrBox.rightWall();

	 }

	 this.floor = function(options) {
	 	var defaults = {
	 		width:env.width / env.SCALE,
	 		height: 0.3,
	 		position:'static',
	 		y: env.height / env.SCALE,
	 	};

	 	options = _.extend(defaults,options);
	 	
	 	var shape = ngrBox.shape('box',options);
	 	var body = ngrWorld.addElement(shape);
	 	body.SetUserData({isFloor:true})
	 	var actor = ngrDisplay.skin(body,{
	 		height: options.height * 2
	 	});
	 }

	 this.leftWall = function(options) {

	 	var defaults = {
	 		width: 0.3,
	 		height: env.height / env.SCALE,
	 		position:'static',
	 		x:0
	 	};

	 	options = _.extend(defaults,options);

	 	var leftWall = ngrBox.shape('box',options);
	 	var lBody = ngrWorld.addElement(leftWall);
	 	ngrDisplay.skin(lBody,{
	 		width: options.width * 2,
	 	});
	 }

	 this.rightWall = function(options) {
	 	var defaults = {
	 		width: 0.3,
	 		height: env.height / env.SCALE,
	 		position:'static',
	 		x: env.width / env.SCALE,
	 	};

	 	options = _.extend(defaults,options);
	 	var rightWall = ngrBox.shape('box',options);
	 	var rBody = ngrWorld.addElement(rightWall);
	 	ngrDisplay.skin(rBody,{
	 		width: options.width * 2,
	 	});

	 }



})


.service("ngrBox",function(ngrState){

		var env;
		
		var ngrBox = this;



	
	this.shape = function(type, options) {
		env = ngrState.getProperties();
//		console.log("Env?",env);

		//default options
		var defaults = {
			height: 1.5,
			width: 1.5,
			x: 10,
			y: 1,
			radius: 1.5,
			density : 0.5 ,
			'friction' : 0.2 ,
			'restitution' : 0.1,
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


