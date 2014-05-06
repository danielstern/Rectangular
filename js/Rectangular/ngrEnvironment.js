 angular.module('Rectangular')
   .service('ngrEnvironment', function(ngrWorld,
       ngrDebug, ngrDefaults, $q, ngrState, ngrLoop) {

       var e = this;

       this.init = function(worldInitObject) {

         var defaults = {
           canvas: undefined,
           scale: 30,
           fps: 60,
           gravity: 60,
           debug: true,
           zoom: 1,
           floor: true,
           room: {
             width: 40,
             height: 25
           }
         };

       var options = _.extend(defaults, worldInitObject);

       options.canvas = options.canvas || $('canvas');

       ngrState.setState(options);
       ngrLoop.init(options.speed);

       ngrWorld.init(0, options.gravity, true);

       var _world = ngrWorld.getWorld();
       //    ngrStage.init(options.canvas);

       // ngrDebug.setWorld(_world);
       // ngrDebug.debug(options.debug);

       if (options.room) {
         ngrState.updateState('room', options.room);
       }

       ngrLoop.addPermanentHook(function() {
         ngrWorld.tick();
       })

       ngrWorld.oncreatebody(function(body) {
         // if (!body.options.hidden) ngrStage.addSprite(body,body.options);
         ngrState.setElements(ngrWorld.getElements());

         body.oncrumble(function() {
           //  ngrStage.removeChild(body.container);
           ngrState.setElements(ngrWorld.getElements());
         })

       })
     }


     this.clearAll = function() {
       ngrWorld.clearAll();
       // ngrStage.clearAll();
       ngrLoop.clearHooks();
       ngrState.setElements([]);
     }

 })
