angular.module("Stones",['Rectangular'])
.controller("GameOfStones",function(ngrEnvironment, stonesLevels) {
	console.log("A Game of Stones");
	ngrEnvironment.init($('canvas'));
	ngrEnvironment.load(stonesLevels.getDemo());
	ngrEnvironment.debug(false);
})
