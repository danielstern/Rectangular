 angular.module('Rectangular')
   .service('ngrEnvironment', function(ngrWorld, ngrInterface, ngrStage, ngrModels, ngrDefaults, $q, ngrState, ngrDebug, ngrLoop, ngrDisplay) {

     this.addHook = ngrLoop.addHook;
     this.clearHooks = ngrLoop.clearHooks;
     this.setGravity = ngrWorld.setGravity;
     this.setWorldHeight = ngrState.setWorldHeight;
     this.getJSON = ngrState.getJSON;
     this.blocker = ngrStage.blocker;
     this.pin = ngrInterface.pinToMouse;
     this.load = ngrWorld.load;
     this.follow = ngrWorld.follow;

     var e = this;
     var _canvas;

     this.setFocus = function(focusObject) {
      ngrState.setFocus(focusObject);
     }

     this.init = function(worldInitObject) {

       var defaults = _.clone(ngrDefaults.initialize);
       var options = _.extend(defaults, worldInitObject);

       _canvas = options.canvas || $('canvas')[0];
       options.canvas = _canvas;
       options.height = _canvas.height;
       options.width = _canvas.width;

       if (options.scale == 'auto') {
         options.SCALE = 1 / options.worldHeight * options.height;
       } else {
         options.SCALE = options.scale;
       }

       options.speed = options.fps;

       ngrState.setProperties(options);
       ngrLoop.initWorld(options.fps);
       ngrStage.init(_canvas);   
       ngrWorld.setWorld(0, options.gravity, true);

//       console.log("initing",options)
       e.start();

       //if (options.floor) e.floor();
       if (options.room) {
        var r = options.room;
        if (r.floor) e.floor();
        if (r.leftWall) e.leftWall();
        if (r.rightWall) e.rightWall();
        if (r.roof) e.roof();
       }

     }

     this.setZoom = ngrState.setZoom;

     this.floor = function(options) {

       var floor = ngrModels.floor(options);
        e.add('box', floor.options);
     }

     this.roof = function(options) {

       var roof = ngrModels.roof(options);
        e.add('box', roof.options);
     }


     this.leftWall = function(options) {

       var leftWall = ngrModels.leftWall(options);
       e.add('box', leftWall.options);


     }

     this.rightWall = function(options) {

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
       if (!options) throw new Error("You can't add a shape without options.");
       options.shapeKind = type;

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
