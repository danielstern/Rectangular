requirejs.config({
  baseUrl: 'js/lib/Rectangular',
});

define([
  'ngrActor',
  'ngrBody',
  'ngrBox',
  'ngrCamera',
  'ngrData',
  'ngrDefaults',
  'ngrDebug',
  'ngrEnvironment',
  'ngrGame',
  'ngrInterface',
  'ngrLoop',
  'ngrModels',
  'ngrSkin',
  'ngrStage',
  'ngrState',
  'ngrWorld',
])
angular.module('Rectangular', [])
