angular.module("Stones", ['Rectangular'])
  .controller("GameOfStones", function ($scope, ngrEnvironment, ngrWorld, StonesModels, ngrLoop, ngrInterface, stonesLevels) {
    console.log("A Game of Stones");
    ngrEnvironment.init({
      canvas: $('canvas'),
      constrainFocusToRoom: false
    });
    ngrEnvironment.load(stonesLevels.getLevel(1));
    
    ngrEnvironment.debug(true);
    ngrEnvironment.setZoom(0.2);
    ngrInterface.enableDrag();
    ngrInterface.setGrabOnly("doodad");
    ngrInterface.scrollToZoom(true);
    ngrEnvironment.constrainFocus({
      x: 40,
      y: 5,
      width: 50,
      height: 25
    })

    ngrEnvironment.constrainZoom({
      min: 0.1,
      max: 2
    })

    $scope.loadLevel = function (lvl) {
      ngrEnvironment.clearAll();
      ngrEnvironment.load(stonesLevels.getLevel(lvl));
    }

    $scope.levels = stonesLevels.getLevels();
    $scope.models = StonesModels;

    $scope.startLevel = function () {
      var starter = ngrEnvironment.getBodyByUserData('worldStarter', 'true');
      ngrEnvironment.remove(starter);
      ngrEnvironment.start();
      var base = ngrEnvironment.getBodiesByUserData('base', 'true');
      var prize = ngrEnvironment.getBodyByUserData('prize', 'true');
      var doodads = ngrEnvironment.getBodiesByUserData('doodad', 'true');
      var explosives = ngrEnvironment.getBodiesByUserData('explosive', true);

      _.each(base, function (comp) {
        comp.unfreeze();
      })

      _.each(doodads, function (doodad) {
        doodad.freeze();
      })

      _.each(explosives, function (explosive) {

        explosive.onimpact(5,ngrWorld.explode)

      })

      prize.unfreeze();

      var prizeStartingY = prize.GetPosition().y;

      var h = ngrLoop.addHook(function () {
        var pos = prize.GetPosition();
        if (pos.y - prizeStartingY > 5) {
          ngrLoop.removeHook(h);
          $scope.endLevel(true);
        }
      })

    }

    $scope.endLevel = function (success) {
      if (success) {
        console.log("huzzah!");
        setTimeout(function () {
          ngrEnvironment.blocker()
            .then(function () {
              ngrEnvironment.stop();
            })
        }, 3000);
      };
    }

    $scope.add = function (type) {
      var params = StonesModels[type];
      params.x = 25;
      console.log("Adding",type,params);
      ngrEnvironment.add(null, params);
    }

  })
  
