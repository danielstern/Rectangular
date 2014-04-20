angular.module('ConfusionQuest')
  .service('Enemy', function(ngrGame, ngrLoop, ngrWorld, Entity, ConfusionQuestSFX, ConfusionQuestDefaults) {

    function Enemy(stats) {
      return newEnemy(stats);
    }

    function newEnemy(stats) {

      var Enemy = Entity(stats);
      var enemy = Enemy.prototype;

      enemy.die = function() {
        var pos = this.body.GetPosition();
        ngrGame.effect(ConfusionQuestSFX.explosion3Big, pos);
        this.body.crumble();
        this.state.dead = true;
      };

      enemy.damage = function(dmg) {
        var enemy = this;
        this.state.hp -= dmg;
        enemy.state.justDamaged = true;
        enemy.state.justDamagedCooldown = enemy.stats.justDamagedCooldown || 1;
      };


      enemy.faceHero = function() {
        var enemy = this;
        var body = this.body;

        var rayLength = this.stats.vision || 100;
        var enemyPos = body.GetPosition();

        var enemyBottomPoint = {
          x: enemyPos.x,
          y: enemyPos.y + enemy.body.options.height / 0.75
        }

        var pL = new b2Vec2(enemyPos.x - rayLength, enemyPos.y);
        var pL2 = new b2Vec2(enemyBottomPoint.x - rayLength, enemyPos.y);
        var pR = new b2Vec2(enemyPos.x + rayLength, enemyBottomPoint.y);
        var pR2 = new b2Vec2(enemyBottomPoint.x + rayLength, enemyBottomPoint.y);

        ngrWorld.getWorld().RayCast(onSeeSomethingL, enemyPos, pL);
        ngrWorld.getWorld().RayCast(onSeeSomethingL, enemyBottomPoint, pL2);
        ngrWorld.getWorld().RayCast(onSeeSomethingR, enemyPos, pR);
        ngrWorld.getWorld().RayCast(onSeeSomethingR, enemyBottomPoint, pR2);

        function onSeeSomethingL(other) {
          var otherData = other.m_body.GetUserData();
          if (otherData && otherData.isHero) {
            enemy.state.facingLeft = true;
            enemy.state.facingRight = false;
          }
        }

        function onSeeSomethingR(other) {
          var otherData = other.m_body.GetUserData();
          if (otherData && otherData.isHero) {
            enemy.state.facingRight = true;
            enemy.state.facingLeft = false;
          }
        }
      }


      enemy.oncreated = function() {
        var enemy = this;
        if (!enemy.stats.frozen) enemy.body.SetType(2);
        enemy.stats.hp = this.stats.health;

        _.extend(enemy.state, {
          facingLeft: true,
          facingRight: false,
          isJumping: false,
          isAttacking: false,
        })

        _.extend(enemy.stats, {
          attackCooldown: enemy.stats.attackCooldown || 60,
        })

        enemy.body.onimpact(function(other) {

          if (other.GetUserData() && other.GetUserData().isHero) {
            var hero = other.profile;
            if (enemy.stats.dangerTouch) hero.damage(enemy.stats.attack, enemy);
          }

        });
      }

      enemy._init = function() {
        
        ngrWorld.getWorld().onbegincontact(contactHandler);
        ngrWorld.getWorld().onpresolve(contactHandler);

        function contactHandler(contact, _oldManifold) {
          var body1 = contact.GetFixtureA().GetBody();
          var body2 = contact.GetFixtureB().GetBody();

          var data1 = body1.GetUserData() || {};
          var data2 = body2.GetUserData() || {};

          if (data1.isEffect || data2.isEffect) {
            contact.SetEnabled(false);
          }

          if (data1.isEnemy && data2.isHero || data1.isHero && data2.isEnemy) {
            contact.SetEnabled(false)
          }
        }

      }

      enemy._tick = function(enemy) {

        var body = enemy.body;
        var rayLength = this.stats.vision || 50;
        var enemyPos = body.GetPosition();

        if (enemy.state.dead) return;
        if (enemy.body.sprite && enemy.body.sprite.animation) {
          enemy.onhassprite();
          this.animate(enemy.state, enemy.body.sprite.animation);
        };

        if (enemy.state.hp <= 0) {
          enemy.die();
        }



        function onSeeSomething(other) {
          var otherData = other.m_body.GetUserData();
          if (otherData && otherData.isHero) {
            enemy.state.canSeeHero = true;
          }
        }

        var numRays = 20;

        for (var i = 0; i < numRays; i++) {
          var percentComplete = i / numRays;
          var radiansInCircle = Math.PI * 2;
          var p2X = Math.cos(percentComplete * radiansInCircle) * rayLength;
          var p2Y = Math.sin(percentComplete * radiansInCircle) * rayLength;
          var p2 = new b2Vec2(p2X, p2Y);

          ngrWorld.getWorld().RayCast(onSeeSomething, enemyPos, p2);
        }

        enemy.faceHero();

        if (enemy.state.canSeeHero) {
          if (enemy.stats.attacks && enemy.stats.attacks[0]) {
            enemy.state.isAttacking = true;
          }
        } else {
          enemy.state.isAttacking = false;
        }


        if (!enemy.state.attackCooldown) {
          enemy.state.canAttack = true;
        }

        if (enemy.state.isAttacking) {
          if (enemy.state.canAttack) enemy.attack();
        }

        enemy.state.canSeeHero = false;
        if (enemy.state.attackCooldown) enemy.state.attackCooldown--;
        if (enemy.state.attackDuration) enemy.state.attackDuration--;
        if (enemy.state.justDamagedCooldown) enemy.state.justDamagedCooldown--;

        if (!enemy.state.attackDuration) {
          enemy.state.isAttacking = false;
        }

        if (!enemy.state.justDamagedCooldown) {
          enemy.state.justDamaged = false;
        }

        enemy.body.SetAngle(0);
      }

      enemy.attack = function() {
        var enemy = this;
        var body = enemy.body;
        var attack = _.sample(enemy.stats.attacks);
        var state = enemy.state;

        enemy.state.attackCooldown = attack.cooldown;
        enemy.state.attackDuration = attack.duration;
        enemy.state.canAttack = false;

        if (attack.animation) {
          enemy.state.attackAnimation = attack.animation;
        } else {
          enemy.state.attackAnimation = null;
        }

        if (!attack.isProjectile && attack.range) {

          ngrLoop.wait(attack.delay || 0)
            .then(function() {

              enemy.strike(attack);


              state.currentAttack = attack;

            })

        }
        if (attack.propel) {
          var propelForce = attack.propel * stats.muscle;
          var propelForceY = (attack.propelY || 0) * stats.muscle;
          if (state.facingLeft) propelForce *= -1;
          body.ApplyForce(new b2Vec2(propelForce, -propelForceY), body.GetWorldCenter())
        }

        var landed = false;

        if (attack.onLand) {
          ngrLoop.wait(5)
            .then(function() {
              function contactHandler(contact, _oldManifold) {
                if (landed) return;
                var body1 = contact.GetFixtureA().GetBody();
                var body2 = contact.GetFixtureB().GetBody();

                var data1 = body1.GetUserData() || {};
                var data2 = body2.GetUserData() || {};

                if (data1.isFloor || data2.isFloor) {
                  var id = enemy.body.id;
                  if (body1.id == id || body2.id == id) {
                    landed = true;
                    _.each(attack.onLand,function(_attack) {
                 //     console.log("Striking,",_attack);
                  //     enemy.strike(_attack);
                    })
                  }
                }
              }
              ngrWorld.getWorld().onbegincontact(contactHandler);
            })
        }

      }

      enemy.strike = function(attack) {
        var enemy = this;
        var body = enemy.body;
        var state = enemy.state;
        var enemyPos = body.GetPosition();

        var newPoint;
        if (state.facingRight) {
          newPoint = enemyPos.x + attack.range || 5;
        } else {
          newPoint = enemyPos.x - attack.range || 5;
        }

        var p1 = new b2Vec2(enemyPos.x, enemyPos.y + (attack.y || 0));
        var p2 = new b2Vec2(newPoint, enemyPos.y + (attack.y || 0));

        if (attack.effect) {
            ngrGame.effect(attack.effect, p2);
        }

        function onhitsomething(other, point1, point2) {

          var otherBody = other;
          var force = stats.muscle * (attack.knockback || 0);
          if (state.facingLeft) force *= -1;

          if (otherBody.GetUserData() && otherBody.GetUserData().isHero) {
            ngrGame.effect(ConfusionQuestSFX.explosion2, point1);
          };

          otherBody.ApplyForce(new b2Vec2(force, 0), otherBody.GetWorldCenter());

          if (otherBody.GetUserData() && otherBody.GetUserData().isHero) {
            other.profile.damage(attack.damage, enemy);
          }
        }

  

        ngrGame.aoe(p2, attack.splash || 0.3, onhitsomething);


      }

      enemy.animate = function(state, anim) {
        if (state.facingRight) {
          anim.scaleX = -Math.abs(anim.scaleX);
        };

        if (state.facingLeft) {
          anim.scaleX = Math.abs(anim.scaleX);
        }

        if (state.isAttacking) {
          var animation = "attack";
          if (state.attackAnimation) animation = state.attackAnimation;
          if (anim.currentAnimation != animation) anim.gotoAndPlay(animation);
        }

        if (!state.isAttacking && !state.isJumping) {
          if (anim.currentAnimation != "stand") anim.gotoAndPlay("stand");
        }

        if (state.justDamaged) {
          console.log("just damaged");
          //        var blurFilter = new createjs.BlurFilter(3, 3, 0);
          anim.filters = filters = [
            new createjs.ColorFilter(0, 0, 0, 1, 255, 255, 255)
          ];
        } else {
          anim.filters = [];
        }

        var bounds = {
          width: 400,
          height: 400,
          x: -200,
          y: -200,

        }
        anim.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);


      }

      enemy.onhassprite = function() {
        var anim = this.body.sprite.animation;
        window._anim = anim;

        _.each(anim.spriteSheet.getAnimations(), function(animation) {
          anim.spriteSheet.getAnimation(animation).speed = 0.4;
        });
      }

      return Enemy;

    }

    return Enemy;
  })
