angular.module('Rectangular')
.service("ngWorld",function(ngBox,ngStage){
	var _ngWorld = this;
	 var world = {};
	 var bodies = [];
	 
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

	 this.clearAll = function() {
	 	_.each(bodies,function(body){
	 		world.DestroyBody(body);
	 	})

	 }

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


.service("ngBox",function(){

	this.shape = function(type, options) {

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


.service('display',function(ngStage,ngWorld,ngActor){
	this.skin = function(body, options) {

		var defaults = {
			height: 100,
			width: 100,
			snapToPixel: true,
			mouseEnabled: false,
			y: 1,
			x: 10,
			angle: 0,
			src:''
		};

		options = _.extend(defaults,options);

		var stage = ngStage.stage;
		var imgData;

		if (options.src) {
			imgData = new Bitmap(options.src);
		} else {
			imgData = new Bitmap('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==');
		}

		if (options.radius) {
			options.width = options.radius * 2 * ngWorld.SCALE;
			options.height = options.radius * 2 * ngWorld.SCALE;
		} else {
			options.width = options.width * ngWorld.SCALE;
			options.height = options.height * ngWorld.SCALE;
		}


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

				clearInterval(imgInt);
				initImg();
			}
		}, 1);

		function initImg() {

			var img = imgData.image;

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

			var actor = ngActor.newActor(body, imgData);
			ngWorld.actors.push(actor);

			return actor;
		}

	}

	

})
