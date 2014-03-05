angular.module('Rectangular',[])
.directive('ngRtStage',function(){
	console.log("Compinling directive");
	return {
		restrict: 'AE',
		link: function() {
			console.log("I'm a stage.");
		}
	}
})