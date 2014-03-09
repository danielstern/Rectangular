angular.module('BallAgentModels', [])
  .service('BallAgentModels', function(ngrDisplay, BallAgentDefaults, ngrBox, ngrEnvironment, ngrWorld) {

    this.createExit = function(options) {

      options = _.extend(_.clone(BallAgentDefaults.exit), options);

      var exitBox = ngrBox.shape("box", options);
      exitBox.f.isSensor = true;

      var exitBody = ngrWorld.addElement(exitBox, options);
      exitBody.SetUserData({
        exit: true
      });

      console.log("Creating exit,",exitBody,exitBox,options);

      var actor = ngrDisplay.skin(exitBody, options);

      return exitBody;
    }

    this.createPlatform = function(options) {

      options = _.extend(_.clone(BallAgentDefaults.platform), options);

      var platform = ngrBox.shape("box", options);
      var pBody = ngrWorld.addElement(platform, options);

       pBody.SetUserData({
        isFloor: true
      });

      ngrDisplay.skin(pBody, options);

      var subOptions = _.clone(options);

      subOptions.y += 0.2;
      var platformUnder = ngrBox.shape("box", subOptions);
      var pSubBody = ngrWorld.addElement(platformUnder, subOptions);

      return platform;
    }

    this.createColumn = function(options) {

      options = _.extend(_.clone(BallAgentDefaults.column), options);

      var platform = ngrBox.shape("box", options);
      var pBody = ngrWorld.addElement(platform);
      var cycle = 0;

      ngrDisplay.skin(pBody, options);


      return platform;
    }

  })

.service('BallAgentDefaults',function(){
  this.column = {
        position: 'static',
        width: 0.3,
        friction: 3,
        src: 'img/tile-orange.png',
        bg: 'tiled'
      }

  this.exit = {
        x: 20,
        position: 'static',
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
        position: 'static',
        height: 0.3,
        src: 'img/tile-blue.png',
        bg: 'tiled',
      }
})