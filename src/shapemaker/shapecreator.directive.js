angular.module('shapemaker')
  .directive('shapemaker', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, atts) {
        return "shapemaker/tmpl/shapecreator.html";
      },
      scope: {

      },
      controller: function ($scope, $attrs, $element, ngrEnvironment, ngrWorld, ngrState, shapemakerDefaults) {

        $scope.defaults = shapemakerDefaults.shapeDefaultParams;
        $scope.preset = {};
        var paramaters = $scope.paramaters = {};

        $scope.$watchCollection('preset', function () {
          var pre = $scope.preset;
          if (!pre.shape) return;
          console.log("Preset?", pre);
          _.each(pre.presets, function (_pre, key) {
            $scope.paramaters[key] = _pre;
          });

          $scope.paramaters.userData = $scope.preset.userData || {};

          $scope.paramaters.shape = _.find($scope.options, function (option) {
            return (pre.shape == option.type);
          });

          $scope.paramaters.skin = _.find($scope.skins, function (_skin) {
            return (_skin.src === pre.skin.src);
          });

          $scope.paramaters.shapeKind = paramaters.shape.type;

          if (pre.skin) paramaters.src = pre.skin.src;
        })

        $scope.newShape = function (input) {
          $scope.addShape();
        }

        $scope.$watch('paramaters', function () {
          if (!$scope.paramaters.shape) return;
          console.log("paramaters watch time", $scope.paramaters.shape)
          $scope.defaults[$scope.paramaters.shape.type].params.split(' ');
        }, true)

        $scope.options = shapemakerDefaults.shapeOptions;
        $scope.skins = shapemakerDefaults.skins;
        $scope.presets = shapemakerDefaults.presets;
        $scope.paramaters.preset = _.sample($scope.presets);

        $scope.addShape = function (shape) {

          if (paramaters.preset.skin) _.extend(paramaters, paramaters.preset.skin);
          if (paramaters.customSrc) {
            paramaters.src = $scope.paramaters.customSrc;
          };
          paramaters.profile = paramaters.preset.profile;
          console.log("adding shape,", shape, paramaters.preset);
          ngrWorld.addElement(shapemakerDefaults.shape(paramaters));
        }

        $scope.destroy = function () {
          $($element).hide();
        }
      }
    }
  })
