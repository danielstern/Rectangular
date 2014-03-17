angular.module('shapemaker')
  .directive('customcontextmenu', function() {
     return {
       restrict: 'A',
       replace: false,
       templateUrl: function(elem, atts) {
         return "shapemaker/contextmenu.html";
       },

     }
   })
   .directive('shapemaker', function() {
     return {
       restrict: 'AE',
       templateUrl: function(elem, atts) {
         return "shapemaker/creator.html";
       },
       scope: {

       },
       controller: function($scope, $attrs, $element, ngrEnvironment, ngrState) {

         $scope.q = {};
         var q = $scope.q;
         q.height = 1;
         q.width = 1;
         q.radius = 0.5;
         q.restitution = 0.3;
         q.density = 0.5;
         q.friction = 0.5;
         q.linearDamping = 0.5;
         q.gravityScale = 0.5;
         q.angle = 0;
         q.shape = $attrs.shape || 'circle';

         q.innerAngle = 60;
         q.adjacent = 2;
         q.opposite = 2;

         $scope.defaults = {
           box: 'height width restitution density friction gravityScale linearDamping angle',
           triangle: 'innerAngle adjacent opposite restitution density friction gravityScale linearDamping angle',
           circle: 'radius restitution density friction gravityScale linearDamping angle'
         }
         switch ($attrs.shape) {
           case 'circle':
             $scope.properties = $scope.defaults.circle.split(' ');
             break;
           case 'box':
             $scope.properties = $scope.defaults.box.split(' ');
             break;
         }

         $scope.newShape = function(input) {
           $scope.addShape($attrs.shape);
         }


         $scope.$watchCollection('q', function() {
           $scope.properties = $scope.defaults[$scope.q.shape].split(' ');
         })

         $scope.options = [{
             name: 'Circle',
             type: 'circle'
           }, {
             name: 'Rectangle',
             type: 'box'
           }, {
             name: 'Triangle',
             type: 'triangle'
           }

         ]

         $scope.addShape = function(shape) {

           switch (q.shape) {
             case 'box':
               $scope.addBox();
               break;
             case 'circle':
               $scope.addCircle();
               break;
             case 'triangle':
               $scope.addTriangle();
               break;
             default:
               console.error("Unavailable shape,", shape);
               break;
           }
         }

         $scope.addBox = function() {
           ngrEnvironment.add('box', {
             x: Math.random() * 40 / ngrState.getScale() * 20,
             height: q.height / 2,
             width: q.width / 2,
             type: 'dynamic',
             restitution: q.restitution,
             density: q.density,
             gravityScale: q.gravityScale,
             friction: q.friction,
             angle: q.angle,
           });
         }

         $scope.addTriangle = function() {
           ngrEnvironment.add('triangle', {
             x: Math.random() * 40 / ngrState.getScale() * 20,
             innerAngle: q.innerAngle,
             adjacent: q.adjacent,
             opposite: q.opposite,
             type: 'dynamic',
             restitution: q.restitution,
             density: q.density,
             gravityScale: q.gravityScale,
             friction: q.friction,
             angle: q.angle,
           });
         }


         $scope.destroy = function() {
           $($element).hide();
         }

         $scope.addCircle = function() {
           ngrEnvironment.add('circle', {
             x: Math.random() * 40 / ngrState.getScale() * 20,
             radius: q.radius,
             type: 'dynamic',
             restitution: q.restitution,
             density: q.density,
             friction: q.friction
           });
         }

         setTimeout(function() {

           var dropdown = $element.find('select');
           var ddl = dropdown[0];
           var opts = ddl.options.length;
           for (var i = 0; i < opts; i++) {
             if (ddl.options[i].value == q.shape) {
               ddl.selectedIndex = i;
               break;
             }
           }
         }, 1)
       }
     }
   })
   .directive('worldcontroller', function() {
     return {
       restrict: 'AE',
       templateUrl: function(elem, atts) {
         return "shapemaker/worldcontroller.html";
       },
       controller: function($scope, $attrs, $element, ngrEnvironment) {

       
         var q = $scope.q;
         q.scale = 2;
         q.gravity = 30;
         q.speed = 60;
         q.zoom = 0.3;

         $scope.properties = "gravity speed zoom".split(' ')

         $scope.$watchCollection('q', function() {
           ngrEnvironment.setGravity(q.gravity);
           ngrEnvironment.setWorldSpeed(q.speed);
           ngrEnvironment.setZoom(q.zoom);
         });


       }
     }
   })
   .directive('slider', function() {
     return {
       restrict: 'AE',
       link: function($scope, elem, attr) {
         $scope.atts = attr;

         $scope.min = 0;
         $scope.max = 25;
         var t = attr.type;

         switch (t) {
           case 'restitution':
           case 'friction':
           case 'angularDamping':
           case 'linearDamping':
             $scope.max = 1;
             break;
           case 'angle':
             $scope.max = 6.28;
             break;
           case 'innerAngle':
             $scope.max = 179;
             break;
           case 'zoom':
             $scope.min = 0.01;
             $scope.max = 3;
            break;
           case 'gravity':
             $scope.max = 100;
             $scope.min = -100;
             break;
           case 'speed':
             $scope.max = 100;
             $scope.min = 0.01;
             break;
           case 'scale':
             $scope.max = 30;
             $scope.min = 2;
           case 'focusX':
           case 'focusY':
             $scope.max = 1000;
             $scope.min = -1000;
             break;

         }
       },
       templateUrl: function(elem, atts) {
         return "shapemaker/slider.html";
       },
     }
   })
   .directive('clickput', function() {
     return {
       restrict: 'AE',
       controller: function($scope, $attrs, $element, ngrEnvironment) {
         console.log("hey clickput.");
         var editing;
         var input = $element.find('input')[0];
         //console.log("input?",input);
         $($element).click(function() {
           console.log("You clicked the clickput");
           $element.find('entry').removeClass('invisible');
           $element.find('display').addClass('invisible');

           //window.focus(input);
           input.focus();
           input.select();
           Mousetrap.bind('Enter', onFocusOut);


           $($element).on('focusout', onFocusOut);

           function onFocusOut() {
             Mousetrap.unbind('Enter', onFocusOut);
             $element.find('entry').addClass('invisible');
             $element.find('display').removeClass('invisible');
             input.blur();
             //$scope.$apply();

           }
         })



       }

     }
   })
