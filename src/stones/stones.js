angular.module("Stones", ['Rectangular', 'ngAudio'])
  .controller("GameOfStones", function (GameOfStones, $scope, stonesAudio, stonesLevels, StonesModels, ngrEnvironment) {
    $scope.loadLevel = GameOfStones.loadLevel;
    $scope.startLevel = GameOfStones.startLevel;
    $scope.add = GameOfStones.add;
    $scope.endLevel = GameOfStones.endLevel;
    $scope.levels = stonesLevels.getLevels();
    $scope.models = StonesModels;
  })
  .service("GameOfStones", function (ngrEnvironment, ngrCamera, ngrState, ngrWorld, ngrLoop, ngrStage, ngrGame, StonesModels, ngrLoop, ngrInterface, stonesLevels) {

    var StartLevelListeners = [];
    var gos = this;
    var level = {};
    

    var intro = false;

    ngrEnvironment.init({
      canvas: $('canvas'),
      debug: false,
      constrainFocusToRoom: false,
      scale: 30,
      floor: true,
      zoom: 0.5,
      room: {
        width: 30,
        height: 20,
        floor: false,
        leftWall: true,
        rightWall: true,
        roof: false
      }
    });

    var currentLevel;

    this.loadLevel = function (lvl) {
      ngrGame.blocker()
        .then(function () {
          ngrEnvironment.clearAll();
          ngrEnvironment.load(stonesLevels.getLevel(lvl))
          currentLevel = lvl;
        })
        .then(function () {
          return ngrLoop.wait(10)
        })
        .then(function () {
          gos.startFormation()
        });
    }

    this.startFormation = function () {
      ngrInterface.setGrabOnly("doodad");
      ngrInterface.scrollToZoom(true);
      ngrCamera.setZoom(0.2, true);
      ngrInterface.enableDrag();

      ngrEnvironment.start();

      level.prizes = ngrEnvironment.getBodiesByUserData('prize', true);
      level.doodads = ngrEnvironment.getBodiesByUserData('doodad', true);
      level.destructibles = ngrEnvironment.getBodiesByUserData('destructible', true);
      level.explosives = ngrEnvironment.getBodiesByUserData('explosive', true);
      level.stones = ngrEnvironment.getBodiesByUserData('stone', true);

      _.invoke(ngrEnvironment.getBodiesByUserData('prize', true), "freeze");

      //  ngrState.update("constrainFocusToRoom",true);
      ngrCamera.constrainFocus({
        x: 0,
        y: -5,
        width: 32,
        height: 25
      });

      ngrCamera.setFocus({
        x: 30,
        y: 15
      })

      ngrCamera.constrainZoom({
        min: 0.9,
        max: 1.10
      })

      ngrCamera.setZoom(1);

      ngrStage.background('img/ams1.png', 10)
      ngrStage.background('img/ams2.png', 9)
      ngrStage.background('img/ams3.png', 8)
      ngrStage.background('img/ams4.png', 8)

      if (intro) {

        ngrCamera.closeUp({
          shots: [{
            target: level.prizes[0],
            duration: 300
          }, {
            target: level.stones[0],
            duration: 350
          }, {
            target: level.doodads[0],
            duration: 300
          }, ],
          zoomAll: 1.5,
          prologue: 300
        });

        intro = false;

      }

    }

    this.onstartlevel = function (func) {
      StartLevelListeners.push(func);
    }

    this.startLevel = function () {
      if (!currentLevel) return;

      ngrInterface.setGrabOnly("nothing");
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
      });

      ngrCamera.follow(level.stones[0]);

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
              gos.endLevel(true);
            
          }
        })
      })

      _.call(StartLevelListeners, level)
    }

    ngrEnvironment.start();

    this.endLevel = function (success) {
      if (success) {
        ngrCamera.closeUp({
          shots:[{
            target: level.prizes[0],
            zoom: 0.6,
            duration: 150
          }
          ]
        })
          .then(function () {
            ngrGame.blocker()
              .then(function () {
                ngrEnvironment.stop();
                gos.nextLevel();
              })
          });
      };
    }

    this.add = function (type) {
      var params = StonesModels[type];
      params.x = 25;
      ngrEnvironment.add(null, params);
    }

    this.nextLevel = function() {
      currentLevel++;
      ngrEnvironment.start();
      gos.loadLevel(currentLevel);
    }

  })

.service('stonesAudio', function (GameOfStones, ngAudio) {

  GameOfStones.onstartlevel(function (level) {
    _.invoke(level.destructibles, 'oncrumble', function () {
      ngAudio.play('audio/explosion1.mp3');
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
