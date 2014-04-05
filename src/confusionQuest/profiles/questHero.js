angular.module('ConfusionQuest')

.service('questHero', function (ngrGame, ngrWorld) {

  function Hero(body, options) {

    body.profile = this;

    var h = this;
    h.height = 1.2;
    h.width = 0.7;
    h.body = body;
    h.type = 'dynamic';
    h.friction = 0.1;
    h.density = 0.2;

    body.SetUserData({
      isHero: true
    })

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

    this.changeStat = function (stat, boost) {
      console.log("HERO changing stat...", stat, boost);
      var percentChange = 1 + (boost / 100)
      switch (stat) {
      case "speed":
        console.log("Boosting speed", percentChange);
        stats.lateralSpeed *= percentChange;
        stats.lateralSpeedJumping *= percentChange;
        stats.maxSpeed *= percentChange;
        break;
      case "jump":
        stats.jumpForce *= percentChange;
        break;
      default:
        console.warn("Dont know how to use this powerup...", stat);
        break;
      }

      console.log(stats);

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

      var contacts = h.body.GetContactList();
      if (!state.airborneGraceTime) state.airborne = true;
      while (contacts) {
        if (contacts && contacts.contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor) {
          var p1 = new b2Vec2(body.GetPosition().x, body.GetPosition().y); //center of scene
          var p2 = new b2Vec2(body.GetPosition().x, body.GetPosition().y + 5); //center of scene
          ngrWorld.getWorld().RayCast(function (x) {
            var otherData = x.m_body.GetUserData();
            if (otherData.isFloor) {
              state.airborne = false;
              state.airborneGraceTime = stats.airborneGrace;
              state.usedGroundSmash = false;
            }
          }, p1, p2);
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

      window.world = ngrWorld.getWorld();

    }
  }

  ngrGame.addProfile('questHero', Hero);

})

.service('enemy1', function (ngrGame, ngrLoop, ngrWorld) {
  var stats = {
    id: "enemy1",
    health: 20,
    damage: 5,
    speed: 0.2,
    minFloatHeight: 5,
    maxFloatHeight: 10,
    floatPower: 50,
    antiGravity: 0.8,
    img: 'img/mahakana.png',
    name: "Mahakana",
    description: "The lowliest servants of the Emperor. Their tenetacles carry a powerful electrical charge.",
    flavor: "Tentacles, why did it have to be tentacles?",
  }

  var Enemy1 = function (body) {
    var mahakana = this;
    var hitTop = false;

    body.onimpact(function (body, other) {

      if (other.GetUserData() && other.GetUserData().isHero) {
        //console.log("Mahakana impacts hero...", other);
      }
    })

    ngrLoop.addHook(function () {

      var inRange = false;
      var hitTop = false;
      var currentSpeedX = body.GetLinearVelocity().x;

      var p1 = new b2Vec2(body.GetPosition().x, body.GetPosition().y);
      var p2 = new b2Vec2(body.GetPosition().x, body.GetPosition().y + stats.minFloatHeight); //center of scene
      var p3 = new b2Vec2(body.GetPosition().x, body.GetPosition().y + stats.minFloatHeight + stats.maxFloatHeight); //center of scene
      ngrWorld.getWorld().RayCast(function (x) {

        var otherData = x.m_body.GetUserData();
        if (otherData.isFloor) {

          stats.antiGravity = 1.1;
          hitTop = false;
          inRange = true;
        }

      }, p1, p2);

      ngrWorld.getWorld().RayCast(function (x) {
        inRange = true;

      }, p2, p3);

      if (!inRange) {

        stats.antiGravity = 0.9;
        mahakana.stopAscent();
        //hitTop = true;

      }

      body.ApplyForce(new b2Vec2(-currentSpeedX * body.GetMass() * body.GetInertia()), body.GetWorldCenter(), 0);
      var antiGravity = ngrWorld.getWorld().GetGravity().y * stats.antiGravity;
      body.ApplyForce(new b2Vec2(0, -antiGravity * body.GetMass()), body.GetWorldCenter());;

      body.SetAngle(0);

    });

    this.stopAscent = function() {
      var currentSpeedY = body.GetLinearVelocity().y;
      if (currentSpeedY < 0 ) body.ApplyForce(new b2Vec2(0, -currentSpeedY * body.GetMass()), body.GetWorldCenter());
    }

    this.balanceY = function () {
        var currentSpeedY = body.GetLinearVelocity().y;
        body.ApplyForce(new b2Vec2(0, -currentSpeedY * body.GetMass() * body.GetInertia()), body.GetWorldCenter());
    }

    this.float = function () {

      body.ApplyForce(new b2Vec2(0, -ngrWorld.getWorld().GetGravity().y * body.GetMass()), body.GetWorldCenter());

    }
  }

  ngrGame.addProfile('enemy1', Enemy1);

})
