angular.module('shapemaker')
.directive('slider', function() {
  return {
    restrict: 'AE',
    link: function($scope, elem, attr) {
      $scope.atts = attr;

      $scope.min = 0;
      $scope.max = 25;
      var t = attr.type;
      var target = attr.target;
      $scope.q = $scope[target];


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