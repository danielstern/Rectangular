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
      }

      options = _.extend(defaults, options);

      var platform = ngrBox.shape("box", options);
      var pBody = ngrWorld.addElement(platform);

      pBody.SetUserData({
        isFloor: true
      });

      ngrDisplay.skin(pBody, {
        y: options.y,
        x: options.x,
        width: options.width * 2,
        height: 0.5
      });

      var cycle = 0;
      var defaultY = options.y;

      if (options.moves) {

		    ngrEnvironment.addHook(function(){
      		 cycle += Math.PI / 200 / options.movement.period;
           var phase = options.movement.phaseShift || 0;
		       var currentY = pBody.GetPosition().y;
		       var currentX = pBody.GetPosition().x;
		       var newY = currentY - (Math.sin(cycle + phase) / 50)  * options.movement.shiftY;
		       var newX = currentX - (Math.sin(cycle + phase) / 50)  * options.movement.shiftX;

		       pBody.SetPosition(new b2Vec2(newX, newY));
		       pSubBody.SetPosition(new b2Vec2(newX, newY + 0.3));
		    })


		  }

      options.y += 0.2;
      var platformUnder = ngrBox.shape("box", options);
      var pSubBody = ngrWorld.addElement(platformUnder);

      return platform;
    }



    this.createColumn = function(options) {

      var defaults = {
        position: 'static',
        width: 0.3,
        friction: 3,
        src:'img/tile.png',
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