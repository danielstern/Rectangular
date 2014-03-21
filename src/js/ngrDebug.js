angular.module('Rectangular')
  .service('ngrDebug', function(ngrState) {
    var d = this;
    var debugCanvas;
    var _canvas;
    var debugDraw;
    var ctxCurrentTranslation = {
      x: 0,
      y: 0
    };
    var ctx;

    this.reset = function() {
      ctx.translate(-ctxCurrentTranslation.x, -ctxCurrentTranslation.y);
      ctxCurrentTranslation = {
        x: 0,
        y: 0
      }
    }
    this.debug = function(canvas) {

      var p = $(canvas).parent();
      var state = ngrState.getState();
      _canvas = canvas;

      if ($('#debugCanvas')[0]) {
        debugCanvas = $('#debugCanvas')[0];
      } else {
        p.append("<canvas id='debugCanvas'></canvas>");
        debugCanvas = $('#debugCanvas')[0];
        $(debugCanvas)
          .attr('height', _canvas.height)
          .attr('width', _canvas.width);
      }

      ctx = debugCanvas.getContext('2d');
      ctxCurrentTranslation = {
        x: 0,
        y: 0
      }
      var world = ngrState.getWorld();
      debugDraw = new b2DebugDraw();
      var debugContainer = new createjs.Container();
      var scale = ngrState.getScale() * ngrState.getZoom();
      debugDraw.SetSprite(ctx);
      debugDraw.SetDrawScale(scale);
      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);

    }

    this.update = function(translation, scale) {
      
      var state = ngrState.getState();

      debugDraw.SetDrawScale(scale);

      ctx.translate(-ctxCurrentTranslation.x, -ctxCurrentTranslation.y);
      ctx.translate(translation.x, translation.y);
      ctxCurrentTranslation = translation;
      ctx.save();

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, _canvas.width * 10, _canvas.height * 10);

      ctx.restore();

    }

    this.toggleDebug = function(toggle) {
      if (toggle) {
        $(debugCanvas).removeClass('invisible');
      } else {
        $(debugCanvas).addClass('invisible');
      }
    }
  })
