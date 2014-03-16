angular.module('Rectangular')
.service('ngrDebug', function(ngrWorld,ngrState) {
  var d = this;
  var p;
  var oldScale;
  this.debug = function(canvas) {


    var p = $(canvas).parent();
    var state = ngrState.getState();
    var debugCanvas;

    if ($('#debugCanvas')[0]) {
      debugCanvas = $('#debugCanvas')[0];
    } else 
    {
      p.append("<canvas id='debugCanvas'></canvas>");
      debugCanvas = $('#debugCanvas')[0];
      $(debugCanvas)
        .attr('height', state.height)
        .attr('width', state.width);
    }

    console.log("Debug canvas?",debugCanvas);


    var ctx = debugCanvas.getContext('2d');

    var world = ngrWorld.getWorld();
    var debugDraw = new b2DebugDraw();
    var scale = ngrState.getScale();
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);

    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    //debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit | b2DebugDraw.e_aabbBit |  b2DebugDraw.e_pairBit |  b2DebugDraw.e_centerOfMassBit);
  //  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit |  b2DebugDraw.e_pairBit |  b2DebugDraw.e_centerOfMassBit);
    world.SetDebugDraw(debugDraw);

  }
})
