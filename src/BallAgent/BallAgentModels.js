angular.module('BallAgentModels', [])
  .service('BallAgentModels', function(BallAgentDefaults, ngrBox, ngrEnvironment, ngrWorld) {

    this.createExit = function(options) {

      options = _.extend(_.clone(BallAgentDefaults.exit), options);

      options.isSensor = true;
      options.userData = {
        exit: true
      }

      ngrEnvironment.add("box", options);

    }

    this.createPlatform = function(options) {

      options = _.extend(_.clone(BallAgentDefaults.platform), options);

      options.userData = {
        isFloor: true
      };

      ngrEnvironment.add("box", options);

      var subOptions = _.clone(options);
      subOptions.y += 0.2;
      subOptions.hidden = true;
      subOptions.userData = null;
      subOptions.src = 'img/tile.png';

      ngrEnvironment.add("box", subOptions);

    }

    this.createColumn = function(options) {

      options = _.extend(_.clone(BallAgentDefaults.column), options);
      ngrEnvironment.add("box", options);

    }

  })

.service('BallAgentDefaults', function() {
  this.column = {
    type: 'static',
    width: 0.3,
    friction: 3,
    src: 'img/tile-orange.png',
    bg: 'tiled'
  }

  this.exit = {
    x: 20,
    type: 'static',
    src: 'img/exit.png',
    y: 15.5,
    height: 1,
    width: 1,
    moves: true,
    movement: {
      rotation: 1
    }
  };

  this.platform = {
    type: 'static',
    height: 0.3,
    friction: 0.2,
    src: 'img/tile-blue.png',
    bg: 'tiled',
  }
})
