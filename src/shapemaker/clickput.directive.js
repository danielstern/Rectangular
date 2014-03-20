angular.module('shapemaker')
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
         // Mousetrap.bind('enter', onFocusOut);
          $(input).keypress(function(e){
            if(e.which == 13){
                $(this).blur();    
            }
          });

          $($element).on('focusout', onFocusOut);

          function onFocusOut() {
         //   Mousetrap.unbind('Enter', onFocusOut);
            $element.find('entry').addClass('invisible');
            $element.find('display').removeClass('invisible');
            input.blur();

          }
        })
      }
    }
  })