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

		
		var s = new NgShape(options);


		return s;
	}
})

		function NgShape(options) {
			var _shape = this;

			console.log("Creating shape", options);

			if (options.isShape) {
				return options;
			}

   		this.options = options;

   		this.isShape = true;




   		

   		this.getBodyDef = function() {
   			var b = new b2BodyDef();


   			console.log("Getting def for body",options);

   			b.position.Set(options.x , options.y);
   			b.angle = options.angle;

   			if (options.position == 'dynamic') {
   				b.type = b2Body.b2_dynamicBody;
   			}

   			return b;

   		}

   		this.getFixtureDef = function() {
   			var f = new b2FixtureDef;

   			console.log("Getting def for fixture",options);

   			if (options.type == 'box') {
   				f.shape = new b2PolygonShape();
   				f.shape.SetAsBox( options.width , options.height );
   			}

   			if (options.type == 'circle') {
   				f.shape = new b2CircleShape();
   				f.shape.SetRadius( options.radius );
   			}

   			f.density = options.density;
   			f.friction = options.friction;
   			f.restitution = options.restitution;

   			return f;
   		}

		}



