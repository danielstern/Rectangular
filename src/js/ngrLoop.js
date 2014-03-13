angular.module('Rectangular')
.service('ngrLoop', function() {
  var l = this;
  //	var ctx = ngrStage.context;
  var speed = 60;
  var loop;
  var world;
  var hooks = [];
  var permanentHooks = [];
  window.loop = this;

  this.tick = function() {

    //console.log("loop tick");
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
    console.log("Clearing interval", loop);
    clearInterval(loop);
  }

  this.setSpeed = function(_speed) {
      speed = _speed;
      if (loop) l.initWorld();
  }


  this.initWorld = function(_speed) {

    speed = _speed || speed;
    //console.log("Init world")
    clearInterval(loop);
    loop = setInterval(l.tick, 1000 / speed);
  };

  this.start = this.initWorld;
})