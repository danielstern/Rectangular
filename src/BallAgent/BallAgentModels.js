angular.module('BallAgentModels',[])
.service('BallAgentModels', function(ngrDisplay,ngrBox,ngrEnvironment,ngrWorld){

    this.createExit = function(options) {
      var defaults = {
        src: 'img/hi.png',
        x: 20,
        mass: 0,
        position: 'static',
        y: 15.5,
        height: 1,
        width: 1,
      }

      options = _.extend(defaults, options);

      var exitBox = ngrBox.shape("box", options);
      exitBox.f.isSensor = true;

      var exitBody = ngrWorld.addElement(exitBox);
      exitBody.SetUserData({
        exit: true
      });

      var attrs = {};

      attrs.src = 'img/exit.png';
      attrs.height = 2;
      attrs.width = 2;
      var actor = ngrDisplay.skin(exitBody, attrs);

      return exitBody;
    }

    this.createPlatform = function(options) {

      var defaults = {
        position: 'static',
        height: 0.3,
        src: 'img/tile-blue.png',
        bg: 'tiled',
      }

      options = _.extend(defaults, options);

      var platform = ngrBox.shape("box", options);
      var pBody = ngrWorld.addElement(platform,options);

      pBody.SetUserData({
        isFloor: true
      });

      ngrDisplay.skin(pBody, options);

      var subOptions = _.clone(options);

      subOptions.y += 0.2;
      var platformUnder = ngrBox.shape("box", subOptions);
      var pSubBody = ngrWorld.addElement(platformUnder,subOptions);

      return platform;
    }



    this.createColumn = function(options) {

      var defaults = {
        position: 'static',
        width: 0.3,
        friction: 3,
        src:'img/tile-orange.png',
        bg:'tiled'
      }

      options = _.extend(defaults, options);

      var platform = ngrBox.shape("box", options);
      var pBody = ngrWorld.addElement(platform);
      var cycle = 0;

      ngrDisplay.skin(pBody, options);


      return platform;
    }

})