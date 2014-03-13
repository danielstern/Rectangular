angular.module('Rectangular', [])
.service('ngrDebug', function(ngrWorld,ngrState) {
  var d = this;
  var p;
  var oldScale;
  this.debug = function(ctx) {

    var world = ngrWorld.getWorld();
    var debugDraw = new b2DebugDraw();
    d.debugDraw = debugDraw;
    window.d = d.debugDraw;
    window.c = ctx;
    var scale = ngrState.getScale();
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);
    oldScale = scale;

    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    p = setInterval(function(){
        var newScale = ngrState.getScale();
        if (newScale != oldScale) d.debugDraw.SetDrawScale(newScale);

        
    },1)
  }
})
