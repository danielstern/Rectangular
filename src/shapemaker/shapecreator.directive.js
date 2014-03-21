angular.module('shapemaker')
  .directive('shapemaker', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, atts) {
        return "shapemaker/tmpl/shapecreator.html";
      },
      scope: {

      },
      controller: function ($scope, $attrs, $element, ngrEnvironment, ngrState, shapemakerDefaults) {

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
          console.log("PReset updated", $scope.q.preset);
          if ($scope.q.preset) {
            var pre = $scope.q.preset;
            _.each(pre.presets, function (_pre, key) {
              $scope.q[key] = _pre;
            })
            $scope.q.shape = _.find($scope.options,function(option){
              console.log("Finding shape...",option, pre);
              return (pre.shape == option.type);
            });
         //   $scope.q.shape = {name:'circle'};
            $scope.q.shapeKind = q.shape.type;
            if (pre.skin) q.src = pre.skin.src;
          }
        })

        $scope.newShape = function (input) {
          $scope.addShape($attrs.shape);
        }

        $scope.$watch('q', function () {
          console.log("Q changed...",$scope.q);
          if ($scope.defaults) $scope.properties = $scope.defaults[$scope.q.shape.type].params.split(' ');
        }, true)


        $scope.options = shapemakerDefaults.shapeOptions;
        $scope.skins = shapemakerDefaults.skins;
        $scope.presets = shapemakerDefaults.presets;
        $scope.q.preset = _.sample($scope.presets);

        $scope.addShape = function (shape) {
          if (q.skin) q.src = q.skin.src;
          console.log("adding shape...",shape,shapemakerDefaults.shape(q));
          ngrEnvironment.add(shape,shapemakerDefaults.shape(q));
        }

        $scope.destroy = function () {
          $($element).hide();
        }
      }
    }
  })
