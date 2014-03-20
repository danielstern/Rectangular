angular.module("Stones", ['Rectangular'])
  .controller("GameOfStones", function ($scope, ngrEnvironment, ngrInterface, stonesLevels) {
    console.log("A Game of Stones");
    ngrEnvironment.init({
      canvas: $('canvas'),
      constrainFocusToRoom: true
    });
    ngrEnvironment.load(stonesLevels.getDemo());
    ngrEnvironment.debug(false);
    ngrEnvironment.setZoom(0.2);
    ngrInterface.enableDrag();
    ngrInterface.setGrabOnly("doodad");
    ngrInterface.scrollToZoom(true);


    $scope.startLevel = function () {
      console.log("starting level...");
      var starter = ngrEnvironment.getBodyByUserData('worldStarter', 'true');
      console.log("Starter?", starter);
      ngrEnvironment.remove(starter);
    }

    $scope.add = function (type) {
      var params;
      switch (type) {
      case "box":
        params = {
          shapeKind: 'box',
          width: 2,
          height: 2,
          density: 0.5,
          friction: 0.2,
          src: 'img/box.png',
          x: 3,
          y: 3
        }
        break;
      case "girder":
        params = {
          shapeKind: 'box',
          width: 5,
          height: 0.75,
          density: 3,
          friction: 0.2,
          src: 'img/castleCenter.png',
          x: 3,
          y: 3
        }
        break;
      case "wedge":
        params = {
          shapeKind: 'triangle',
          innerAngle: 60,
          opposite: 3,
          adjacent: 2.5,
          bg: 'tiled',
          src: 'img/snowCenter.png',
          density: 3,
          friction: 0.6,
          src: 'img/castleCenter.png',
          x: 3,
          y: 3
        }
        break;
      }

      ngrEnvironment.add(null, params);
    }

  })
