 angular.module('Rectangular')
   .service('ngrEnvironment', function (ngrWorld, ngrCamera, ngrInterface, ngrRoom, ngrStage, ngrDebug, ngrModels, ngrDefaults, $q, ngrState, ngrLoop, ngrData) {

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
       var _world = ngrWorld.setWorld(0, options.gravity, true);

       ngrDebug.setWorld(_world);
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

       ngrLoop.start();

       ngrWorld.oncreatebody(function(body){
        if (!body.options.hidden) ngrStage.addSprite(body,body.options);
        ngrState.setElements(ngrWorld.getElements());

        body.oncrumble(function(){
          ngrStage.removeChild(body.container);
          ngrState.setElements(ngrWorld.getElements());
        })

       })
     }


     this.clearAll = function () {
       ngrWorld.clearAll();
       ngrStage.clearAll();
       ngrLoop.clearHooks();
     }

   })
