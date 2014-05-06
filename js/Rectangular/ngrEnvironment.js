 angular.module('Rectangular')
   .service('ngrEnvironment', function (ngrWorld, 
    ngrDebug, ngrDefaults, $q, ngrState, ngrLoop) {

     var e = this;

     this.init = function (worldInitObject) {

       var defaults = _.clone(ngrDefaults.initialize);
       var options = _.extend(defaults, worldInitObject);

       options.canvas = options.canvas || $('canvas');

       ngrState.setState(options);
       ngrLoop.initWorld(options.fps);

       ngrWorld.init(0, options.gravity, true);
       
       var _world = ngrWorld.getWorld();
   //    ngrStage.init(options.canvas);

      // ngrDebug.setWorld(_world);
      // ngrDebug.debug(options.debug);

       if (options.room) {
         ngrState.updateState('room',options.room);
       }

       ngrLoop.start();

       ngrLoop.addPermanentHook(function(){
          ngrWorld.tick();
       })

       ngrWorld.oncreatebody(function(body){
       // if (!body.options.hidden) ngrStage.addSprite(body,body.options);
        ngrState.setElements(ngrWorld.getElements());

        body.oncrumble(function(){
        //  ngrStage.removeChild(body.container);
          ngrState.setElements(ngrWorld.getElements());
        })

       })
     }


     this.clearAll = function () {
       ngrWorld.clearAll();
      // ngrStage.clearAll();
       ngrLoop.clearHooks();
       ngrState.setElements([]);
     }

   })
