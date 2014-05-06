angular.module('Rectangular')
  .service('ngrLoop', function ($q) {
    var l = this;
    var speed = 60;
    var loop;
    var world;
    var hooks = [];
    var permanentHooks = [];

    this.tick = function () {

      _.each(hooks, function (hook) {
        hook.func(hook.arg);
      })

      _.each(permanentHooks, function (hook) {
        hook();
      })
    }

    this.addHook = function (func, arg) {
      var id = guid();

      var hook = {
        func: func,
        id: id,
        arg:arg,
      }

      hooks.push(hook);
      return hook;
    };

    this.wait = function (duration) {
      var r = $q.defer();

      duration = duration || 1;

      var h = l.addHook(function () {
        duration--;
        if (duration < 1) {
          l.removeHook(h);
          r.resolve();

        }
      })

      return r.promise;
    }

    this.removeHook = function (_hook) {
      hooks = _.without(hooks, _hook);
    }

    /**
    *
    * Add a hook not removed by removeHooks (call removeHook with the hook's hadnle to remove it)
    * @func - a function you want to be executed every world tick
    *
    */
    this.addPermanentHook = function (func) {
      permanentHooks.push(func);
    };

    this.clearHooks = function () {
      hooks = [];
    }

    this.stop = function () {
      
      clearInterval(loop);
    }

    this.setSpeed = function (_speed) {
      speed = _speed;
      if (loop) l.initWorld();
    }

    this.init = function (_speed) {

      speed = _speed || speed;
      clearInterval(loop);
      loop = setInterval(l.tick, 1000 / speed);
    };

    this.init;

    this.start = this.init;
  })
