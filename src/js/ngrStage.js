angular.module('Rectangular')
  .service('ngrStage', function(ngrLoop, ngrState, ngrSkin, $q, ngrDebug, ngrCamera) {

    var canvas = $('canvas')[0];
    var parallaxCenter;
    var stage = new Stage(canvas);
    var c = new createjs.Container();
    var bgContainer = new createjs.Container();
    var coverContainer = new createjs.Container();
    var ctx = $(canvas).get(0).getContext('2d');
    var ctxCurrentTranslation = {
      x: 0,
      y: 0
    };
    var actors = [];
    this.actors = actors;
    this.stage = stage;
    var e;


    var following = false;
    var target = null;

    var s = this;

    var p = $(canvas).parent();

    this.debug = ngrDebug.toggleDebug;



    this.background = function(src, parallax) {
      var sprite = ngrSkin.background(src, parallax);
      bgContainer.addChild(sprite.container);
    }


    this.getContext = function() {
      return ctx;
    }

    this.toggleStage = function(toggle) {
      if (toggle) {
        c.alpha = 1;
      } else {
        c.alpha = 0;
      }
    }

    this.overlay = function(src) {
      var sprite = ngrSkin.coverCanvas(src);
      coverContainer.addChild(sprite.container);
      return sprite.container;
    }

    this.addChild = function(container) {
      c.addChild(container);
    }

    this.removeChild = function(container) {
      if (container && container.parent) container.parent.removeChild(container);
    }

    this.addSprite = function(b,options) {

      var sprite = ngrSkin.skin(b,options);
      s.addChild(sprite.container);
      actors.push(sprite.actor);

      console.log("Got sprite...",sprite);

      b.sprite = sprite;

      return sprite;

    }

    this.setFocusPoint = function(vec) {
      focusPoint = vec;

    };

    this.follow = function(_target) {
      target = _target;

    };

    this.init = function() {

      s.clearAll();

      ngrDebug.debug(canvas);

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
      c.removeAllChildren();
      stage.addChild(bgContainer);
      stage.addChild(c);
      stage.addChild(coverContainer);

      ctx.translate(-ctxCurrentTranslation.x, -ctxCurrentTranslation.y);
      ctxCurrentTranslation = {
        x: 0,
        y: 0
      }
    }


    function tick() {

      var state = ngrState.getState();
      var focus = ngrCamera.getFocus();
      var scale = ngrState.getScale() * ngrCamera.getZoom();

      var newTranslation = {
        x: focus.x * scale - 0.5 * canvas.width,
        y: -focus.y * scale + 0.5 * canvas.height
      }

      c.x = -newTranslation.x;
      c.y = newTranslation.y;
      for (var i = 0; i < bgContainer.getNumChildren(); i++) {
        
        var child = bgContainer.getChildAt(i);
        child.x = c.x / child.parallax;
        child.y = c.y / child.parallax;

        child.scaleX = child.scaleY = 1 + ngrCamera.getZoom() / 3;

      
      }
     
      ctxCurrentTranslation = newTranslation;

      ngrDebug.update({
        x: -newTranslation.x,
        y: newTranslation.y
      }, scale, canvas);

      ctx.restore();
      _.each(actors, function(actor) {
        actor.update();
      })
      stage.update();

    }
    
    ngrLoop.addPermanentHook(tick);
  })
