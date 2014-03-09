angular.module('Rectangular')
.service("ngrModels",function(ngrState, ngrBox,ngrDefaults	){

	var env;

	this.leftWall = function(options) {

		env = ngrState.getProperties();

		var defaults = _.clone(ngrDefaults.wall);
		options = _.extend(defaults,options);

	  options.height = env.height / env.SCALE;

		var leftWall = ngrBox.shape('box',options);

		return leftWall;

	}

	this.rightWall = function(options) {

		env = ngrState.getProperties();

			var defaults = _.clone(ngrDefaults.wall);
			options = _.extend(defaults,options);

			options.height = env.height / env.SCALE;
			options.x = env.width / env.SCALE;
			var rightWall = ngrBox.shape('box',options);

			return rightWall;

	}
	
	this.floor = function(options) {

		env = ngrState.getProperties();

		var defaults = _.clone(ngrDefaults.floor);
		options = _.extend(defaults,options);

		options.y = env.height / env.SCALE;
		options.width = env.width / env.SCALE;
		
		var shape = ngrBox.shape('box',options);
		return shape;

	}
})

.service('ngrDefaults',function(){
	this.wall = {
			width: 0.3,
			position:'static',
			x:0
		};

	this.floor = {
		height: 0.3,
		position:'static',
	}
})