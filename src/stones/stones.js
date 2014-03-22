angular.module("Stones", ['Rectangular', 'ngAudio'])
  .controller("GameOfStones", function ($scope, ngrEnvironment, ngAudio, ngrWorld, ngrGame, StonesModels, ngrLoop, ngrInterface, stonesLevels) {
    console.log("A Game of Stones");
    ngrEnvironment.init({
      canvas: $('canvas'),
      constrainFocusToRoom: false
    });
    ngrEnvironment.load(stonesLevels.getLevel(1));

    ngrEnvironment.debug(false);
    ngrEnvironment.setZoom(0.2);
    ngrInterface.enableDrag();
    ngrInterface.setGrabOnly("doodad");
    ngrInterface.scrollToZoom(true);
    ngrEnvironment.constrainFocus({
      x: 20,
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
      var starters = ngrEnvironment.getBodiesByUserData('worldStarter', true);
      // ngrEnvironment.remove(starter);
      ngrEnvironment.start();
      var base = ngrEnvironment.getBodiesByUserData('base', true);
      var prizes = ngrEnvironment.getBodiesByUserData('prize', true);
      var doodads = ngrEnvironment.getBodiesByUserData('doodad', true);
      var destructibles = ngrEnvironment.getBodiesByUserData('destructible', true);
      var explosives = ngrEnvironment.getBodiesByUserData('explosive', true);
      var stones = ngrEnvironment.getBodiesByUserData('stone', true);

      _.each(base, function (comp) {
        comp.unfreeze();
        var canPlayAudio = false;
        comp.onimpact(5, function (body, other, force) {

          if (canPlayAudio) {
            ngAudio.play('audio/explosion1.mp3');
            canPlayAudio = false;
          } else {
            setTimeout(function () {
              canPlayAudio = true
            }, 500)
          }

        })
      })

      _.each(doodads, function (doodad) {
        doodad.freeze();
      })

      _.each(explosives, function (explosive) {

        explosive.onimpact(0, function (body, other) {
          if (other.GetUserData().stone) {

            ngAudio.play('audio/explosion1.mp3');

            ngrGame.explode(explosive);
          }
        })

      })

      _.each(stones, function (stone) {

        stone.onimpact(5, function (body, other, force) {
          if (force < 10) {
            //ngAudio.play('audio/rumble1.mp3');          
          }
        })

      })

      _.each(destructibles, function (destructible) {

        destructible.onimpact(0, function (body, other, force) {

          if (other.options.bullet) {

            ngAudio.play('audio/explosion2.mp3');
            body.crumble();
          }
        });
      })

      _.each(prizes, function (prize) {

        prize.unfreeze();
        var prizeStartingY = prize.GetPosition().y;
      })

      _.each(starters, function (starter) {
        starter.crumble();
      })

      var h = ngrLoop.addHook(function () {
        //var pos = prize.GetPosition();
        //if (pos.y - prizeStartingY > 5) {
        //  ngrLoop.removeHook(h);
        //  $scope.endLevel(true);
        //}
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
      //console.log("Adding", type, params);
      ngrEnvironment.add(null, params);
    }

  })
