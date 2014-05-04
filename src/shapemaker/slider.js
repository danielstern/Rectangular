angular.module('shapemaker')
  .directive('slider', function() {
    return {
      restrict: 'AE',
      templateUrl: function(elem, atts) {
        return "templates/shapemaker/slider.html";
      },
    }
  })
