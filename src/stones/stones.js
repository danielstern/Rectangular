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
        comp.SetType(b2Body.b2_dynamicBody);
      })

      _.each(doodads, function (doodad) {
        ngrWorld.freeze(doodad);
      })

      _.each(explosives, function (explosive) {

        var contact = explosive;
        ngrWorld.unfreeze(explosive);
        var hook = ngrLoop.addHook(function () {
          var edge = explosive.GetContactList();
          while (edge) {

            var contact = edge.contact;
            if (!contact.IsTouching()) break;
            var points = contact.m_oldManifold.m_points;
            var other = edge.other;

            var explosiveMomentumX = explosive.GetLinearVelocity().x * explosive.GetInertia();
            var explosiveMomentumY = explosive.GetLinearVelocity().y * explosive.GetInertia();
            var otherMomentumX = other.GetLinearVelocity().x * other.GetInertia();
            var otherMomentumY = other.GetLinearVelocity().y * other.GetInertia();

            var diffX = Math.abs(explosiveMomentumX - otherMomentumX);
            var diffY = Math.abs(explosiveMomentumY - otherMomentumY);
            var vect = Math.sqrt(diffX + diffY);

            var momentumDiff = {
              x: diffX,
              y: diffY,
              vect: vect
            }

            if (momentumDiff.vect > 5 && momentumDiff.vect < 1000) {
              ngrWorld.explode(explosive);
            }

            edge = edge.next;
          }
        })

      })

      prize.SetType(b2Body.b2_dynamicBody);

      var prizeStartingY = prize.GetPosition().y;

      ngrLoop.addHook(function () {
        var pos = prize.GetPosition();
        if (pos.y - prizeStartingY > 5) {
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
      console.log("Adding",type,params);
      ngrEnvironment.add(null, params);
    }

  })
  
