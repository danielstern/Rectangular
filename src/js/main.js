requirejs.config({
    baseUrl: 'js',
    paths: {
      shapemaker: '../shapemaker',
      confusionQuest: '../confusionQuest',
      Rectangular: 'lib/Rectangular/Rectangular'
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
    'lib/underscore',
    'lib/box2d',
    'lib/mousetrap',
    'lib/angular.audio',
    'Rectangular',

    'shapemaker/shapemaker.js',
    'confusionQuest/confusionQuest.js',
    'util',
  ], function (
    shapemaker
  ) {
    console.log("Yay!", arguments);
    angular.bootstrap(document, ['shapemaker']);
  })
