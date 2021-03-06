angular.module('Rectangular')
  .service('ngrStage', function (ngrLoop, ngrState, ngrSkin, $q, ngrDebug, ngrCamera) {

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

    this.getContainer = function () {
      return p;
    }

    this.background = function (src, parallax) {
      var sprite = ngrSkin.background(src, parallax);
      bgContainer.addChild(sprite.container);
    }

    this.getContext = function () {
      return ctx;
    }

    this.toggleStage = function (toggle) {
      if (toggle) {
        c.alpha = 1;
      } else {
        c.alpha = 0;
      }
    }

    this.addChild = function (container) {
      c.addChild(container);
    }

    this.removeChild = function (container) {
      if (container && container.parent) container.parent.removeChild(container);
    }

    this.addSprite = function (b, options) {

      var sprite = ngrSkin.skin(b, options);
      s.addChildAt(sprite.container, options.index || sprite.container.getNumChildren());
      actors.push(sprite.actor);

      b.sprite = sprite;

      return sprite;

    }

    this.setFocusPoint = function (vec) {
      focusPoint = vec;

    };

    this.follow = function (_target) {
      target = _target;

    };

    this.init = function () {

      s.clearAll();

      ngrDebug.debug(canvas);

      parallaxCenter = ngrState.getRoomCenter();

    }

    this.addChildAt = function (container, index, background) {
      c.addChildAt(container, index);
      if (background) {
        bgContainer.addChild(container);
      }
    }

    this.clearAll = function () {
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
        var parallax = child.parallax;
        //child.x = c.x / child.parallax;
        //child.y = c.y / child.parallax;

        child.x = c.x * ngrCamera.getLens() * parallax;
        child.y = c.y * ngrCamera.getLens() * parallax;

        child.scaleX = child.scaleY = 1 + ngrCamera.getZoom();

      }

      ctxCurrentTranslation = newTranslation;

      ngrDebug.update({
        x: -newTranslation.x,
        y: newTranslation.y
      }, scale, canvas);

      ctx.restore();
      _.each(actors, function (actor) {
        actor.update();
      })
      stage.update();

    }

    ngrLoop.addPermanentHook(tick);
  })
  .service("ngrDisplay", function (ngrStage) {

    this.modal = function (data) {

      var p = ngrStage.getContainer();

      console.log("creating modal...", data);
      p.append("<div class='modal'></div>");
      var modal = p.find('.modal');
      modal.append('<h1>' + data.title + '</h1>');
      modal.append('<img src="' + data.img + '">');
      modal.append('<p>' + data.text + '</p>');
      modal.append('<div class="button">' + "OK (SPACE / ENTER)" + '</button>');
      modal.append('<p class="flavor">' + data.flavor + '</p>');
      modal.addClass('animated rollIn untouchable');
      return modal;
    }

    this.overlay = function (src) {
      var p = ngrStage.getContainer();
      if (!src) throw new Error("Overlay error");
      p.append("<div class='overlay'></div>");
      var overlay = p.find('.overlay');
      overlay.append("<img src='"+src+"'></img>")
      console.log("Overlaying...",src);

      var controls = {
        close:function(){
          overlay.hide();
        }
      }
      
      return controls;
    }

  })
