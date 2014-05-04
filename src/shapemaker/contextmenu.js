angular.module('shapemaker')
  .directive('customcontextmenu', function() {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: function(elem, atts) {
        return "shapemaker/tmpl/contextmenu.html";
      },
    }
  })
