angular.module('Rectangular')
  .service('ngrDebug', function(ngrWorld, ngrState) {
    var d = this;
    var debugCanvas;
    var _canvas;
    var ctxCurrentTranslation = {
      x:0,
      y:0
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
          .attr('height', state.height)
          .attr('width', state.width);
      }

      ctx = debugCanvas.getContext('2d');
      ctxCurrentTranslation = {
        x: 0,
        y: 0
      }
      var world = ngrWorld.getWorld();
      var debugDraw = new b2DebugDraw();
      var debugContainer = new createjs.Container();
  //    window.debugContainer = debugContainer;
      var scale = ngrState.getScale() * ngrState.getZoom();
      debugDraw.SetSprite(ctx);
      debugDraw.SetDrawScale(scale);
      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);

      window.debugDraw = debugDraw;

      //ngrLoop.addPermanentHook()

    }

    this.update = function(translation, scale) {
      var world = ngrWorld.getWorld();
            var state = ngrState.getState();

        //var state = ngrState.getState();
        //var focus = ngrState.getFocus();
        //var scale = ngrState.getScale() * state.zoom;

        debugDraw.SetDrawScale(scale);
        //var newTranslation = {
         // x: -focus.x * scale + 0.5 * canvas.width,
         // y: -focus.y * scale + 0.5 * canvas.height
        //}

        //if (state.constrainFocusToRoom) {
         // var roomHeightPixels = state.room.height * scale;
      /*    var roomWidthPixels = state.room.width * scale;

         
          if (newTranslation.y > 0) newTranslation.y = 0; 
          if (newTranslation.x > 0) newTranslation.x = 0;

          // bottom
          if (newTranslation.y - canvas.height < -roomHeightPixels) newTranslation.y = -roomHeightPixels + canvas.height;
          if (newTranslation.x - canvas.width < -roomWidthPixels) newTranslation.x = -roomWidthPixels + canvas.width;

          
        }*/

        ctx.translate(-ctxCurrentTranslation.x, -ctxCurrentTranslation.y);
        ctx.translate(translation.x, translation.y);
        ctxCurrentTranslation = translation;
        ctx.save();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, state.canvas.width * 10, state.canvas.height * 10);

        ctx.restore();
        //world.DrawDebugData();

    }

    this.toggleDebug = function() {
      $(debugCanvas).toggleClass('invisible');
    }
  })
