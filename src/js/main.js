requirejs.config({
    baseUrl: 'js',
    paths: {
      shapemaker: '../shapemaker',
      confusionQuest: '../confusionQuest',
      Rectangular: 'lib/Rectangular'
    },
    shim: {
      jquery: {
        exports: "$"
      },
      angular: {
        exports: "angular"
      },
    }});

  require([
    'lib/angular',
    'lib/create'    ,
    'lib/easel'    ,
    'lib/angular.audio',
    'js/lib/Rectangular/Rectangular.js',
    'shapemaker/shapemaker.js',
    'confusionQuest/confusionQuest.js'
  ], function (
    shapemaker
  ) {
    console.log("Yay!", arguments);
    angular.bootstrap(document, ['shapemaker']);
  })
