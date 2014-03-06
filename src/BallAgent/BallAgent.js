angular.module("BallAgent",['Rectangular'])
.service('BallAgent',function(BallAgentLevels, ngrEnvironment, ngrLoop, ngBox, ngWorld, $compile){
   // var world = ngWorld.setWorld(0,26,true);
   this.state = {};
   var state = this.state;
   var stateChangeListeners = [];
   var gameOverListeners = [];

   this.onStateChange = function(listener) {
     stateChangeListeners.push(listener);
   }

   var updateState = function() {
    _.each(stateChangeListeners,function(l){
      l(state);
    })
   }

   this.onGameOver = function(listener) {
     gameOverListeners.push(listener);
   }


   
   this.init = function(canvas,debugCanvas) {



    state.currentLevel = 0;
    state.lives = 3;
    state.score = 0;


   //ngrEnvironment.init(canvas);
  // ngrEnvironment.room({floor:true});
  // ngrEnvironment.debug(debugCanvas);


   var heroBody;// = createHero();
   var exit;// = createExit();
   var controls;// = bindControls();

 // nextLevel();

   this.gotoLevel = function(level) {
     state.currentLevel = level - 1;
     nextLevel();
   }

   function createHero() {
   var heroBox = ngBox.shape("ellipse",{radius:0.5,x:1.2});
   var heroBody = ngWorld.addElement(heroBox);
   heroBody.SetUserData({isHero:true});
   window.heroBody = heroBody;

   return heroBody;
 	}

	function createExit(options) {
    var defaults = {src:'img/hi.png', x:20,
      mass:0,
      position:'static',
      y: 15.5,
      height: 1,
      width: 1,
    }

    options = _.extend(defaults, options);

		var exitBox = ngBox.shape("box",options);

		exitBox.f.isSensor = true;
		var exitBody = ngWorld.addElement(exitBox);
		exitBody.SetUserData({exit:true})

		return exitBody;
	}

  function createPlatform(options) {
    
    var defaults = {
      mass:0,
      position:'static',
      height: 0.3,

    }

    options = _.extend(defaults, options);

    var platform = ngBox.shape("box",options);
    var pBody = ngWorld.addElement(platform);
    pBody.SetUserData({isFloor:true});

    options.y += 0.2;
    var platformUnder = ngBox.shape("box",options);
    var pSubBody = ngWorld.addElement(platformUnder);

    return platform;
  }

  function createColumn(options) {
    
    var defaults = {
      position:'static',
      width: 0.3,
      friction: 3,
    }

    options = _.extend(defaults, options);

    var platform = ngBox.shape("box",options);
    var pBody = ngWorld.addElement(platform);

    // optional hook for a moving platform
    /*
    ngrLoop.addHook(function(){
       var currentY = pBody.GetPosition().y;
       var currentX = pBody.GetPosition().x;
       var newY = currentY - 0.01;
       pBody.SetPosition(new b2Vec2(currentX, newY));
    })
    */


    
    return platform;
  }


	function bindControls() {

  // window.heroBody = heroBody;

   Mousetrap.bind('d',function(){
        heroState.goingRight = true;
   },'keydown');
   Mousetrap.bind('d',function(){
        heroState.goingRight = false;
   },'keyup');

   Mousetrap.bind('a',function(){
        heroState.goingLeft = true;
   }, 'keydown');

   Mousetrap.bind('a',function(){
        heroState.goingLeft = false;
   }, 'keyup');

   var jumpReleased = true;

   Mousetrap.bind('w',function(){
        if (!jumpReleased) return;
        heroState.isJumping = true;
        jumpReleased = false;
   },'keydown');

   Mousetrap.bind('w',function(){
        heroState.isJumping = false;
        jumpReleased = true;
   },'keyup');


   var airborneTimer = 3;
   ngrLoop.addHook(function(){
   
    var contacts = heroBody.GetContactList();
    if (airborneTimer) airborneTimer--;
    if (!airborneTimer) {
     heroState.airborne = true;
    }


    if (contacts && contacts.contact) {
      while(contacts) {   
        var contact = contacts.contact;

        if (contact.IsTouching() && contacts.other.GetUserData()) {
            var data = contacts.other.GetUserData();

            if (data.exit) {

                nextLevel();

            }
        }

        if (contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor)  {
            heroState.airborne = false;
            airborneTimer = 3;
        } else {
            //heroState.airborne = true;
        }
       contacts = contacts.next;
     }
    }

     if (heroState.goingRight) {
        var force = heroState.airborne ? 5 : 15; 
        heroBody.ApplyForce(new b2Vec2(force,0),heroBody.GetWorldCenter())  
        heroBody.ApplyTorque(5) 
     }

     if (heroState.goingLeft) {
        var force = heroState.airborne ? 5 : 15; 
        heroBody.ApplyForce(new b2Vec2(-force,0),heroBody.GetWorldCenter())  
        heroBody.ApplyTorque(-5) 
     }

     if (heroState.isJumping) {

        if (!heroState.airborne) {

            var y = heroBody.GetLinearVelocity().y * heroBody.GetInertia();
            heroBody.ApplyForce(new b2Vec2(0,-300),heroBody.GetWorldCenter()) ;  
            heroState.airborne = true;
            heroState.isJumping = false;
        }
     };

     var position = heroBody.GetPosition();
     if (position.y > 75) {
      console.log("Hero dead!");
      handleDeath();
     }

   });


 	}


   heroState = {
        goingRight:false,
        goingLeft:false,
        isJumping:false,
        airborne:true
   };

   /*var level1 = {
    objects:[

    ]
   }*/

   function handleDeath() {
     state.lives --;

     if (state.lives >= 0) {
       state.currentLevel--;
       nextLevel();
     } else {
       gameOver();
     }
   }

   function gameOver() {
     // todo, score screen...
        ngrEnvironment.stop();
      _.each(gameOverListeners,function(l){
        l(state);
      })
    // newGame();
   }

   function newGame() {
     state.lives = 3;
     state.currentLevel = 0;
     nextLevel();
   }

   this.newGame = newGame;

   
   function nextLevel() {

   			state.currentLevel++;
   			var l = BallAgentLevels.levels[state.currentLevel - 1];
   	//		console.log("Levels?",BallAgentLevels, l, currentLevel)
        ngrLoop.stop();
        ngrLoop.clearHooks();
        ngWorld.clearAll();

        ngrEnvironment.init($('canvas')[0]);
        if (l.floor) ngrEnvironment.floor();
        if (l.lWall) ngrEnvironment.leftWall();
        if (l.rWall) ngrEnvironment.rightWall();


        ngrEnvironment.debug($('#debugCanvas')[0]);

        console.log("NEXT LVL: BALL AGENT");

      	heroBody = createHero();
   			exit = createExit(l.exit);
   			var controls = bindControls();
    //    activateTargeter();

        _.each(l.platforms, function(platform){
          createPlatform(platform);
        });

        _.each(l.columns, function(column){
          createColumn(column);
        });

        updateState(state);

    }

    function activateTargeter() {
      var targeter = new MouseTargeter(debugCanvas, ngWorld.SCALE);
      var targetingWindow = null;

      targeter.onmove(function(e){
    
       var world = ngWorld.getWorld();

        var shape = ngBox.shape('box');

        shape.b.position.Set(e.worldPosX - 0.5 , e.worldPosY - 0.5);

        if (!targetingWindow) {
          targetingWindow = ngWorld.addElement(shape);
          targetingWindow.SetUserData({isFloor:true})
        } else {
          targetingWindow.SetPosition(new b2Vec2(e.worldPosX - 0.5,e.worldPosY - 0.5) )
        }


       window.world = world;
       window.targetingWindow = targetingWindow;

       //world.update();

      console.log(targetingWindow.GetContactList());


    })

  }

   

}



   

})