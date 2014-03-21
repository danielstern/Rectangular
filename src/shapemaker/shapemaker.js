 angular.module("shapemaker", ['ngAudio', 'Rectangular'])
   .controller('myDemoCtrl', function ($scope, $element, ngrData, ngrDefaults, ngrLoop, ngrWorld, ngrInterface, ngrEnvironment, ngrState, ngAudio, $compile) {

     var contextMenu;
     var contextPin;

     $scope.editingContext = false;
     $scope.stats = {};

     ngrEnvironment.init($scope.context);
     ngrInterface.enableDrag();

     ngrInterface.onmove(function (r) {
       $scope.r = r;
       $scope.$apply();
     })

     ngrInterface.ongrab(function (body) {
       $scope.contextBody = body;
       window.contextBody = body;
     })

     Mousetrap.bind({
       'f': function () {
         var cti = $scope.contextBody;
         if (!cti) return;
         if (cti.GetType() == 2) {
           $scope.freezeContextItem();
         } else {
           $scope.unfreezeContextItem();
         }
       },
       'p': function () {
         $scope.pinContextItem();
       },
       'u': function () {
         $scope.unpinContextItem();
       },
       'del': function () {
         $scope.deleteContextItem();
       },
       'g': function () {
         $scope.followContextItem();
       }
     }, 'keydown');

     if (localStorage['savedWorlds']) {
       $scope.savedWorlds = JSON.parse(localStorage['savedWorlds']);
     };

     $(document).bind("contextmenu", function (event) {
       event.preventDefault();
       if (ngrInterface.getBodyAtMouse()) {
         if (contextMenu) $(contextMenu).hide();
         contextMenu = angular.element("<div customcontextmenu></div>");
         var cmpl = $compile(contextMenu);
         $('body').append(contextMenu);
         $scope.contextBody = ngrInterface.getBodyAtMouse();
         cmpl($scope);

         $scope.contextType = $scope.contextBody.GetType();

         $(contextMenu)
           .css({
             top: event.pageY + "px",
             left: event.pageX + "px"
           });

         contextPin = ngrInterface.pinToMouse($scope.contextBody);

         $(document).bind("mousedown", function (event) {
           if (event.target.tagName == "LI") return true;
           if (contextMenu) {
             hideContextMenu();
           }

         })
       }
     });

     $scope.world = ngrWorld;

     $scope.newMaker = function () {
       var el = angular.element("<shapemaker></shapemaker>");
       var cmpl = $compile(el);
       $element.find('makers').append(el);
       cmpl($scope);
     }

     $scope.explodeContextItem = function () {
       ngrWorld.explode($scope.contextBody);
     }

     $scope.clearAll = function () {
       ngrEnvironment.clearAll();
       ngrEnvironment.createRoom();
     };

     $('canvas')[0].addEventListener('dblclick', function () {
       ngrEnvironment.unfollow();
       ngrInterface.focusToMouse();
     });

     $('canvas')[0].addEventListener("mousewheel", MouseWheelHandler, false);

     function MouseWheelHandler(e) {

       e.preventDefault();

       if (e.wheelDelta < 0) {
         $scope.context.zoom -= 0.05;
       } else {
         $scope.context.zoom += 0.05;
       }

       if ($scope.context.zoom < 0.05) $scope.zoom = 0.05;

       $scope.$apply();
     }

     $scope.deleteContextItem = function () {
       ngrEnvironment.remove($scope.contextBody);
       hideContextMenu();
     }

     $scope.freezeContextItem = function () {
       ngrWorld.freeze($scope.contextBody);

     }

     

     $scope.editContext = function() {
      ngrLoop.stop();
     }

     $scope.stopEditContext = function() {
      ngrLoop.start();
     }


     $scope.unfreezeContextItem = function () {

       $scope.contextBody.SetType(b2Body.b2_dynamicBody);

     }

     $scope.pinContextItem = function () {
       var cti = $scope.contextBody;
       var pin = ngrEnvironment.pin(cti);
       cti.pins = cti.pins || [];
       cti.pins.push(pin);
       hideContextMenu();
     }

     $scope.unpinContextItem = function () {
       var cti = $scope.contextBody;
       var pins = cti.pins;
       _.each(pins, function (pin) {
         ngrWorld.unpin(pin);
       })

       hideContextMenu();
     }

     $scope.save = function (name) {
       if (!name) name = epicId();
       var worldString = JSON.parse(ngrEnvironment.getJSON());
       worldString.name = name;
       var savedWorlds = getSavedWorlds();

       savedWorlds.push(worldString);
       localStorage['savedWorlds'] = JSON.stringify(savedWorlds);

       $scope.savedWorlds = savedWorlds;

       $scope.worldName = '';

     }

     function getSavedWorlds() {
       var savedWorlds;
       var savedWorldsStr = localStorage['savedWorlds'];
       if (savedWorldsStr) {
         try {
           savedWorlds = JSON.parse(savedWorldsStr);
         } catch (e) {
           console.error("Couldn't parse saved worlds", savedWorldsStr);
         }
       };

       return savedWorlds || [];

     }

     $scope.deleteSavedWorld = function (_dWorld) {

       var savedWorlds = getSavedWorlds();

       savedWorlds = _.filter(savedWorlds, function (world) {
         if (world.name != _dWorld.name) return true;
       })

       localStorage['savedWorlds'] = JSON.stringify(savedWorlds);

       $scope.savedWorlds = savedWorlds;

     }

     $scope.load = function (_world) {
       ngrEnvironment.clearAll();
       ngrEnvironment.load(_world);
       $scope.contextBody = undefined;
       $scope.context.room = _.clone(state.room);
     }

     $scope.exportSavedWorld = function (_world) {
       $scope.worldExport = ngrData.getJSON();
     }

     function hideContextMenu() {
       if (contextMenu) {

         $(contextMenu).hide();
         contextmenu = null;
         ngrWorld.unpin(contextPin);

       }
     }

   })
