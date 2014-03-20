 angular.module("manWho", ['ngAudio', 'Rectangular'])
   .service('manWho', function(ngrEnvironment, manWhoLevels, heroGenerator) {

     ngrEnvironment.init({
       scale: '30',
     });

     var currentLevel;
     var hero;

     this.gotoLevel = function(_lvl) {
       ngrEnvironment.clearAll();
       currentLevel = manWhoLevels.getLevel(_lvl || 1);
       ngrEnvironment.load(currentLevel);
       var heroPlaceholder = ngrEnvironment.getBodyByUserData('hero',"true");
       if (!heroPlaceholder) throw new Error("You must make a body with the attribute 'hero = true' to make a level. Or else, where would the hero start?");
       hero = heroGenerator.getHero();
       hero.x = heroPlaceholder.GetWorldCenter().x;
       hero.y = heroPlaceholder.GetWorldCenter().y;
       ngrEnvironment.remove(heroPlaceholder);
       var heroBody = ngrEnvironment.add('box', hero);

       hero.body = heroBody;
       bindControls(hero);
       ngrEnvironment.setZoom(0.7, true);
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
     h.friction = 0.1;
     h.density = 0.2;

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
       idling: false,
     }

     var stats = {
       lateralSpeed: 60,
       lateralSpeedJumping: 45,
       jumpCooldown: 25,
       jumpForce: 1500,
       doubleJumpForce: 400,
       airborneGrace: 20,
       groundSmashPower: 3000,
       dashInputTimeout: 5,
       dashCooldown: 40,
       dashForce: 500,
       maxSpeed: 30,
       dashForceAir: 250,
       brakeSpeed: 0.5
     }

     this.getState = function() {
       return state;
     }

     this.brake = function() {
      var heroBody = h.body;

       var y = heroBody.GetLinearVelocity().x * heroBody.GetInertia();
       var n = heroBody.GetAngularVelocity() * heroBody.GetInertia();
       //console.log("Braking",y)
       heroBody.ApplyForce(new b2Vec2(-y * 10, 0), heroBody.GetWorldCenter());
       heroBody.ApplyTorque(-n * 10);
     }

     ngrEnvironment.addHook(function() {

       var heroBody = h.body;

       var currentSpeed = heroBody.GetLinearVelocity().x;
       var speedingL = currentSpeed < -stats.maxSpeed;
       var speedingR = currentSpeed > stats.maxSpeed;
      // console.log("Current speed?",currentSpeed);

       var contacts = h.body.GetContactList();
       if (contacts && contacts.contact.IsTouching()) {
         state.airborne = false;
         state.airborneGraceTime = stats.airborneGrace;
         state.usedGroundSmash = false;
       } else {
         if (!state.airborneGraceTime) state.airborne = true;
       }


       if (state.goingLeft && !speedingL) {
         var s = stats;
         var heroBody = h.body;
         if (state.dashReadyLeft) {
           // console.log("dashing.");
           var force = state.airborne ? s.dashForceAir : s.dashForce;
           heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
           state.dashReadyLeft = false;
           state.dashCurrentCooldown = stats.dashCooldown;
         }
         if (state.idling) state.dashInputTimeLeft = s.dashInputTimeout;
         var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
         heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
       } else if (state.dashInputTimeLeft) {
         if (!state.dashCurrentCooldown) state.dashReadyLeft = true;
       } else

       if (state.goingRight && !speedingR) {
         var s = stats;
         var heroBody = h.body;
         if (state.dashReadyRight) {
           // console.log("dashing.");
           var force = state.airborne ? s.dashForceAir : s.dashForce;
           heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
           state.dashReadyRight = false;
           state.dashCurrentCooldown = stats.dashCooldown;
         }
         if (state.idling) state.dashInputTimeRight = s.dashInputTimeout;
         var force = state.airborne ? s.lateralSpeedJumping : s.lateralSpeed;
         heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
       } else if (state.dashInputTimeRight) {
         if (!state.dashCurrentCooldown) state.dashReadyRight = true;
       }

       if (!state.goingRight && !state.goingLeft) {
         state.idling = true;
         h.brake()
       } else {
         state.idling = false;
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
