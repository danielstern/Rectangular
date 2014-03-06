angular.module("BallAgent",['Rectangular'])
.service('BallAgent',function(BallAgentLevels, ngrEnvironment, ngrLoop, ngBox, ngWorld, $compile){
   // var world = ngWorld.setWorld(0,26,true);
   this.init = function(canvas,debugCanvas) {

   	var currentLevel = 0;


   ngrEnvironment.init(canvas);
   ngrEnvironment.room({floor:true});
   ngrEnvironment.debug(debugCanvas);


   var heroBody;// = createHero();
   var exit;// = createExit();
   var controls;// = bindControls();

   nextLevel();

   function createHero() {
   var heroBox = ngBox.shape("ellipse",{radius:0.5,x:1.2});
   var heroBody = ngWorld.addElement(heroBox);
   heroBody.SetUserData({isHero:true})

   return heroBody;
 	}

	function createExit() {
		var exitBox = ngBox.shape("box",{src:'img/hi.png', x:20,
		  density:50,
		  position:'static',
		  y: 4,
		  height: 0.7,
		  width: 0.7
		});

		console.log("exitbox?",exitBox);
		exitBox.f.isSensor = true;
		var exitBody = ngWorld.addElement(exitBox);
		exitBody.SetUserData({exit:true})

		return exitBody;
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

   Mousetrap.bind('w',function(){
        heroState.isJumping = true;
   },'keydown');

   Mousetrap.bind('w',function(){
        heroState.isJumping = false;
   },'keyup');


   ngrLoop.addHook(function(){
   
    var contacts = heroBody.GetContactList();
   

    if (contacts && contacts.contact) {
        var contact = contacts.contact;
        window.contacts = contacts;

        if (contact.IsTouching() && contacts.other.GetUserData()) {
            var data = contacts.other.GetUserData();
            //console.log("Contact has data", data);
            if (data.exit) {
                console.log("You reached the exit!");
                nextLevel();
       //         $('html').append('congratulations!');
            }
        }

        if (contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor)  {
            heroState.airborne = false;
        } else {
            heroState.airborne = true;
        }
    }

     if (heroState.goingRight) {
        var force = heroState.airborne ? 10 : 50; 
        heroBody.ApplyForce(new b2Vec2(force,0),heroBody.GetWorldCenter())  
        heroBody.ApplyTorque(5) 
     }

     if (heroState.goingLeft) {
        var force = heroState.airborne ? 10 : 50; 
        heroBody.ApplyForce(new b2Vec2(-force,0),heroBody.GetWorldCenter())  
        heroBody.ApplyTorque(-5) 
     }

     if (heroState.isJumping) {

        if (!heroState.airborne) {

            var y = heroBody.GetLinearVelocity().y * heroBody.GetInertia();
            heroBody.ApplyForce(new b2Vec2(0,-300),heroBody.GetWorldCenter()) ;  
        }
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

   
   function nextLevel() {
   			//console.log("currentLevel?", currentLevel);
   			currentLevel++;
   			var l = BallAgentLevels.levels[currentLevel - 1];
   			console.log("Levels?",BallAgentLevels, l, currentLevel)
        ngrLoop.stop();
        ngrLoop.clearHooks();
        ngWorld.clearAll();
    //    alert('Entering next level!');

        ngrEnvironment.init($('canvas')[0]);
        if (l.floor) ngrEnvironment.floor();
        if (l.lWall) ngrEnvironment.leftWall();
        if (l.rWall) ngrEnvironment.rightWall();
        ngrEnvironment.debug($('#debugCanvas')[0]);

        console.log("NEXT LVL: BALL AGENT");

      	heroBody = createHero();
   			exit = createExit();
   			var controls = bindControls();

    }

   

}



   

})
.service('BallAgentLevels',function(){
	this.levels = [
		{
			lWall:true,
			rWall:true,
			floor:true
		},
		{
			lWall:true,
			rWall:false,
			floor:true
		},
		{
			lWall:false,
			rWall:false,
			floor:true
		}
	]
})