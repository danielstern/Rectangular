angular.module('Rectangular')
  .service('ngrStage', function(ngrLoop, ngrState, $q) {

    var canvas = $('canvas')[0];
    var parallaxCenter;
    var stage = new Stage(canvas);
    var c = new createjs.Container();
    var bgContainer = new createjs.Container();
    var ctx = $(canvas).get(0).getContext('2d');
    var ctxCurrentTranslation = {
      x: 0,
      y: 0
    }
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
    }

    this.setFocusPoint = function(vec) {
      focusPoint = vec;

    };

    this.follow = function(_target) {
      target = _target;

    };

    this.init = function() {
      /*  var e = ngrState.getState();
      s.setFocusPoint({
        x: e.width / 2,
        y: e.height / 2
      });*/

      parallaxCenter = ngrState.getRoomCenter();

    }

    this.addChildAt = function(container, index, background) {
      c.addChildAt(container, index);
      if (background) {
        bgContainer.addChild(container);
      }
    }



    this.clearAll = function() {
      stage.removeAllChildren();
      stage.update();
      ctx.save();
      ctx.restore();
      c = new createjs.Container();
      stage.addChild(bgContainer);
      stage.addChild(c);

      ctx.translate(-ctxCurrentTranslation.x, -ctxCurrentTranslation.y);
      ctxCurrentTranslation = {
        x: 0,
        y: 0
      }

      window.container = c;

    }

    function tick() {

      var state = ngrState.getState();
      var focus = ngrState.getFocus();
      var scale = ngrState.getScale() * state.zoom;

      //debugDraw.SetDrawScale(scale);
      var newTranslation = {
        x: focus.x * scale - 0.5 * canvas.width,
        y: -focus.y * scale + 0.5 * canvas.height
      }
      if (state.constrainFocusToRoom) {
        var roomHeightPixels = state.room.height * scale;
        var roomWidthPixels = state.room.width * scale;



        if (newTranslation.y - canvas.height < -roomHeightPixels) newTranslation.y = -roomHeightPixels + canvas.height;
        if (newTranslation.x + canvas.width > roomWidthPixels) newTranslation.x = roomWidthPixels - canvas.width;
        if (newTranslation.y > 0) newTranslation.y = 0;
        if (newTranslation.x < 0) newTranslation.x = 0;

        //if (newTranslation.x - canvas.width < roomWidthPixels / 2) newTranslation.x = -roomWidthPixels / 2 + canvas.width;
      }

      c.x = -newTranslation.x;
      c.y = newTranslation.y;
      bgContainer.x = c.x / 2;
      bgContainer.y = c.y / 2;
      ctxCurrentTranslation = newTranslation;


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
      this.skin.x = this.body.GetWorldCenter().x * ngrState.getScale() * ngrState.getZoom();
      this.skin.y = this.body.GetWorldCenter().y * ngrState.getScale() * ngrState.getZoom();
    }
  }

})
