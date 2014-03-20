 angular.module("shapemaker", ['ngAudio', 'Rectangular'])
   .controller('myDemoCtrl', function($scope, $element, ngrDefaults, ngrLoop, ngrWorld, ngrInterface, ngrEnvironment, ngrState, ngAudio, $compile) {

     var contextMenu;
     var contextPin;

     $scope.editingContext = false;
     $scope.stats = {};

     var worldDefaults = {
       scale: 30,
       floor: true,
       worldHeight: 30,
       constrainFocusToRoom: false,
       zoom: 0.2,
       room: {
         width: 90,
         height: 40,
         floor: true,
         leftWall: true,
         rightWall: true,
         roof: false
       }
     }

     ngrEnvironment.init(worldDefaults);
     ngrInterface.enableDrag();


     ngrInterface.onmove(function(r) {
       $scope.r = r;
       $scope.$apply();
     })

     ngrInterface.ongrab(function(body) {
       $scope.contextBody = body;
       window.contextBody = body;
     })



     Mousetrap.bind({
       'f': function() {
         var cti = $scope.contextBody;
         if (!cti) return;
         if (cti.GetType() == 2) {
           $scope.freezeContextItem();
         } else {
           $scope.unfreezeContextItem();
         }
       },
       'p': function() {
         $scope.pinContextItem();
       },
       'u': function() {
         $scope.unpinContextItem();
       },
       'del': function() {
         $scope.deleteContextItem();
       },
       'g': function() {
         $scope.followContextItem();
       }
     }, 'keydown');



     if (localStorage['savedWorlds']) {
       $scope.savedWorlds = JSON.parse(localStorage['savedWorlds']);
     };

     $(document).bind("contextmenu", function(event) {
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

         $(document).bind("mousedown", function(event) {
           if (event.target.tagName == "LI") return true;
           if (contextMenu) {
             hideContextMenu();
           }

         })
       }
     });

     $scope.newMaker = function() {
       var el = angular.element("<shapemaker></shapemaker>");
       var cmpl = $compile(el);
       $element.find('makers').append(el);
       cmpl($scope);
     }



     $('canvas')[0].addEventListener('dblclick', function() {
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

     $scope.deleteContextItem = function() {
       ngrEnvironment.remove($scope.contextBody);
       hideContextMenu();
     }

     $scope.freezeContextItem = function() {
       if ($scope.contextBody) $scope.contextBody.SetType(b2Body.b2_staticBody);
       hideContextMenu();
     }

     $scope.editContext = function() {
       console.log("Ediing context...", $scope)
       $scope.editingContext = true;
       if ($scope.contextBody) {
         $scope.freezeContextItem();
         $scope.unpinContextItem();
       }
     }

     $scope.stopEditContext = function() {
       $scope.editingContext = false;
     }



     $scope.unfreezeContextItem = function() {
       $scope.contextBody.SetType(b2Body.b2_dynamicBody);
       hideContextMenu();
     }

     $scope.pinContextItem = function() {
       var cti = $scope.contextBody;
       var pin = ngrEnvironment.pin(cti);
       cti.pins = cti.pins || [];
       cti.pins.push(pin);
       hideContextMenu();
     }

     $scope.unpinContextItem = function() {
       var cti = $scope.contextBody;
       var pins = cti.pins;
       _.each(pins, function(pin) {
         ngrWorld.unpin(pin);
       })

       hideContextMenu();
     }



     function hideContextMenu() {
       if (contextMenu) {
         setTimeout(function() {
           $(contextMenu).hide();
           contextmenu = null;
           ngrWorld.unpin(contextPin);
         }, 10)
       }
     }

   })
