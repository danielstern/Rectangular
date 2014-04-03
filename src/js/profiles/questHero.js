angular.module('Rectangular')
.service('questHero', function (ngrGame) {

  function Hero(body, options) {
    var h = this;
    h.height = 1.2;
    h.width = 0.7;
    h.body = body;
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
      doubleJumpForce: 0,
      airborneGrace: 20,
      groundSmashPower: 3000,
      dashInputTimeout: 5,
      dashCooldown: 40,
      dashForce: 500,
      maxSpeed: 30,
      dashForceAir: 250,
      brakeSpeed: 0.5
    }

    this.getState = function () {
      return state;
    }

    this.brake = function () {
      var heroBody = h.body;

      var y = heroBody.GetLinearVelocity().x * heroBody.GetInertia();
      var n = heroBody.GetAngularVelocity() * heroBody.GetInertia();
      //console.log("Braking",y)
      heroBody.ApplyForce(new b2Vec2(-y * 10, 0), heroBody.GetWorldCenter());
      heroBody.ApplyTorque(-n * 10);
    }

    this.tick = function () {

      var heroBody = h.body;

      var currentSpeed = heroBody.GetLinearVelocity().x;
      var speedingL = currentSpeed < -stats.maxSpeed;
      var speedingR = currentSpeed > stats.maxSpeed;
      var anim = body.sprite.animation;
      window.sprite = anim;
      // console.log("Current speed?",currentSpeed);

      var contacts = h.body.GetContactList();
      if (!state.airborneGraceTime) state.airborne = true;
      while (contacts) {
        if (contacts && contacts.contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor) {
          state.airborne = false;
          state.airborneGraceTime = stats.airborneGrace;
          state.usedGroundSmash = false;
        }

        contacts = contacts.next;
      }

      if (state.goingRight) {
        if (anim.paused) anim.gotoAndPlay("run");
        anim.scaleX = Math.abs(anim.scaleX);
      }

      if (state.goingLeft) {
        if (anim.paused) anim.gotoAndPlay("run");
        anim.scaleX = -Math.abs(anim.scaleX);
      }

      if (state.isJumping) {
        anim.gotoAndPlay("jump");

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
    }
  }

  ngrGame.addHeroDefinition('questHero', Hero);

})