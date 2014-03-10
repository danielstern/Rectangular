angular.module('Rectangular')
  .service('ngrStage', function(ngrLoop) {

    var canvas = $('canvas')[0];

    var stage = new Stage(canvas);
    var c = new createjs.Container();
    var ctx = $(canvas).get(0).getContext('2d');
    var actors = [];
    this.actors = actors;
    this.stage = stage;

    var s = this;

    window._stage = this.stage;

    this.addChild = function(container) {
      c.addChild(container);
      //c.addChild(container);
    }

    this.addChildAt = function(container, index) {
      c.addChildAt(container, index);
    }


    this.clearAll = function() {
      stage.removeAllChildren();
      stage.update();
      ctx.save();
      ctx.restore();
      c = new createjs.Container();
      stage.addChild(c);
      
    window.container = c;

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
