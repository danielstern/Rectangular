angular.module('Rectangular')
.service("ngrBox",function(ngrState, ngrDefaults){

	var env;		
	var ngrBox = this;

	
	this.shape = function(type, options) {
		env = ngrState.getProperties();

		//default options
		var defaults = _.clone(ngrDefaults.body);

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
			case 'triangle':
				options.type = 'triangle';
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


