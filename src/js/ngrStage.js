angular.module('Rectangular')
  .service('ngrStage', function(ngrLoop, ngrState) {

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

    var p = $(canvas).parent();

    if (!$('.blocker')[0]) {
      p.append('<div class="blocker"></div>');
      $('.blocker').append('<div class="blocker-inner"></div>');
    }


    this.getContext = function() {
      return ctx;
    }

    this.addChild = function(container) {
      c.addChild(container);
      //c.addChild(container);
    }

    this.setFocusPoint = function(vec) {
      focusPoint = vec;

    };

    this.follow = function(_target) {
      //console.log("Following,", _target);
      target = _target;

    };

    this.init = function() {
      var e = ngrState.getState();
      s.setFocusPoint({
        x: e.width / 2,
        y: e.height / 2
      });

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

    var blockerRunning = false;
    var r;

    this.blocker = function() {

      if (blockerRunning) return r.promise;

      r = $q.defer();
      $('.blocker-inner').addClass('slide');
      blockerRunning = true;

      setTimeout(function() {
        r.resolve();
        blockerRunning = false;
      }, 500);

      setTimeout(function() {
        $('.blocker-inner').removeClass('slide');
      }, 1000);

      return r.promise;

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
      this.skin.x = this.body.GetWorldCenter().x * ngrState.getScale();
      this.skin.y = this.body.GetWorldCenter().y * ngrState.getScale();
    }
  }

})
