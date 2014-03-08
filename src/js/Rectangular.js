angular.module('Rectangular', [])
.service('ngrDebug', function(ngrWorld) {
  this.debug = function(ctx) {

    var world = ngrWorld.getWorld();
    var debugDraw = new b2DebugDraw();
    var scale = ngrWorld.SCALE;
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
  }
})
