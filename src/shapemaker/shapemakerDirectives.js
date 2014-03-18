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

        var editing;
        var input = $element.find('input')[0];

        $($element).click(function() {
          console.log("You clicked the clickput");
          $element.find('entry').removeClass('invisible');
          $element.find('display').addClass('invisible');


          input.focus();
          input.select();
          Mousetrap.bind('Enter', onFocusOut);

          $($element).on('focusout', onFocusOut);

          function onFocusOut() {
            Mousetrap.unbind('Enter', onFocusOut);
            $element.find('entry').addClass('invisible');
            $element.find('display').removeClass('invisible');
            input.blur();

          }
        })
      }
    }
  })
