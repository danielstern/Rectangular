angular.module('Rectangular')
  .service('ngrStage', function(ngrLoop) {

    var canvas = $('canvas')[0];

    var stage = new Stage(canvas);
    var ctx = $(canvas).get(0).getContext('2d');
    var actors = [];
    this.actors = actors;
    this.stage = stage;

    window._stage = this.stage;

    this.clearAll = function() {
      stage.removeAllChildren();
      stage.update();
      ctx.save();
      ctx.restore();
    }

    ngrLoop.addPermanentHook(function() {
      stage.update();
      ctx.save();
      ctx.restore();
      _.each(actors, function(actor) {
        actor.update();
      })
    })
  })

.service('ngrActor', function(ngrState) {

  this.newActor = function(body, skin) {
    return new actorObject(body, skin);
  }

  var actorObject = function(body, skin) {
    this.body = body;
    this.skin = skin;
    this.update = function() { // translate box2d positions to pixels
      this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
      this.skin.x = this.body.GetWorldCenter().x * ngrState.SCALE;
      this.skin.y = this.body.GetWorldCenter().y * ngrState.SCALE;
    }
  }

})
