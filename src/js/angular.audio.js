/* NG AUDIO MOD
@github: danielstern
License: PLEASE USE FOR EVIL*/

angular.module('ngAudio',[])
.directive('ngAudio', function () {
  return {
    restrict: 'A',
    controller: function ($scope, $attrs, $element) {

  	/* Add a click listner to the element the directive is on. */
   	$element.click(function(){
   		
 		/* Find the sound tag embedded in the markup. */
 		var $sound = document.getElementById($attrs.ngAudio);

 		/* Play the sound. */
 		$sound.play();
   	})   
  },
 }
})
.service('ngAudio',function(){
	this.play = function(id) {
		var $sound = document.getElementById(id);

		/* Play the sound. */
		$sound.play();

	};

	this.stop = function(id) {
		var $sound = document.getElementById(id);

		/* stop the sound. */
		$sound.stop();

	};


})