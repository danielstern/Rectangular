angular.module("Stones", ['Rectangular', 'ngAudio'])
  .controller("GameOfStones", function (GameOfStones, $scope, stonesAudio, stonesLevels, StonesModels, ngrEnvironment) {
    $scope.loadLevel = GameOfStones.loadLevel;
    $scope.startLevel = GameOfStones.startLevel;
    $scope.add = GameOfStones.add;
    $scope.endLevel = GameOfStones.endLevel;
    $scope.levels = stonesLevels.getLevels();
    $scope.models = StonesModels;
  })
  .service("GameOfStones", function (ngrEnvironment, ngrWorld, ngrGame, StonesModels, ngrLoop, ngrInterface, stonesLevels) {
    console.log("A Game of Stones");

    var StartLevelListeners = [];

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

    this.loadLevel = function (lvl) {
      ngrEnvironment.clearAll();
      ngrEnvironment.load(stonesLevels.getLevel(lvl));
    }

    this.onstartlevel = function (func) {
      StartLevelListeners.push(func);
    }

    this.startLevel = function () {
      var level = {};
      level.starters = ngrEnvironment.getBodiesByUserData('worldStarter', true);
      // ngrEnvironment.remove(starter);
      ngrEnvironment.start();
      level.base = ngrEnvironment.getBodiesByUserData('base', true);
      level.prizes = ngrEnvironment.getBodiesByUserData('prize', true);
      level.doodads = ngrEnvironment.getBodiesByUserData('doodad', true);
      level.destructibles = ngrEnvironment.getBodiesByUserData('destructible', true);
      level.explosives = ngrEnvironment.getBodiesByUserData('explosive', true);
      level.stones = ngrEnvironment.getBodiesByUserData('stone', true);

      _.each(level.base, function (comp) {
        comp.unfreeze();

        comp.onimpact(5, function (body, other, force) {

        })
      })

      _.each(level.doodads, function (doodad) {
        doodad.freeze();
      })

      _.each(level.explosives, function (explosive) {

        explosive.onimpact(0, function (body, other) {
          if (other.GetUserData().stone) {

            ngrGame.explode(explosive);
          }
        })

      })

      _.each(level.stones, function (stone) {

        stone.onimpact(5, function (body, other, force) {
          if (force < 10) {
            //ngAudio.play('audio/rumble1.mp3');          
          }
        })

      })

      _.each(level.destructibles, function (destructible) {

        destructible.onimpact(0, function (body, other, force) {

          if (other.options.bullet) {

            // ngAudio.play('audio/explosion2.mp3');
            body.crumble();
          }
        });
      })

      _.each(level.prizes, function (prize) {

        prize.unfreeze();
        var prizeStartingY = prize.GetPosition().y;
      })

      _.each(level.starters, function (starter) {
        starter.crumble();
      })

      var h = ngrLoop.addHook(function () {
        //var pos = prize.GetPosition();
        //if (pos.y - prizeStartingY > 5) {
        //  ngrLoop.removeHook(h);
        //  $scope.endLevel(true);
        //}
      })

      _.call(StartLevelListeners, level)
    }

    this.endLevel = function (success) {
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

    this.add = function (type) {
      var params = StonesModels[type];
      params.x = 25;
      //console.log("Adding", type, params);
      ngrEnvironment.add(null, params);
    }

  })

.service('stonesAudio', function (GameOfStones, ngAudio) {

  GameOfStones.onstartlevel(function (level) {
    _.invoke(level.destructibles, 'oncrumble', function () {
      ngAudio.play('audio/explosion2.mp3');
    })

    _.invoke(level.explosives, 'oncrumble', function () {
      ngAudio.play('audio/explosion1.mp3');
    })

  })

})
