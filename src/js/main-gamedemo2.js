requirejs.config({
    baseUrl: 'js',
    paths: {
      shapemaker: '../shapemaker',
      Rectangular: 'lib/Rectangular',
      angular: 'lib/angular',
      Box2D: 'lib/Box2dWeb-2.1.a.3',
      cq: '../confusionQuest',
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
    'lib/jquery',
    'lib/create'    ,
    'lib/easel'    ,
    'lib/underscore',
    'lib/box2d',
    'lib/mousetrap',
    'lib/angular.audio',
    'Rectangular/Rectangular',

    'shapemaker/shapemaker.js',
    'confusionQuest/ConfusionQuest.js',

    // //

    'util',
  ], function (
    shapemaker
  ) {
    console.log("Yay!", arguments);
//    angular.bootstrap(document, ['shapemaker']);
    angular.bootstrap(document, ['ConfusionQuestDemo']);
  })
