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
     this.getBodiesByUserData = ngrWorld.getBodiesByUserData;
     this.setFocus = ngrState.setFocus;
     this.setZoom = ngrState.setZoom;
     this.updateRoom = ngrState.updateRoom;
     this.remove = ngrWorld.removeElement;
     this.toggleDebug = ngrStage.toggleDebug;
     this.debug = ngrStage.debug;
     this.setWorldSpeed = ngrLoop.setSpeed;
     this.stop = ngrLoop.stop;
     this.start = ngrLoop.start;
     this.createRoom = ngrRoom.createRoom;
     this.clearRoom = ngrRoom.clearRoom;
     this.constrainFocus = ngrState.constrainFocus;
     this.constrainZoom = ngrState.constrainZoom;

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


       console.log("initing...", options);

       ngrState.setProperties(options);
       ngrLoop.initWorld(options.fps);
       ngrWorld.setWorld(0, options.gravity, true);

       ngrStage.init(_canvas);
       ngrStage.debug(options.debug);
       if (options.room) {
         ngrState.setRoom(options.room);
       //  e.createRoom();

         var r = options.room;
         ngrState.setFocus({
           x: r.width / 2,
           y: r.height / 2
         });

         if (!options.zoom) {
           var zoomReq = r.height / (_canvas.height / 4);
           ngrState.setZoom(zoomReq);
         };
       }

       e.start();

     }

     this.add = function (type, options) {
       if (!options) throw new Error("You can't add a shape without options.");
       options.shapeKind = options.shapeKind || type;

       var b = ngrWorld.addElement(options);

       return b;
     }

     this.clearAll = function () {
       ngrWorld.clearAll();
       ngrStage.clearAll();
       ngrLoop.clearHooks();
     }

   })
