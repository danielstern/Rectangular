angular.module('Rectangular')
.service('ngrStage',function(){

		var canvas = $('canvas')[0];

	  this.stage = new Stage(canvas);
		this.stage.snapPixelsEnabled = true;

		var elem = canvas;
		var ctx = $(elem).get(0).getContext('2d');

		this.context = ctx;

		this.actors = [];

})

.service('ngrActor',function(ngrState){

	this.newActor = function(body, skin) {
		return new actorObject(body,skin);
	}

	var actorObject = function(body, skin) {
		this.body = body;
		this.skin = skin;
		this.update = function() {  // translate box2d positions to pixels
			this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
			this.skin.x = this.body.GetWorldCenter().x * ngrState.SCALE;
			this.skin.y = this.body.GetWorldCenter().y * ngrState.SCALE;
			}
		}

})