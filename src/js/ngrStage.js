angular.module('Rectangular')
  .service('ngrStage', function(ngrLoop,ngrState) {

    var canvas = $('canvas')[0];

    var stage = new Stage(canvas);
    var c = new createjs.Container();
    var ctx = $(canvas).get(0).getContext('2d');
    var actors = [];
    this.actors = actors;
    this.stage = stage;
    var e;

    var following = false;
    var target = null;

    var s = this;

    window._stage = this.stage;

    var focusPoint = {
      x:0,
      y:0
    }

    this.addChild = function(container) {
      c.addChild(container);
      //c.addChild(container);
    }

    this.setFocusPoint = function(vec) {
      focusPoint = vec;

    };

    this.follow = function(_target) {
      console.log("Following,",_target);
      target = _target;

    };

    this.init = function() {
      var e = ngrState.getState();
      s.setFocusPoint({x:e.width /2,y:e.height /2});

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

    function tick() {

      if (target){
//        var pos = target.GetPosition();
 //       focusPoint.x = pos.x;
  //      focusPoint.y = pos.y;

      }

      var env = ngrState.getState();
      ctx.save();
      c.x = env.width / 2 - focusPoint.x;
      c.y = env.height / 2 - focusPoint.y;
      ctx.restore();
      _.each(actors, function(actor) {
        actor.update();
      })
      stage.update();

    }

    ngrLoop.addPermanentHook(tick);
  })

.service('ngrActor', function(ngrState) {

  this.newActor = function(body, skin) {
    return new actorObject(body, skin);
  }

  var actorObject = function(body, skin) {
    this.body = body;
    this.skin = skin;

    this.GetPosition = function() {
      return body.GetPosition();
    }
    this.update = function() { // translate box2d positions to pixels
      this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
      this.skin.x = this.body.GetWorldCenter().x * ngrState.SCALE;
      this.skin.y = this.body.GetWorldCenter().y * ngrState.SCALE;
    }
  }

})
