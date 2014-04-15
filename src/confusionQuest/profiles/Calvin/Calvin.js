angular.module('Calvin', ['Rectangular'])
  .service('Calvin', function (ngrGame, ngrWorld, ConfusionQuestDefaults,
    ConfusionQuestSFX,
    CalvinAnimations, CalvinStats) {

    function Calvin(body, options) {

      body.profile = this;
      var hero = this;
      var heroBody = body;

      var stats = _.clone(CalvinStats.stats);
      var state = _.clone(CalvinStats.state);

      this.body = heroBody;

      var stateChangeListeners = [];

      this.onstatechange = function (l) {
        stateChangeListeners.push(l);
      }

      body.SetUserData({
        isHero: true
      });

      CalvinAnimations.animate(hero);

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

        if (state.canAct && state.goingLeft) {
          state.facingLeft = true;
          state.facingRight = false;
        };

        if (state.canAct && state.goingRight) {
          state.facingLeft = false;
          state.facingRight = true;
        };

        if (state.goingLeft && !speedingL && !state.isCrouching && state.canAct) {

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
            if (state.canComboTime > 18) {
              attack = stats.attacks[state.currentAttack.nextPunch1]
            } else {
              attack = stats.attacks[state.currentAttack.nextPunch2]
            }
          } else {
            attack = stats.attacks["punch1"];
          }
        };
        if (atk == 'kick') {
          if (state.canCombo) {
            if (state.canComboTime > 18) {
              attack = stats.attacks[state.currentAttack.nextKick1]
            } else {
              attack = stats.attacks[state.currentAttack.nextKick2]
            }
          } else {
            attack = stats.attacks["kick1"];
          }
        }

        var heroPos = heroBody.GetPosition();

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

        function onhitsomething(other, point1, point2) {
          console.log("On hit something", arguments);
          //return;
          var otherBody = other;
          var force = stats.muscle * (attack.knockback || 0);
          if (state.facingLeft) force *= -1;

          if (otherBody.GetUserData() && otherBody.GetUserData().isEnemy) {
            ngrGame.effect(ConfusionQuestSFX.explosion2, point1);
            //ngrGame.effect(ConfusionQuestSFX.explosion2, point2);
          };

          otherBody.ApplyForce(new b2Vec2(force, 0), otherBody.GetWorldCenter());
        }

        ngrGame.aoe(p2, attack.splash || 0.3, onhitsomething);
        //ngrWorld.getWorld().RayCast(onhitsomething, p1, p2);

        if (attack.propel) {
          var propelForce = attack.propel * stats.muscle;
          if (state.facingLeft) propelForce *= -1;
          heroBody.ApplyForce(new b2Vec2(propelForce, 0), heroBody.GetWorldCenter())
        }

        state.currentAttack = attack;
        state.canActCooldown = attack.stunnedTime;
        state.isAttackingCooldown = attack.duration;
        state.canAct = false;
        state.isAttacking = true;

        if (attack.canComboTime) {
          state.canCombo = true;
          state.canComboTime = attack.canComboTime;
        }
      }
    }

    ConfusionQuestDefaults.addDefault(CalvinStats.defaults);
    ngrGame.addProfile('Calvin', Calvin);

  })
