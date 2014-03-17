 angular.module("manWho", ['ngAudio', 'Rectangular'])
   .service('manWho', function(ngrEnvironment, manWhoLevels, heroGenerator) {
     console.log("Don't give a FUCK!");

     ngrEnvironment.init({
       scale: '15',
      
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
       ngrEnvironment.setZoom(2.0);
       ngrEnvironment.follow(hero.body);
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
         's': function() {
           state.isCrouching = true;
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
         's': function() {
           state.isCrouching = false;
         },
       }, 'keyup');

     }


   })

 .service('heroGenerator', function(ngrEnvironment, ngrState) {
   function Hero() {
     var h = this;
     h.height = 1.2;
     h.width = 0.7;
     h.type = 'dynamic';
     h.friction = 0.3;
     h.density = 0.4;
     //console.log("i'm a hero");

     var state = {
       goingLeft: false,
       goingRight: false,
       isJumping: false,
       airBorne: false,
       jumpWait: 0,
       airborneGraceTime: 0,
       usedGroundSmash: false,
       dashInputTimeRight: 0,
       dashInputTimeLeft: 0,
       dashCurrentCooldown: 0,
       dashReadyRight: false,
       dashReadyLeft: false,
     }

     var stats = {
       lateralSpeed: 40,
       lateralSpeedJumping: 30,
       jumpCooldown: 25,
       jumpForce: 1500,
       doubleJumpForce: 400,
       airborneGrace: 20,
       groundSmashPower: 3000,
       dashInputTimeoutRight: 5,
       dashInputTimeoutLeft: 5,
       dashCooldown: 40,
       dashForce: 1000,
       dashForceAir: 500,
     }

     this.getState = function() {
       return state;
     }

     ngrEnvironment.addHook(function() {

       var heroBody = h.body;

       var contacts = h.body.GetContactList();
       if (contacts && contacts.contact.IsTouching()) {
         state.airborne = false;
         state.airborneGraceTime = stats.airborneGrace;
         state.usedGroundSmash = false;
       } else {
         if (!state.airborneGraceTime) state.airborne = true;
       }


       if (state.goingLeft) {
         var s = stats;
         var heroBody = h.body;
         if (state.dashReadyLeft) {
         //	console.log("dashing.");
         	var force = state.airborne ? s.dashForceAir : s.dashForce;
         	heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
         	state.dashReadyLeft = false;
         	state.dashCurrentCooldown = stats.dashCooldown;
         }
         state.dashInputTimeLeft = s.dashInputTimeoutLeft;
         var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
         heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
       } else if (state.dashInputTimeLeft) {
              		if (!state.dashCurrentCooldown) state.dashReadyLeft = true;
              }

       if (state.goingRight) {
         var s = stats;
         var heroBody = h.body;
         if (state.dashReadyRight) {
         //	console.log("dashing.");
         	var force = state.airborne ? s.dashForceAir : s.dashForce;
         	heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
         	state.dashReadyRight = false;
         	state.dashCurrentCooldown = stats.dashCooldown;
         }
         state.dashInputTimeRight = s.dashInputTimeoutRight;
         var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
         heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
       } else if (state.dashInputTimeRight) {
       		if (!state.dashCurrentCooldown) state.dashReadyRight = true;
       }

       if (state.isJumping) {
         var s = stats;

         if (!state.jumpWait) {

           console.log("Jumping")
           state.jumpWait = stats.jumpCooldown;
           var force = state.airborne ? s.doubleJumpForce : s.jumpForce;
           heroBody.ApplyForce(new b2Vec2(0, -force), heroBody.GetWorldCenter());

         }
       }

       if (state.airborne && state.isCrouching) {
         if (!state.usedGroundSmash) {
           var force = stats.groundSmashPower;
           heroBody.ApplyForce(new b2Vec2(0, stats.groundSmashPower), heroBody.GetWorldCenter());
           state.usedGroundSmash = true;
         }

       }

       if (state.jumpWait) state.jumpWait--;
       if (state.airborneGraceTime) state.airborneGraceTime--;
       if (state.dashInputTimeRight) state.dashInputTimeRight--;
       if (state.dashInputTimeLeft) state.dashInputTimeLeft--;
       if (state.dashCurrentCooldown) state.dashCurrentCooldown--;


       h.body.SetAngle(0);
     })
   }

   this.getHero = function() {
     return new Hero();
   }
 })
