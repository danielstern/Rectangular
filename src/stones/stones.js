angular.module("Stones", ['Rectangular', 'ngAudio'])
  .controller("GameOfStones", function (GameOfStones, $scope, stonesAudio, stonesLevels, StonesModels, ngrEnvironment) {
    $scope.loadLevel = GameOfStones.loadLevel;
    $scope.startLevel = GameOfStones.startLevel;
    $scope.add = GameOfStones.add;
    $scope.endLevel = GameOfStones.endLevel;
    $scope.levels = stonesLevels.getLevels();
    $scope.models = StonesModels;
  })
  .service("GameOfStones", function (ngrEnvironment, ngrWorld, ngrStage, ngrGame, StonesModels, ngrLoop, ngrInterface, stonesLevels) {

    var StartLevelListeners = [];
    var gos = this;

    ngrEnvironment.init({
      canvas: $('canvas'),
      debug: false,
      zoom: 0.2,
    });

    this.loadLevel = function (lvl) {
      ngrEnvironment.clearAll();
      ngrEnvironment.load(stonesLevels.getLevel(lvl));
      gos.startFormation();
    }

    this.startFormation = function () {
      ngrInterface.setGrabOnly("doodad");
      ngrInterface.scrollToZoom(true);
   //   ngrEnvironment.constrainFocus(StonesModels.focus);
      ngrEnvironment.constrainZoom(StonesModels.zoom);
      ngrEnvironment.setZoom(0.2);
      ngrInterface.enableDrag();

      ngrStage.background('img/ams1.png',10)
      ngrStage.background('img/ams2.png',9)
      ngrStage.background('img/ams3.png',8)
      ngrStage.background('img/ams4.png',8)
      
    }

    this.onstartlevel = function (func) {
      StartLevelListeners.push(func);
    }

    this.startLevel = function () {
      var level = {};
      ngrInterface.setGrabOnly();
      level.starters = ngrEnvironment.getBodiesByUserData('worldStarter', true);
      level.base = ngrEnvironment.getBodiesByUserData('base', true);
      level.prizes = ngrEnvironment.getBodiesByUserData('prize', true);
      level.doodads = ngrEnvironment.getBodiesByUserData('doodad', true);
      level.destructibles = ngrEnvironment.getBodiesByUserData('destructible', true);
      level.explosives = ngrEnvironment.getBodiesByUserData('explosive', true);
      level.stones = ngrEnvironment.getBodiesByUserData('stone', true);

      _.invoke(level.base, "unfreeze");
      _.invoke(level.doodads, "freeze");
      _.invoke(level.starters, "crumble");

      _.each(level.explosives, function (explosive) {

        explosive.onimpact(function (body, other) {
          if (other.GetUserData().stone) {
            ngrGame.explode(explosive);
          }
        })
      })

      _.each(level.destructibles, function (destructible) {
        destructible.onimpact(function (body, other, force) {
          if (other.options.bullet) {
            body.crumble();
          }
        });
      })

      _.each(level.prizes, function (prize) {

        prize.unfreeze();
        var prizeStartingY = prize.GetPosition().y;

        var h = ngrLoop.addHook(function () {
          var pos = prize.GetPosition();
          if (pos.y - prizeStartingY > 5) {
            ngrLoop.removeHook(h);
            //  $scope.endLevel(true);
            //}
          }
        })
      })



      _.call(StartLevelListeners, level)
    }

    ngrEnvironment.start();

    this.endLevel = function (success) {
      if (success) {
        ngrLoop.wait(3000)
          .then(function () {
            ngrEnvironment.blocker()
              .then(function () {
                ngrEnvironment.stop();
              })
          });
      };
    }

    this.add = function (type) {
      var params = StonesModels[type];
      params.x = 25;
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

    _.each(level.stones, function (stone) {

      stone.onimpact(function (body, other, force) {
        if (force < 10) {

        }
      })
    })

    _.each(level.base, function (comp) {
      comp.onimpact(function (body, other, force) {

      })
    })

  })

})
