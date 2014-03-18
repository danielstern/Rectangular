angular.module('Rectangular')
  .service('ngrDebug', function(ngrWorld, ngrState, ngrLoop) {
    var d = this;
    var debugCanvas;
    this.debug = function(canvas) {

      var p = $(canvas).parent();
      var state = ngrState.getState();

      if ($('#debugCanvas')[0]) {
        debugCanvas = $('#debugCanvas')[0];
      } else {
        p.append("<canvas id='debugCanvas'></canvas>");
        debugCanvas = $('#debugCanvas')[0];
        $(debugCanvas)
          .attr('height', state.height)
          .attr('width', state.width);
      }

      var ctx = debugCanvas.getContext('2d');
      var ctxCurrentTranslation = {
        x: 0,
        y: 0
      }
      var world = ngrWorld.getWorld();
      var debugDraw = new b2DebugDraw();
      var debugContainer = new createjs.Container();
      window.debugContainer = debugContainer;
      var scale = ngrState.getScale() * ngrState.getZoom();
      debugDraw.SetSprite(ctx);
      debugDraw.SetDrawScale(scale);
      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);

      window.debugDraw = debugDraw;

      ngrLoop.addPermanentHook(function() {
    /*
        var state = ngrState.getState();
        var focus = ngrState.getFocus();
        var scale = ngrState.getScale() * state.zoom;

        debugDraw.SetDrawScale(ngrState.getScale() * Number(state.zoom || 1));
        var newTranslation = {
          x:-focus.x * scale + 0.5*canvas.width,
          y:-focus.y * scale + 0.5*canvas.height
        }
        ctx.translate(-ctxCurrentTranslation.x,-ctxCurrentTranslation.y);
        ctx.translate(newTranslation.x,newTranslation.y);
        ctxCurrentTranslation = newTranslation;
        ctx.save();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.restore();
        world.DrawDebugData();*/

      })

    }

    this.toggleDebug = function() {
      $(debugCanvas).toggleClass('invisible');
    }
  })
