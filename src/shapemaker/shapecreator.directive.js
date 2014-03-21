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

        $scope.q = _.clone(shapemakerDefaults.creatorDefaults);
        var q = $scope.q;
        

        $scope.defaults = shapemakerDefaults.shapeDefaultParams;

        $scope.$watchCollection('q.preset', function () {
          if ($scope.q.preset) {
            var pre = $scope.q.preset;
            _.each(pre.presets, function (_pre, key) {
              $scope.q[key] = _pre;
            })
            $scope.q.shape = _.find($scope.options,function(option){
              return (pre.shape == option.type);
            });

            $scope.q.skin = _.find($scope.skins,function(_skin){
              return (_skin.src === pre.skin.src);
            });

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
