 angular.module('Rectangular')
   .service('ngrEnvironment', function(ngrWorld, ngrStage, ngrModels, ngrDefaults, $q, ngrState, ngrBox, ngrDebug, ngrLoop, ngrDisplay) {

     var world,
       canvas,
       env = {},
       ngEnv = this,
       SCALE = 30;

     this.addHook = ngrLoop.addHook;
     this.clearHooks = ngrLoop.clearHooks;
     this.setGravity = ngrWorld.setGravity;
     this.setWorldHeight = ngrState.setWorldHeight;
     var e = this;
     var _floorObj;

     this.floor = function(options) {

      if (_floorObj) e.remove(_floorObj);
       options = options || {};
       var floor = ngrModels.floor(options);
       _floorObj = e.add('box', floor.options);
    //   ngrWorld.getWorld().m_groundBody = _floorObj;

     }

     this.getFloor = function() {
      return _floorObj;
     }

     this.leftWall = function(options) {

       options = options || {};
       var leftWall = ngrModels.leftWall(options);
       e.add('box', leftWall.options);


     }

     this.setFocus = function(focus) {
        ngrState.setFocus(focus);
     }

     this.rightWall = function(options) {

       options = options || {};
       var rightWall = ngrModels.rightWall(options);
       e.add('box', rightWall.options);

     }

     ngEnv.setWorldSpeed = function(speed) {
        ngrLoop.setSpeed(speed);
     }


     this.init = function(options) {

       var defaults = _.clone(ngrDefaults.initialize);
       options = _.extend(defaults, options);

       ngEnv.initialOptions = options;

       _canvas = options.canvas || $('canvas')[0];
       options.canvas = _canvas;
       env.height = _canvas.height;
       env.width = _canvas.width;
       env.focus = {x:0,y:0};

       if (options.scale == 'auto') {
         env.SCALE = 1 / options.worldHeight * env.height;
       } else {
         env.SCALE = options.scale;
       }
       env.worldWidth = options.worldWidth;
       env.worldHeight = options.worldHeight;


       ngrState.setProperties(env);
       canvas = _canvas;
       ngrLoop.initWorld(options.fps, env);
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

       world = ngrWorld.setWorld(0, options.gravity, true);
       ngEnv.start();
       ngEnv.floor();

     }

     this.stop = function() {
       ngrLoop.stop();
     }

     this.start = function() {
       ngrLoop.start();
       ngEnv.debug();
     }

     this.add = function(type, options) {
       var options = options || {};
       var s = ngrBox.shape(type, options);

       console.log("adding",type,options);

       if (options.isSensor) s.getFixtureDef().isSensor = true;

       var b = ngrWorld.addElement(s, options);
       if (!options.hidden) ngrDisplay.skin(b, options);

       return b;
     }

     this.remove = function(body) {
       return ngrWorld.removeElement(body);

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
     }

     this.toggleDebug = function() {
       $(debugCanvas).toggleClass('invisible');
     }


     this.debug = function() {
       ngrDebug.debug(debugCanvas);
     }

   })
