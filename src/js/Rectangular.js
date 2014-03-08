angular.module('Rectangular', [])
 

.service('ngrLoop', function() {
  var l = this;
  //	var ctx = ngrStage.context;
  var speed = 60;
  var loop;
  var world;
  var hooks = [];
  var permanentHooks = [];

  this.tick = function() {

    _.each(hooks, function(hook) {
      hook();
    })
    _.each(permanentHooks, function(hook) {
      hook();
    })


  }

  this.addHook = function(func) {
    hooks.push(func);
  };

  this.addPermanentHook = function(func) {
    permanentHooks.push(func);
  };

  this.clearHooks = function() {
    hooks = [];
  }

  this.stop = function() {
    clearInterval(loop);
  }

  this.initWorld = function(_speed) {
    speed = _speed;
    //		console.log("Initigin world")
    loop = setInterval(l.tick, 1000 / speed)
  };
})

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
