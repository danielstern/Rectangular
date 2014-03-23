angular.module('Rectangular')
  .service('ngrLoop', function ($q) {
    var l = this;
    var speed = 60;
    var loop;
    var world;
    var hooks = [];
    var permanentHooks = [];
    window.loop = this;

    this.tick = function () {

      _.each(hooks, function (hook) {
        hook.func();
      })

      _.each(permanentHooks, function (hook) {
        hook();
      })

    }

    this.addHook = function (func) {
      var id = guid();

      var hook = {
        func: func,
        id: id
      }

      hooks.push(hook);
      return hook;
    };

    this.wait = function (duration) {
      var r = $q.defer();

      var h = ngrLoop.addHook(function () {
        duration--;
        if (duration < 1) {
          ngrLoop.removeHook(h);
          r.resolve();
        }
      })

      return r;
    }

    this.removeHook = function (_hook) {
      hooks = _.without(hooks, _hook);
    }

    this.addPermanentHook = function (func) {
      permanentHooks.push(func);
    };

    this.clearHooks = function () {
      hooks = [];
    }

    this.stop = function () {
      console.log("Clearing interval", loop);
      clearInterval(loop);
    }

    this.setSpeed = function (_speed) {
      speed = _speed;
      if (loop) l.initWorld();
    }

    this.initWorld = function (_speed) {

      speed = _speed || speed;
      clearInterval(loop);
      loop = setInterval(l.tick, 1000 / speed);
    };

    this.start = this.initWorld;
  })
