 angular.module('Rectangular')
 .service('ngrEnvironment', function(ngrWorld, ngrStage, ngrModels, $q, ngrState, ngrBox, ngrDebug, ngrLoop, ngrDisplay) {

    var world,
      envHeight,
      envWidth,
      canvas,
      env = {},
      ngEnv = this,
      SCALE = 30;

    var worldHeight = 16.6; // meters
    var worldWidth = 25; 

    this.addHook = ngrLoop.addHook;
    this.clearHooks = ngrLoop.clearHooks;
    var e = this;
   
   this.floor = function(options) {

    options = options || {};
    var floor = ngrModels.floor(options);
    e.add('box', floor.options);

   }

   this.leftWall = function(options) {

    options = options || {};
    var leftWall = ngrModels.leftWall(options);
    e.add('box', leftWall.options);


   }

   this.rightWall = function(options) {

    options = options || {};
    var rightWall = ngrModels.rightWall(options);   
    e.add('box', rightWall.options);

   }


    this.init = function(_canvas, _scale) {
      _canvas = _canvas || $('canvas')[0];
      env.height = _canvas.height;
      env.width = _canvas.width;
      env.SCALE = _scale || SCALE;
      env.worldWidth = worldWidth;
      env.worldHeight = worldHeight;

      ngrState.setProperties(env);
      canvas = _canvas;
      ngrLoop.initWorld(60, env);
      ngrStage.init();
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

    this.start = function() {
      if (!world)  world = ngrWorld.setWorld(0, 30, true);
      ngrLoop.initWorld(60, env);
    }

    this.add = function(type, options) {
      var options = options || {};
      var s = ngrBox.shape(type, options);

      if (options.isSensor) s.f.isSensor = true;

      var b = ngrWorld.addElement(s, options);
      if (!options.hidden) ngrDisplay.skin(b, options);
    }

    this.remove = function() {
      throw new Error("Warning: Attempting to access unwritten remove function");
    }

    var blockerRunning = false;
    var r;

    this.blocker = function() {

      if (blockerRunning) return r.promise;

      r = $q.defer();
      $('.blocker-inner').addClass('slide');
      blockerRunning = true;

      setTimeout(function() {
        r.resolve();
        blockerRunning = false;
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

      world = null;
    }

    this.toggleDebug = function() {
      $(debugCanvas).toggleClass('invisible');
    }


    this.debug = function() {
      var ctx = debugCanvas.getContext('2d');
      ngrDebug.debug(ctx);
    }

  })

