angular.module("ConfusionQuestDemo", ['ConfusionQuest', 'Rectangular'])
  .controller("ConfusionQuest", function ($scope, ConfusionQuest, ConfusionQuestSplashMenu, ngrGame, ConfusionQuestHud, ngrEnvironment, ngrInterface, ngrStage, ngrCamera) {

    console.log("initing controller");

    ngrEnvironment.init({
      fps: 60,
      debug: false,
    });
    ngrInterface.init();

   
    ngrCamera.constrainZoom({
      min: 0.05,
      max: 2,
    })

    ngrInterface.onmove(function (r) {
      $scope.r = r;
      $scope.$apply();
    })

    ConfusionQuestSplashMenu.opening()
      .then(function () {

        ngrGame.init();
        ngrInterface.onclick(function (r) {
          $scope.contextBody = r.body;

        })

      })
  })
