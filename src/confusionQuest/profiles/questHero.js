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

      if (state.health <= 0) {
        hero.die();
      }

      var currentSpeed = body.GetLinearVelocity().x;
      var speedingL = currentSpeed < -stats.maxSpeed;
      var speedingR = currentSpeed > stats.maxSpeed;
      var anim = body.sprite.animation;

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
            if (otherData && otherData.isFloor) {
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

      if (state.goingLeft && !speedingL && !state.isCrouching && state.canAct) {
        state.facingLeft = true;
        state.facingRight = false;
        var s = stats;
        if (state.dashReadyLeft) {
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

      if (state.goingRight && !speedingR && !state.isCrouching && state.canAct) {
        state.facingLeft = false;
        state.facingRight = true;
        var s = stats;
        if (state.dashReadyRight) {
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

      if (state.isJumping && state.canAct) {
        var s = stats;

        if (!state.jumpWait) {

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

      if (state.isPunching && state.punchReleased) {
        hero.attack("punch");
        state.punchReleased = false;
      };

      if (!state.isPunching) state.punchReleased = true;

      if (state.isKicking && state.kickReleased) {
        hero.attack("kick");
        state.kickReleased = false;
      }

      if (state.isAttacking) {
        hero.brake();
      }

      if (!state.isKicking) state.kickReleased = true;

      if (state.jumpWait) state.jumpWait--;
      if (state.airborneGraceTime) state.airborneGraceTime--;
      if (state.dashInputTimeRight) state.dashInputTimeRight--;
      if (state.dashInputTimeLeft) state.dashInputTimeLeft--;
      if (state.dashCurrentCooldown) state.dashCurrentCooldown--;
      if (state.canComboTime) state.canComboTime--;
      if (!state.canComboTime) {
        state.canCombo = false;
      }

      if (state.canActCooldown) state.canActCooldown--;
      if (!state.canActCooldown) {
        state.canAct = true;
      }

      if (state.isAttackingCooldown) state.isAttackingCooldown--;
      if (!state.isAttackingCooldown) {
        state.isAttacking = false;
      }

      heroBody.SetAngle(0);

    }

    hero.attack = function (atk) {
      var attack;
      if (!state.canAct) return;
      if (atk == 'punch') {
        if (state.canCombo) {
          attack = stats.attacks[state.currentAttack.nextPunch1]
        } else {
          attack = stats.attacks["punch1"];
        }
      };
      if (atk == 'kick') {
        if (state.canCombo) {
          attack = stats.attacks[state.currentAttack.nextKick1]
        } else {
          attack = stats.attacks["kick1"];
        }
      }

      if (state.canCombo) {
        console.log("using combo", state.currentAttack);
      }

      var heroPos = heroBody.GetPosition();
      console.log("Using attack", attack);

      var newPoint;
      if (state.facingRight) {
        newPoint = heroPos.x + attack.range;
      } else {
        newPoint = heroPos.x - attack.range;
      }

      var p1 = new b2Vec2(heroPos.x, heroPos.y);
      var p2 = new b2Vec2(newPoint, heroPos.y);

      if (attack.effect) {

        ngrGame.effect(attack.effect, p2);
      }

      function onhitsomething(other) {
        var otherBody = other.m_body;
        var force = stats.muscle * (attack.knockback || 0);
        if (state.facingLeft) force *= -1;
        console.log("hit something!", other);
        console.log("Force?", force);

        otherBody.ApplyForce(new b2Vec2(force, 0), otherBody.GetWorldCenter());
      }

      ngrWorld.getWorld().RayCast(onhitsomething, p1, p2);

      state.currentAttack = attack;
      state.canActCooldown = attack.stunnedTime;
      state.isAttackingCooldown = attack.duration;
      state.canAct = false;
      state.isAttacking = true;

      state.canCombo = true;
      state.canComboTime = attack.canComboTime;
      console.log("Crnt attack?", state.currentAttack);

    }
  }

  ConfusionQuestDefaults.addDefault(QuestHeroStats.defaults);
  ngrGame.addProfile('questHero', Hero);

})
  .service("QuestHeroAnimations", function (ngrLoop) {
    var hero;
    var anim;

    this.animate = function (_hero) {
      hero = _hero;

      ngrLoop.addHook(tick);
    }

    function tick() {

      var state = hero.getState();
      anim = hero.body.sprite.animation;

      if (!anim) return;

      if (!state.isAttacking && !state.airborne && anim.currentAnimation == "jump" || !state.airborne && anim.currentAnimation == "fly") {
        anim.gotoAndPlay("stand");
      }

      if (!state.isAttacking && state.goingRight) {
        if (anim.currentAnimation != "run" && anim.currentAnimation != "jump" && !state.airborne) anim.gotoAndPlay("run");
        anim.scaleX = Math.abs(anim.scaleX);
      }

      if (!state.isAttacking && state.goingLeft) {
        if (anim.currentAnimation != "run" && anim.currentAnimation != "jump" && !state.airborne) anim.gotoAndPlay("run");
        anim.scaleX = -Math.abs(anim.scaleX);
      }

      if (!state.isAttacking && state.airborne) {
        if (anim.currentAnimation != "jump" && anim.currentAnimation != "fly") anim.gotoAndPlay("fly");
      }

      if (!state.isAttacking && state.isJumping) {
        if (!state.invincible) {
          if (anim.currentAnimation != "jump") anim.gotoAndPlay("jump");
        }

      }

      if (state.isCrouching) {
        if (anim.currentAnimation != "duck" && !state.airborne) anim.gotoAndPlay("duck");
      }

      if (!state.goingLeft && !state.goingRight && !state.isAttacking && !state.isCrouching && !state.isJumping && !state.airborne) {
        if (anim.currentAnimation != "stand") anim.gotoAndPlay("stand");
      }

      if (state.isAttacking && state.currentAttack) {
        if (state.currentAttack.id == "punch1") {
          if (anim.currentAnimation != "punch1") anim.gotoAndPlay("punch1");
        }

        if (state.currentAttack.id == "punch2") {
          if (anim.currentAnimation != "punch2") anim.gotoAndPlay("punch2");
        }

        if (state.currentAttack.id == "kick1") {
          if (anim.currentAnimation != "kick1") anim.gotoAndPlay("kick1");
        }

        if (state.currentAttack.id == "kick2") {
          if (anim.currentAnimation != "kick2") anim.gotoAndPlay("kick2");
        }
      }

      if (state.invincible) {
        anim.gotoAndPlay("hurt");
      }

      _.each(anim.spriteSheet.getAnimations(), function (animation) {
        anim.spriteSheet.getAnimation(animation).speed = 0.4;
      });

    };

  })

.service("QuestHeroStats", function () {

  var explosion1 = {
    skin: {
      src: 'img/sprites/explosion1.png',
      bg: 'spritesheet',
      framerate: 90,
      frames: {
        width: 123,
        height: 120,
        regX: 65,
        regY: 95,

      },
      frameWidth: 150,
      frameHeight: 150,
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          speed: 0.4,
          next: 'hide'
        },
        hide: [21]
      }
    },
  };


  var explosion2 = {
    skin: {
      src: 'img/sprites/explosion2.png',
      bg: 'spritesheet',
      framerate: 90,
      frames: {
        width: 283,
        height: 312,
        regX: 142,
        regY: 156,

      },
      frameWidth: 280,
      frameHeight: 280,
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          speed: 0.4,
          next: 'hide'
        },
        hide: [21]
      }
    },
  }
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
    muscle: 1000,
    attack: 10,
    evade: 0,
    canShoot: false,
    canSprint: false,
    attacks: {
      punch1: {
        id: 'punch1',
        name: 'Punch of Meaning',
        animation: 'punch1',
        damage: 10,
        range: 3,
        stunnedTime: 15,
        duration: 25,
        knockback: 10,
        canComboTime: 50,
        effect:explosion2,
        nextPunch1: "punch2",
        nextPunch2: "punch2Super",
        nextKick1: "kick1",
        nextKick2: "kick1Super",
      },
      punch2: {
        id: 'punch2',
        name: 'Punch of Honesty',
        animation: 'punch2',
        damage: 15,
        stunnedTime: 10,
        duration: 16,
        knockback: 10,
        range: 3,
        canComboTime: 50,
        effect:explosion2,
        nextPunch1: "punch1",
        nextPunch2: "punch2Super",
        nextKick1: "kick1",
        nextKick2: "kick1Super",
      },
      kick1: {
        id: 'kick1',
        name: 'Kick of Truth',
        animation: 'kick1',
        damage: 15,
        stunnedTime: 15,
        duration: 18,
        knockback: 15,
        range: 4,
        canComboTime: 50,
        effect:explosion1,
        nextPunch1: "punch2",
        nextPunch2: "punch1",
        nextKick1: "kick2",
        nextKick2: "kick1Super",
      },
      kick2: {
        id: 'kick2',
        name: 'Kick of Friendship',
        animation: 'kick2',
        damage: 20,
        range: 4.1,
        knockback: 15,
        stunnedTime: 6,
        duration: 18,
        effect:explosion1,
        canComboTime: 50,
        nextPunch1: "punch1",
        nextPunch2: "punch1Super",
        nextKick1: "kick1",
        nextKick2: "kick2Super",
      }
    }
  }

  this.state = {
    goingLeft: false,
    goingRight: false,
    isJumping: false,
    airBorne: false,
    jumpWait: 0,
    isAttacking: false,
    canAttack: true,
    currentAttack: null,
    airborneGraceTime: 0,
    canAct: true,
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
      src: 'img/sprites/calvin/calvin.png',
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
        duck: [76, 165],
        hurt: [166],
        punch1: [167, 180, "stand"],
        kick1: [176, 185, "stand"],
        kick2: [180, 187, "stand"],
        punch2: [188, 193, 192, 191, "stand"],
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
