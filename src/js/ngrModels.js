angular.module('Rectangular')
.service("ngrModels",function(ngrState, ngrBox	){

	var env;

	this.leftWall = function(options) {

		env = ngrState.getProperties();

		var defaults = {
			width: 0.3,
			height: env.height / env.SCALE,
			position:'static',
			x:0
		};

		options = _.extend(defaults,options);

		var leftWall = ngrBox.shape('box',options);

		return leftWall;

	}

	this.rightWall = function(options) {

		env = ngrState.getProperties();

			var defaults = {
				width: 0.3,
				height: env.height / env.SCALE,
				position:'static',
				x: env.width / env.SCALE,
			};

			options = _.extend(defaults,options);
			var rightWall = ngrBox.shape('box',options);

			return rightWall;

	}
	
	this.floor = function(options) {

		env = ngrState.getProperties();

		var defaults = {
			width:env.width / env.SCALE,
			height: 0.3,
			position:'static',
			y: env.height / env.SCALE,
		};

		options = _.extend(defaults,options);
		
		var shape = ngrBox.shape('box',options);
		return shape;

	}
})
