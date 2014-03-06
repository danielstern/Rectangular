angular.module('Rectangular')
.service('ngStage',function(){

		var canvas = $('canvas')[0];

	  this.stage = new Stage(canvas);
		this.stage.snapPixelsEnabled = true;

		var elem = canvas;
		var ctx = $(elem).get(0).getContext('2d');

		this.context = ctx;

})