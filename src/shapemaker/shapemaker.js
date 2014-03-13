 angular.module("BallAgentApp", ['ngAudio', 'Rectangular'])
   .controller('myDemoCtrl', function($scope, $element, ngrEnvironment, ngAudio, $compile) {

     ngrEnvironment.init({
      scale: '2',
       worldHeight: 200
     });

     $scope.newMaker = function() {
       var el = angular.element("<shapemaker></shapemaker>");
       var cmpl = $compile(el);
       console.log("new maker", el)
       $element.find('makers').append(el);
       cmpl($scope);
     }

     $scope.clearAll = function() {
       ngrEnvironment.clearAll();
       ngrEnvironment.floor();
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
         console.log("This is my scope", $scope);

         $scope.q = {};
         var q = $scope.q;
         q.height = 1;
         q.width = 1;
         q.radius = 0.5;
         q.restitution = 0.3;
         q.density = 0.5;
         q.friction = 0.5;
         q.linearDamping = 0.5;
         q.angle = 0;
         q.shape = $attrs.shape || 'circle';

         $scope.defaults = {
           box: 'height width restitution density friction gravityScale linearDamping angle',
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
           //     console.log("Shape's changed",$scope.q);
           $scope.properties = $scope.defaults[$scope.q.shape].split(' ');
         })

         $scope.options = [{
             name: 'Circle',
             type: 'circle'
           }, {
             name: 'Rectangle',
             type: 'box'
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
             default:
               console.error("Unavailable shape,", shape);
               break;
           }
         }

         $scope.addBox = function() {
           ngrEnvironment.add('box', {
             x: Math.random() * 40 /ngrState.getScale() * 20,
             height: q.height / 2,
             width: q.width / 2,
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
           //console.log("Adding shape",$scope);
           ngrEnvironment.add('circle', {
             x: Math.random() * 40  /ngrState.getScale() * 20,
             radius: q.radius,
             restitution: q.restitution,
             density: q.density,
           });
         }

         setTimeout(function() {

           var dropdown = $element.find('select');
           //dropdown = dropdown.children();
           var ddl = dropdown[0];
           window.ddl = ddl;
           //   console.log("dropdown?",ddl);
           var opts = ddl.options.length;
           //     console.log("length?",opts);
           for (var i = 0; i < opts; i++) {
             //    console.log("val?",ddl.options[i].value);
             if (ddl.options[i].value == q.shape) {
               // ddl.options[i].selected = true;

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
     scope: {

     },
     controller: function($scope, $attrs, $element, ngrEnvironment) {
       console.log("worldController", $scope);

       $scope.q = {};
       var q = $scope.q;
       q.scale = 2;
       q.gravity = 30;
       
       $scope.properties = "scale gravity".split(' ')

       

       $scope.$watchCollection('q', function() {
       //  console.log("World's changed",$scope.q);
         //$scope.properties = $scope.defaults[$scope.q.shape].split(' ');
         ngrEnvironment.setScale(q.scale);
         ngrEnvironment.setGravity(q.gravity);
         //ngrEnvironment.floor();

         console.log("Scale?",q.scale);
         //ngrEnvironment.setWorldHeight((400 / q.scale));
       })


     }
   }
 })
   .directive('slider', function() {
     return {
       restrict: 'AE',
       link: function($scope, elem, attr) {
         // console.log("hi slider!", arguments);
         $scope.atts = attr;

         $scope.min = 0;
         $scope.max = 10;
       //  var s = $scope.$parent.shape;
         var t = attr.type;

         //sconsole.log("Slider init,", s, t, $scope);
         ///return;
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
           case 'gravity':
           case 'speed':
            $scope.max = 100;
             break;
           case 'scale':
            $scope.max = 30;
            $scope.min = 2;
            break;

         }
       },
       templateUrl: function(elem, atts) {
         return "shapemaker/slider.html";
       },
       controller: function($scope, $attrs, $parse, $compile) {

       }
     }
   })
