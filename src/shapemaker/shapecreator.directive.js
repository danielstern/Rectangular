angular.module('shapemaker')
 .directive('shapemaker', function() {
    return {
      restrict: 'AE',
      templateUrl: function(elem, atts) {
        return "shapemaker/tmpl/shapecreator.html";
      },
      scope: {

      },
      controller: function($scope, $attrs, $element, ngrEnvironment, ngrState) {

        $scope.q = {};
        var q = $scope.q;
        q.height = 2;
        q.width = 1;
        q.radius = 2;
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
          box: {
            params:'height width restitution density friction gravityScale linearDamping angle',
          },
          triangle: {
            params: 'innerAngle adjacent opposite restitution density friction gravityScale linearDamping angle',
          },
          circle: {
            params: 'radius restitution density friction gravityScale linearDamping angle'
          }
        }


        $scope.newShape = function(input) {
          $scope.addShape($attrs.shape);
        }


        $scope.$watch('q', function() {
          //console.log("q changed...");
          if ($scope.defaults) $scope.properties = $scope.defaults[$scope.q.shape].params.split(' ');
   
        },true)

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
            x: Math.random() * ngrState.getState().worldWidth,
            height: q.height / 2,
            width: q.width / 2,
            type: 'dynamic',
            restitution: q.restitution,
            density: q.density,
            bg: 'tiled',
            src: 'img/box.png',
            gravityScale: q.gravityScale,
            friction: q.friction,
            angle: q.angle,
          });
        }

        $scope.addTriangle = function() {
          ngrEnvironment.add('triangle', {
            x: Math.random() * ngrState.getState().worldWidth,
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
            x: Math.random() * ngrState.getState().worldWidth,
            radius: q.radius,
            bg: 'tiled',
            src: 'img/grassCenter.png',
            type: 'dynamic',
            shape: 'circle',
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