angular.module('Rectangular')
.service('ngrLoop', function() {
  var l = this;
  var speed = 60;
  var loop;
  var world;
  var hooks = [];
  var permanentHooks = [];
  window.loop = this;

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
    return func;
  };

  this.removeHook = function(_func) {
    var rHook = _.find(hooks,function(hook){
      if (hook == _func) return true;
    });
    hooks.splice(hooks.indexOf(rHook),1);
  }

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
    clearInterval(loop);
    loop = setInterval(l.tick, 1000 / speed);
  };

  this.start = this.initWorld;
})