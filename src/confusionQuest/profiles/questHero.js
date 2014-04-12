angular.module('ConfusionQuest')

.service('questHero', function (ngrGame, ngrWorld, ConfusionQuestDefaults,
 QuestHeroAnimations, QuestHeroStats) {

  function Hero(body, options) {

    body.profile = this;
    var hero = this;
    var heroBody = body;

    var stats = _.clone(QuestHeroStats.stats);
    var state = _.clone(QuestHeroStats.state);

    this.body = heroBody;

    var stateChangeListeners = [];

    this.onstatechange = function (l) {
      stateChangeListeners.push(l);
    }

    body.SetUserData({
      isHero: true
    });

    QuestHeroAnimations.animate(hero);

  

    hero.init = function () {
      state.health = stats.hp;
    }

    hero.init();

    hero.changeStat = function (stat, boost) {
      var percentChange = 1 + (boost / 100)
      switch (stat) {
      case "speed":
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

    hero.getState = function () {
      return state;
    }

    hero.damage = function (dmg, attacker) {
      var enemyPosX = 0;
      var heroPosX;

      if (state.invincible) return;
      state.health -= reduceByDefense(dmg);

      state.invincibleTimeout = stats.invincibilityTime;
      state.invincible = true;

      body.sprite.animation.gotoAndPlay("hurt");

      var heroPosX = body.GetPosition().x;
      if (attacker) enemyPosX = attacker.body.GetPosition().x;

      body.SetLinearVelocity(new b2Vec2(0, 0));

      if (enemyPosX > heroPosX) hero.flinchLeft();
      if (enemyPosX < heroPosX) hero.flinchRight();

      _.call(stateChangeListeners, state);

      function reduceByDefense(dmg) {
        dmg -= stats.defense;
        return dmg;
      }
    }

    hero.die = function () {
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

      if (state.dead) return;

      var y = heroBody.GetLinearVelocity().x * heroBody.GetInertia();
      var n = heroBody.GetAngularVelocity() * heroBody.GetInertia();
      heroBody.ApplyForce(new b2Vec2(-y * 10, 0), heroBody.GetWorldCenter());
      heroBody.ApplyTorque(-n * 10);
    };

    this.tick = function () {

      console.logOnce("Herobody?", body, heroBody);

      if (state.health <= 0) {
        hero.die();
      }

      var currentSpeed = body.GetLinearVelocity().x;
      var speedingL = currentSpeed < -stats.maxSpeed;
      var speedingR = currentSpeed > stats.maxSpeed;
      var anim = body.sprite.animation;
      //      window.sprite = anim;

      state.invincibleTimeout--;
      if (state.invincibleTimeout < 0) {
        state.invincible = false;
      }



      var contacts = body.GetContactList();
      if (!state.airborneGraceTime) state.airborne = true;
      while (contacts) {
        if (contacts && contacts.contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor) {
          var footPrint = 1;
          var safeDistance = 5;
          var heroPos = body.GetPosition();
          var p1 = new b2Vec2(heroPos.x + footPrint, heroPos.y);
          var p2 = new b2Vec2(heroPos.x + footPrint, heroPos.y + safeDistance); 
          var p3 = new b2Vec2(heroPos.x - footPrint, heroPos.y);
          var p4 = new b2Vec2(heroPos.x - footPrint, heroPos.y + safeDistance); 
          ngrWorld.getWorld().RayCast(ongroundtouch, p1, p2);
          ngrWorld.getWorld().RayCast(ongroundtouch, p3, p4);

          function ongroundtouch(other) {
            var otherData = other.m_body.GetUserData();
            if (otherData.isFloor) {
              if (state.airborne) {
                var currentXSpeed = heroBody.GetLinearVelocity().x;
                heroBody.SetLinearVelocity(new b2Vec2(currentXSpeed, 0));
              }
              state.airborne = false;
              state.airborneGraceTime = stats.airborneGrace;
              state.usedGroundSmash = false;
            }
          }
        }

        contacts = contacts.next;
      }

      if (state.goingLeft && !speedingL && !state.isCrouching) {
        var s = stats;
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

      if (state.goingRight && !speedingR && !state.isCrouching) {
        var s = stats;
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
        hero.brake()
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

      heroBody.SetAngle(0);

     
    }
  }

 

  ConfusionQuestDefaults.addDefault(QuestHeroStats.defaults);
  ngrGame.addProfile('questHero', Hero);

})
.service("QuestHeroAnimations",function(ngrLoop){
  var hero;
  var anim;

  this.animate = function(_hero) {
    hero = _hero;

    ngrLoop.addHook(tick);
  }


  function tick(){

    var state = hero.getState();
    anim = hero.body.sprite.animation;

    if (!anim) return;

    console.logOnce("Anim?",anim, hero);
    if (!state.airborne && anim.currentAnimation == "jump" || !state.airborne && anim.currentAnimation == "fly") {
      anim.gotoAndPlay("stand");
    }

    if (state.goingRight) {
      if (anim.currentAnimation != "run" && anim.currentAnimation != "jump" && !state.airborne) anim.gotoAndPlay("run");
      anim.scaleX = Math.abs(anim.scaleX);
    }

    if (state.goingLeft) {
      if (anim.currentAnimation != "run" && anim.currentAnimation != "jump" && !state.airborne) anim.gotoAndPlay("run");
      anim.scaleX = -Math.abs(anim.scaleX);
    }

    if (state.airborne) {
      if (anim.currentAnimation != "jump" && anim.currentAnimation != "fly") anim.gotoAndPlay("fly");
    }

    if (state.isJumping) {
      if (!state.invincible) {
        if (anim.currentAnimation != "jump") anim.gotoAndPlay("jump");
      }

    }


    if (state.isCrouching) {
      if (anim.currentAnimation != "duck" && !state.airborne) anim.gotoAndPlay("duck");
    }

    if (!state.goingLeft && !state.goingRight && !state.isCrouching && !state.isJumping && !state.airborne) {
      if (anim.currentAnimation != "stand") anim.gotoAndPlay("stand");
    }

    _.each(anim.spriteSheet.getAnimations(), function (animation) {
      anim.spriteSheet.getAnimation(animation).speed = 0.4;
    });



  };

})

.service("QuestHeroStats",function(){
  this.stats = {
    lateralSpeed: 60,
    lateralSpeedJumping: 45,
    jumpCooldown: 25,
    jumpForce: 1700,
    doubleJumpForce: 0,
    airborneGrace: 3,
    groundSmashPower: 1000,
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

  this.state = {
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
    stats: this.stats,
  }

  this.defaults = {
    name: 'Calvin',
    shape: 'box',
    profile: 'questHero',
    skin: {
      src: 'img/sprites/calvin/calvin1.png',
      bg: 'spritesheet',
      framerate: 90,
      frames: {
        width: 238.5,
        height: 223.5,
        regX: 120,
        regY: 145,

      },
      frameWidth: 90,
      frameHeight: 160,
      animations: {
        run: [0, 15],
        stand: [16, 45],
        jump: [46, 75, "fly"],
        fly: [75],
        duck: [76, 145],
      }
    },
    controls: 'platform-hero',
    userData: {
      doodad: true,
    },
    presets: {
      height: 2,
      width: 1.24,
      restitution: 0.1,
      density: 0.07,
      friction: 0.2,
      gravityScale: 0.4
    }

  };
})