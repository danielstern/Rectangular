 angular.module("BallAgentApp", ['ngAudio', 'Rectangular'])
   .controller('myDemoCtrl', function($scope, $element, ngrEnvironment, ngAudio, $compile) {

     ngrEnvironment.init({
       scale: 'auto',
       worldHeight: 30
     });

     $scope.newMaker = function() {
       var el = angular.element("<shapemaker></shapemaker>");
       var cmpl = $compile(el);
       console.log("new maker", el)
       $element.find('makers').append(el);
       cmpl($scope);
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
       link: function($scope, $elem, $attr) {
         console.log("Hey shapemaker!", arguments);
         $scope.shape = $attr.shape;
    //     if ($attr.properties) $scope.properties = $attr.properties.split(' ');
         //$scope.shape = $attr.shape || 'box';
       },
       controller: function($scope, $attrs, ngrEnvironment) {
         console.log("This is my scope", $scope);

         $scope.q = {};
         var q = $scope.q;
         q.height = 1;
         q.width = 1;
         q.radius = 0.5;
         q.restitution = 0.3;
         q.density = 0.5;
         q.shape = 'circle';


         $scope.defaults = {
            box: 'height width restitution density',
            circle: 'radius restitution density'
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

         $scope.$watchCollection('q',function(){
            console.log("Shape's changed",$scope.q);
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
             x: Math.random() * 40,
             height: q.height / 2,
             width: q.width / 2,
             restitution: q.restitution,
             density: q.density,
           });
         }

         $scope.addCircle = function() {
           //console.log("Adding shape",$scope);
           ngrEnvironment.add('circle', {
             x: Math.random() * 40,
             radius: q.radius,
             restitution: q.restitution,
             density: q.density,
           });
         }
       }
     }
   })
   .directive('slider', function() {
     return {
       restrict: 'AE',
       link: function($scope, elem, attr) {
        // console.log("hi slider!", arguments);
         $scope.atts = attr;

         $scope.max = 10;
         var s = $scope.$parent.shape;
         var t = attr.type;

         //sconsole.log("Slider init,", s, t, $scope);
         ///return;
         switch (t) {
           case 'restitution':
             $scope.max = 1;
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
