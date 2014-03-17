 angular.module("manWho", ['ngAudio', 'Rectangular'])
   .service('manWho', function(ngrEnvironment, manWhoLevels,heroGenerator) {
     console.log("Don't give a FUCK!");

     ngrEnvironment.init({
       floor: true,
       scale: 'auto',
       worldHeight: 30
     });

     var currentLevel;
     var hero;

     this.gotoLevel = function(_lvl) {
       ngrEnvironment.clearAll();
       currentLevel = manWhoLevels.getLevel(_lvl || 1);
       ngrEnvironment.load(currentLevel);
       hero = heroGenerator.getHero();
       hero.x = 2;
       hero.y = 3;
       var heroBody = ngrEnvironment.add('box', hero);

       hero.body = heroBody;
     		bindControls(hero);
     }


     function bindControls(object) {

       var state = object.getState();

       Mousetrap.bind({
         'd': function() {
           state.goingRight = true;
         },
         'a': function() {
           state.goingLeft = true;
         },
         'w': function() {
           state.isJumping = true;
         },
       }, 'keydown');

       Mousetrap.bind({
         'd': function() {
           state.goingRight = false;
         },
         'a': function() {
           state.goingLeft = false;
         },
         'w': function() {
           state.isJumping = false;
         },
       }, 'keyup');

     }


   })

 .service('heroGenerator', function(ngrEnvironment, ngrState) {
   function Hero() {
     var h = this;
     h.height = 1.2;
     h.width = 0.4;
     h.type = 'dynamic';
     h.friction = 0.3;
     h.density =  0.4;
     //console.log("i'm a hero");

     var state = {
     	goingLeft:false,
     	goingRight:false,
     	isJumping:false,
     	airBorne:false,
     	jumpWait:0,
     	airborneGraceTime: 0
     }

     var stats = {
     	lateralSpeed: 40,
     	lateralSpeedJumping: 30,
     	jumpCooldown: 25,
     	jumpForce: 1000,
     	doubleJumpForce:100,
     	airborneGrace: 20,
     }

     this.getState = function() {
     	return state;
     }

     ngrEnvironment.addHook(function(){

     	var contacts = h.body.GetContactList();
     	if (contacts && contacts.contact.IsTouching()) {
     		state.airborne = false;
     		state.airborneGraceTime = stats.airborneGrace;
     	} else {
     		if (!state.airborneGraceTime) state.airborne = true;
     	}
     	if (state.goingLeft) {
     		var s = stats;
     		var heroBody = h.body;
     		var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
     		heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
     	}

     	if (state.goingRight) {
     		var s = stats;
     		var heroBody = h.body;
     		var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
     		heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
     	}

     	if (state.isJumping) {
     		var s = stats;
     		var heroBody = h.body;

     		if (!state.jumpWait) {

     			console.log("Jumping")
	     		state.jumpWait = stats.jumpCooldown;
	     		var force = state.airborne ? s.doubleJumpForce : s.jumpForce;
	     		heroBody.ApplyForce(new b2Vec2(0, -force), heroBody.GetWorldCenter());

     		}
     	}

     	if (state.jumpWait) state.jumpWait--;
     	if (state.airborneGraceTime) state.airborneGraceTime--;


     	h.body.SetAngle(0);
     })
   }

   this.getHero = function() {
  	 return new Hero();
 	}
 })
