 angular.module('Rectangular')
 .service('ngrEnvironment', function(ngrWorld, ngrStage, $q, ngrState, ngrBox, ngrDebug, ngrLoop, ngrDisplay) {

    var world,
      envHeight,
      envWidth,
      canvas,
      env = {},
      ngEnv = this,
      SCALE = 30;

    this.addHook = ngrLoop.addHook;
    this.clearHooks = ngrLoop.clearHooks;

    this.floor = ngrWorld.floor;
    this.room = ngrWorld.room;
    this.leftWall = ngrWorld.leftWall;
    this.rightWall = ngrWorld.rightWall;

    this.init = function(_canvas) {
      env.height = _canvas.height;
      env.width = _canvas.width;
      env.SCALE = SCALE;
      ngrState.setProperties(env);
      canvas = _canvas;
      world = ngrWorld.setWorld(0, 30, true);
      ngrLoop.initWorld(60, env);
      var p = $(canvas).parent();

      if (!$('.blocker')[0]) {
        p.append('<div class="blocker"></div>');
        $('.blocker').append('<div class="blocker-inner"></div>');
      }

      if (!$('#debugCanvas')[0]) {
        p.append("<canvas id='debugCanvas'></canvas>");
        var debugCanvas = $('#debugCanvas');
        debugCanvas
          .attr('height', env.height)
          .attr('width', env.width);
      }
    }

    this.stop = function() {
      ngrLoop.stop();
    }

    this.blocker = function() {

      var r = $q.defer();
      $('.blocker-inner').addClass('slide');

      setTimeout(function() {
        r.resolve();
      }, 500);

      setTimeout(function() {
        $('.blocker-inner').removeClass('slide');
      }, 1000);

      return r.promise;

    }

    this.clearAll = function() {

      ngrWorld.clearAll();
      ngrStage.clearAll();
      ngrLoop.clearHooks();
    }

    this.toggleDebug = function() {
      $(debugCanvas).toggleClass('invisible');
    }


    this.debug = function() {
      var ctx = debugCanvas.getContext('2d');
      ngrDebug.debug(ctx);
    }

  })

