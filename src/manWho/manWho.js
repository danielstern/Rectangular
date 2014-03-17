 angular.module("manWho", ['ngAudio', 'Rectangular'])
   .controller('manWho', function($scope, $element, ngrDefaults, ngrLoop, ngrWorld, ngrInterface, ngrEnvironment, ngrState, ngAudio, $compile) {

     ngrEnvironment.init({
       floor: true,
       scale: 'auto',
       worldHeight: 20
     });
});
