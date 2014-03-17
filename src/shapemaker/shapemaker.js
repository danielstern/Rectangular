 angular.module("shapemaker", ['ngAudio', 'Rectangular'])
   .controller('myDemoCtrl', function($scope, $element, ngrDefaults, ngrLoop, ngrWorld, ngrInterface, ngrEnvironment, ngrState, ngAudio, $compile) {

     var contextMenu;
     $scope.editingContext = false;
     $scope.stats = {};
       $scope.q = {};

     ngrEnvironment.init({
       scale: 30,
       floor: true,
       worldHeight: 30,
       room: {
         width: 80,
         height: 40,
         floor: true,
         leftWall: true,
         rightWall: true,
         roof: false 
       }
     });

   //  ngrState.setZoom(0.5);
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

     $scope.followContextItem = function() {
      ngrWorld.follow($scope.contextBody);
     }


//     if (localStorage['lastSaved']) ngrWorld.load(JSON.parse(localStorage['lastSaved']));

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

     $scope.clearAll = function() {
       ngrEnvironment.clearAll();
       ngrEnvironment.floor();
     };


     $('canvas')[0].addEventListener('dblclick', function() {

       ngrInterface.focusToMouse();

     });

     $scope.deleteContextItem = function() {
       ngrEnvironment.remove($scope.contextBody);
       hideContextMenu();
     }

     $scope.freezeContextItem = function() {
       $scope.contextBody.SetType(b2Body.b2_staticBody);
       hideContextMenu();
     }

     $scope.editContext = function() {
       $scope.editingContext = true;
       $scope.freezeContextItem();
       $scope.unpinContextItem();
     }

     $scope.stopEditContext = function() {
       $scope.editingContext = false;
     }

     ngrLoop.addPermanentHook(function() {
       var contextBody = $scope.contextBody;
       if (contextBody) {

         if (!$scope.editingContext) {
           var bodyPos = contextBody.GetPosition();
           var bodyAngle = contextBody.GetAngle();
           $scope.contextPos = {
             x: bodyPos.x,
             y: bodyPos.y
           };
           $scope.contextPos.angle = bodyAngle;
           


         }
       }

       $scope.stats.focus = ngrState.getFocus();
       $scope.stats.scale = ngrState.getScale();
       $scope.q.zoom = ngrState.getZoom();
       $scope.$apply();

     })

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

     $scope.save = function() {
       var worldString = ngrEnvironment.getJSON();
       console.log("Worldstr?", worldString);
       localStorage['lastSaved'] = worldString;
     }


     $scope.$watchCollection("contextPos", function() {
       if ($scope.editingContext) {
         if (contextBody) {
           contextBody.SetPosition(new b2Vec2(Number($scope.contextPos.x), Number($scope.contextPos.y)));
           contextBody.SetAngle(Number($scope.contextPos.angle))
         }
       }
     })

     function hideContextMenu() {
       if (contextMenu) {
         setTimeout(function() {
           $(contextMenu).hide();
           contextmenu = null;
           ngrWorld.unpin(contextPin);
         }, 10)
       }
     }

     var contextMenu;
     var contextPin;
   })
