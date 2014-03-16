 angular.module('Rectangular')
   .service('ngrEnvironment', function(ngrWorld, ngrStage, ngrModels, ngrDefaults, $q, ngrState, ngrDebug, ngrLoop, ngrDisplay) {

     this.addHook = ngrLoop.addHook;
     this.clearHooks = ngrLoop.clearHooks;
     this.setGravity = ngrWorld.setGravity;
     this.setWorldHeight = ngrState.setWorldHeight;
     var e = this;
     var _floorObj;
     var _canvas;

     this.init = function(worldInitObject) {

       var env = {};

       var defaults = _.clone(ngrDefaults.initialize);
       var options = _.extend(defaults, worldInitObject);

       _canvas = options.canvas || $('canvas')[0];
       options.canvas = _canvas;
       env.height = _canvas.height;
       env.width = _canvas.width;

       if (options.scale == 'auto') {
         env.SCALE = 1 / options.worldHeight * env.height;
       } else {
         env.SCALE = options.scale;
       }

       env.worldWidth = options.worldWidth;
       env.worldHeight = options.worldHeight;

       ngrState.setProperties(env);
       ngrLoop.initWorld(options.fps, env);
       ngrStage.init();   
       ngrWorld.setWorld(0, options.gravity, true);

       e.start();
       //e.floor();

     }

     this.floor = function(options) {

       if (_floorObj) e.remove(_floorObj);
       options = options || {};
       var floor = ngrModels.floor(options);
       _floorObj = e.add('box', floor.options);
     }

     this.getFloor = function() {
       return _floorObj;
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

     e.setWorldSpeed = function(speed) {
       ngrLoop.setSpeed(speed);
     }


     this.stop = function() {
       ngrLoop.stop();
     }

     this.start = function() {
       ngrLoop.start();
       e.debug();
     }

     this.add = function(type, options) {
       var options = options || {};
       options.shapeKind = type || 'box';
       //var s = ngrBox.shape(options);
       var b = ngrWorld.addElement(options);

       if (!options.hidden) ngrDisplay.skin(b, options);

       return b;
     }

     this.remove = function(body) {
       return ngrWorld.removeElement(body);

     }

     this.clearAll = function() {
       ngrWorld.clearAll();
       ngrStage.clearAll();
       ngrLoop.clearHooks();
     }

     this.toggleDebug = ngrDebug.toggleDebug;

     this.debug = function() {
       ngrDebug.debug(_canvas);
     }

   })
