 angular.module('Rectangular')
   .service('ngrEnvironment', function (ngrWorld, ngrInterface, ngrRoom, ngrStage, ngrModels, ngrDefaults, $q, ngrState, ngrLoop, ngrData) {

     this.addHook = ngrLoop.addHook;
     this.clearHooks = ngrLoop.clearHooks;
     this.setGravity = ngrWorld.setGravity;
     this.setWorldHeight = ngrState.setWorldHeight;
     this.blocker = ngrStage.blocker;
     this.pin = ngrInterface.pinToMouse;
     this.getJSON = ngrData.getJSON;
     this.load = ngrData.load;
     this.follow = ngrWorld.follow;
     this.unfollow = ngrWorld.unfollow;
     this.setFocusOffset = ngrState.setFocusOffset;
     this.getBodyByUserData = ngrWorld.getBodyByUserData;
     this.setFocus = ngrState.setFocus;
     this.setZoom = ngrState.setZoom;
     this.updateRoom = ngrState.updateRoom;
     this.createRoom = ngrRoom.createRoom;
     this.clearRoom = ngrRoom.clearRoom;

     var e = this;
     var _canvas;

     this.init = function (worldInitObject) {

       var defaults = _.clone(ngrDefaults.initialize);
       var options = _.extend(defaults, worldInitObject);

       _canvas = options.canvas || $('canvas')[0];
       options.canvas = _canvas;
       options.height = _canvas.height;
       options.width = _canvas.width;

       if (options.room) {
         options.worldHeight = options.room.height;
         options.worldWidth = options.room.width;
       }

       options.SCALE = options.scale || 30;

       options.speed = options.fps;

       ngrState.setProperties(options);
       ngrLoop.initWorld(options.fps);
       ngrWorld.setWorld(0, options.gravity, true);
       ngrStage.init(_canvas);

       if (options.room) {
         ngrState.setRoom(options.room);
         e.createRoom();

         var r = options.room;
         ngrState.setFocus({
           x: r.width / 2,
           y: r.height / 2
         });

         if (!options.zoom) {
           var zoomReq = r.height / (_canvas.height / 4);
           ngrState.setZoom(zoomReq);
         }
       }

       e.start();

     }

     e.setWorldSpeed = function (speed) {
       ngrLoop.setSpeed(speed);
     }

     this.stop = function () {
       ngrLoop.stop();
     }

     this.start = function () {
       ngrLoop.start();
       //e.debug();
     }

     this.add = function (type, options) {
       if (!options) throw new Error("You can't add a shape without options.");
       options.shapeKind = type;

       var b = ngrWorld.addElement(options);

       console.log("adding...", b);

      // ngrDisplay.skin(b, options);

       return b;
     }

     this.remove = function (body) {

       console.log("Removing body", body);

       ngrStage.removeChild(body.container);
       ngrWorld.removeElement(body);

     }

     this.clearAll = function () {
       ngrWorld.clearAll();
       ngrStage.clearAll();
       ngrLoop.clearHooks();
     }

     this.toggleDebug = ngrStage.toggleDebug;

     this.debug = ngrStage.debug;

   })
  