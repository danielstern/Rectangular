 angular.module('Rectangular')
 .service('ngrEnvironment', function(ngrWorld, ngrStage, ngrModels, $q, ngrState, ngrBox, ngrDebug, ngrLoop, ngrDisplay) {

    var world,
      envHeight,
      envWidth,
      canvas,
      env = {},
      ngEnv = this,
      SCALE = 30;

    this.addHook = ngrLoop.addHook;
    this.clearHooks = ngrLoop.clearHooks;
    var e = this;
   
   this.floor = function(options) {

    options = options || {};

    var floor = ngrModels.floor(options);
    //options = floor.options;
//    floor.options.userData = {isFloor:true};
    e.add('box', floor.options);

    //var body = ngrWorld.addElement(floor);
    //body.SetUserData({isFloor:true})
    //ngrDisplay.skin(body, options);
   }

   this.leftWall = function(options) {

    options = options || {};

    var leftWall = ngrModels.leftWall(options);
    //options = leftWall.options;
    e.add('box', leftWall.options);

    //var lBody = ngrWorld.addElement(leftWall);
    //ngrDisplay.skin(lBody, options);

   }

   this.rightWall = function(options) {

    options = options || {};

    var rightWall = ngrModels.rightWall(options);   
    options = rightWall.options;
    var rBody = ngrWorld.addElement(rightWall);

    ngrDisplay.skin(rBody, options);

   }


    this.init = function(_canvas) {
      env.height = _canvas.height;
      env.width = _canvas.width;
      env.SCALE = SCALE;
      ngrState.setProperties(env);
      canvas = _canvas;
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

    this.start = function() {
      if (!world)  world = ngrWorld.setWorld(0, 30, true);
      ngrLoop.initWorld(60, env);
    }

    this.add = function(type, options) {
      var s = ngrBox.shape(type, options);

      if (options.isSensor) s.f.isSensor = true;

      var b = ngrWorld.addElement(s, options);
      if (!options.hidden) ngrDisplay.skin(b, options);
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

