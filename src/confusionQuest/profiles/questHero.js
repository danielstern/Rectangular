angular.module('ConfusionQuest')

.service('questHero', function (ngrGame, ngrWorld) {

  function Hero(body, options) {

    body.profile = this;

    var h = this;
    var hero = this;
    h.height = 1.2;
    h.width = 0.7;
    h.body = body;
    h.type = 'dynamic';
    h.friction = 0.1;
    h.density = 0.2;

    var stateChangeListeners = [];

    this.onstatechange = function(l) {
      stateChangeListeners.push(l);
    }


    body.SetUserData({
      isHero: true
    })


    var stats = {
      lateralSpeed: 60,
      lateralSpeedJumping: 45,
      jumpCooldown: 25,
      jumpForce: 1700,
      doubleJumpForce: 0,
      airborneGrace: 20,
      groundSmashPower: 3000,
      dashInputTimeout: 5,
      dashCooldown: 40,
      dashForce: 500,
      maxSpeed: 30,
      dashForceAir: 250,
      flinchForceX: 1500,
      flinchForceY: -100,
      invincibilityTime: 30,
      brakeSpeed: 0.5,
      hp: 55,
      defense: 5,
      attack: 10,
      evade: 0,
      canShoot: false,
      canSprint: false,
    }
 
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
      health: 0,
      invincible: false,
      invincibleTimeout: 0,
      stats: stats,
    }

    this.init = function () {
      state.health = stats.hp;
    }

    h.init();

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
      case "hp":
        stats.hp *= percentChange;
        break;
      case "defense":
        stats.defense *= percentChange;
        break;
      default:
        console.warn("Dont know how to use this powerup...", stat);
        break;
      }

    }

    this.getState = function () {
      return state;
    }

    this.damage = function (dmg, attacker) {
      var enemyPosX = 0;
      var heroPosX;

      if (state.invincible) return;
      state.health -= reduceByDefense(dmg);
      console.log("Took damage", state.health);

      state.invincibleTimeout = stats.invincibilityTime;
      state.invincible = true;

      //window.sprite = body.sprite;

      body.sprite.animation.gotoAndPlay("hurt");
      var heroPosX = body.GetPosition().x;
      if (attacker) enemyPosX = attacker.body.GetPosition().x;

      body.SetLinearVelocity(new b2Vec2(0,0));

      if (enemyPosX > heroPosX) hero.flinchLeft();
      if (enemyPosX < heroPosX) hero.flinchRight();

      if (state.health <= 0) {
        hero.die();
      }


      _.call(stateChangeListeners, state);
    }

    function reduceByDefense(dmg) {
      dmg -= stats.defense;
      return dmg;
    }

    this.die = function() {
      //var fixture = body.getFixture
      body.setSensor(true);
      state.dead = true;
    }

    this.flinchRight = function () {
      body.ApplyForce(new b2Vec2(stats.flinchForceX, stats.flinchForceY), body.GetWorldCenter());
    }

    this.flinchLeft = function () {
      body.ApplyForce(new b2Vec2(-stats.flinchForceX, stats.flinchForceY), body.GetWorldCenter());
    }

    this.brake = function () {
      var heroBody = h.body;

      if (state.dead) return;

      var y = heroBody.GetLinearVelocity().x * heroBody.GetInertia();
      var n = heroBody.GetAngularVelocity() * heroBody.GetInertia();
      heroBody.ApplyForce(new b2Vec2(-y * 10, 0), heroBody.GetWorldCenter());
      heroBody.ApplyTorque(-n * 10);
    }

    this.tick = function () {

      var heroBody = h.body;

      var currentSpeed = heroBody.GetLinearVelocity().x;
      var speedingL = currentSpeed < -stats.maxSpeed;
      var speedingR = currentSpeed > stats.maxSpeed;
      var anim = body.sprite.animation;
      //      window.sprite = anim;

      state.invincibleTimeout--;
      if (state.invincibleTimeout < 0) {
        state.invincible = false;
      }

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
        //if (anim.paused) 
        window.anim = anim;
          if (anim.currentAnimation != "run") anim.gotoAndPlay("run");
        anim.scaleX = Math.abs(anim.scaleX);
      }

      if (state.goingLeft) {
        //if (anim.paused)
         if (anim.currentAnimation != "run")  anim.gotoAndPlay("run");
        anim.scaleX = -Math.abs(anim.scaleX);
      }

      if (state.isJumping) {
        if (!state.invincible) {
          anim.gotoAndPlay("jump");
        }

      }

      if (!state.goingLeft && !state.goingRight) {
        if (anim.currentAnimation != "stand") anim.gotoAndPlay("stand");
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
