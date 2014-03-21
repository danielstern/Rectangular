angular.module('shapemaker')
  .directive('shapemaker', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, atts) {
        return "shapemaker/tmpl/shapecreator.html";
      },
      scope: {

      },
      controller: function ($scope, $attrs, $element, ngrEnvironment, ngrState, shapecreatorDefaults) {

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

        q.innerAngle = 90;
        q.adjacent = 2;
        q.opposite = 2;

        $scope.defaults = {
          box: {
            params: 'height width restitution density friction',
          },
          triangle: {
            params: 'innerAngle adjacent opposite restitution density friction',
          },
          circle: {
            params: 'radius restitution density friction'
          }
        }

        $scope.$watchCollection('q.preset', function () {
          console.log("PReset updated", $scope.q);
          if ($scope.q.preset) {
            var pre = $scope.q.preset;
            _.each(pre.presets, function (_pre, key) {
              $scope.q[key] = _pre;
            })
            $scope.q.shape = pre.shape;
            if (pre.skin) q.src = pre.skin.src;
          }
        })

        $scope.newShape = function (input) {
          $scope.addShape($attrs.shape);
        }

        $scope.$watch('q', function () {
          if ($scope.defaults) $scope.properties = $scope.defaults[$scope.q.shape].params.split(' ');
        }, true)

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

        ];

        $scope.skins = shapecreatorDefaults.skins;
        $scope.presets = shapecreatorDefaults.presets;
        $scope.q.preset = _.sample($scope.presets);

        $scope.addShape = function (shape) {
          if (q.skin) q.src = q.skin.src;
          ngrEnvironment.add(shape,shapecreatorDefaults.shape(q));
        }

        $scope.destroy = function () {
          $($element).hide();
        }
      }
    }
  })
