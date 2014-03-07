angular.module('BallAgentModels',[])
.service('BallAgentModels', function(display,ngBox,ngrLoop,ngWorld){

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

      var exitBox = ngBox.shape("box", options);
      exitBox.f.isSensor = true;

      var exitBody = ngWorld.addElement(exitBox);
      exitBody.SetUserData({
        exit: true
      });

      var attrs = {};

      attrs.src = 'img/exit.png';
      attrs.height = 2;
      attrs.width = 2;
      var actor = display.skin(exitBody, attrs);

      return exitBody;
    }

    this.createPlatform = function(options) {

      var defaults = {
        mass: 0,
        position: 'static',
        height: 0.3,
      }

      options = _.extend(defaults, options);

      var platform = ngBox.shape("box", options);
      var pBody = ngWorld.addElement(platform);

      pBody.SetUserData({
        isFloor: true
      });
      display.skin(pBody, {
        y: options.y,
        x: options.x,
        width: options.width * 2,
        height: 0.5
      });

      options.y += 0.2;
      var platformUnder = ngBox.shape("box", options);
      var pSubBody = ngWorld.addElement(platformUnder);

      return platform;
    }



    this.createColumn = function(options) {

      var defaults = {
        position: 'static',
        width: 0.3,
        friction: 3,
      }

      options = _.extend(defaults, options);

      var platform = ngBox.shape("box", options);
      var pBody = ngWorld.addElement(platform);
      var cycle = 0;

    //  console.log("creating column... options..",options)

      if (options.moves) {

		    ngrLoop.addHook(function(){
      		 cycle += Math.PI / 200 / options.movement.period;
		       var currentY = pBody.GetPosition().y;
		       var currentX = pBody.GetPosition().x;
		       var newY = currentY - (Math.sin(cycle) / 50)  * options.movement.shift;

		       pBody.SetPosition(new b2Vec2(currentX, newY));
		    })


		  }

      display.skin(pBody, {
        y: options.y,
        x: options.x,
        width: options.width * 2,
        height: options.height * 2
      });


      return platform;
    }

})