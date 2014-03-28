 angular.module('Rectangular')
   .service('ngrEnvironment', function (ngrWorld, ngrCamera, ngrInterface, ngrRoom, ngrStage, ngrModels, ngrDefaults, $q, ngrState, ngrLoop, ngrData) {

     this.addHook = ngrLoop.addHook;
     this.clearHooks = ngrLoop.clearHooks;
     this.setGravity = ngrWorld.setGravity;
     this.setWorldHeight = ngrState.setWorldHeight;
     this.blocker = ngrStage.blocker;
     this.pin = ngrInterface.pinToMouse;
     this.getJSON = ngrData.getJSON;
     this.load = ngrData.load;
     this.follow = ngrCamera.follow;
     this.unfollow = ngrCamera.unfollow;
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

     var e = this;

     this.init = function (worldInitObject) {

       var defaults = _.clone(ngrDefaults.initialize);
       var options = _.extend(defaults, worldInitObject);

       options.canvas || $('canvas');

       if (options.room) {
         options.worldHeight = options.room.height;
         options.worldWidth = options.room.width;
       }

       
       options.scale = options.scale || 30;
       options.speed = options.fps || 60;

       ngrState.setState(options);
       ngrLoop.initWorld(options.fps);
       ngrWorld.setWorld(0, options.gravity, true);

       ngrStage.init(options.canvas);
       ngrStage.debug(options.debug);
       if (options.room) {
         ngrState.updateState('room',options.room);
         var r = options.room;
         
         ngrCamera.setFocus({
           x: r.width / 2,
           y: r.height / 2
         });
       }

       e.start();

       ngrWorld.oncreatebody(function(body){
        if (!body.options.hidden) ngrStage.addSprite(body,body.options);

        body.oncrumble(function(){
          ngrStage.removeChild(body.container);
        })

       })

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
