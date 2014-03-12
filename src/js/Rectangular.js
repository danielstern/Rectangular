angular.module('Rectangular', [])
.service('ngrDebug', function(ngrWorld,ngrState) {
  this.debug = function(ctx) {

    var world = ngrWorld.getWorld();
    var debugDraw = new b2DebugDraw();
    //console.log("Debugging",world,debugDraw)
    var scale = ngrState.SCALE;
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
  }
})
