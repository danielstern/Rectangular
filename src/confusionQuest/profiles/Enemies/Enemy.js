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
        this.state.hp -= dmg;
      };


      enemy.faceHero = function() {
        var enemy = this;
        var body = this.body;

        var rayLength = this.stats.vision || 100;
        var enemyPos = body.GetPosition();

        var pL = new b2Vec2(enemyPos.x - rayLength, enemyPos.y);
        var pR = new b2Vec2(enemyPos.x + rayLength, enemyPos.y);
        ngrWorld.getWorld().RayCast(onSeeSomethingL, enemyPos, pL);
        ngrWorld.getWorld().RayCast(onSeeSomethingR, enemyPos, pR);

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

         var newX;
        if (enemy.state.facingLeft) {
          newX = enemyPos.x - rayLength;
        } else {
          newX = enemyPos.x + rayLength;
        }

        //console.log("Enemy height?",enemy.body.options.height)

        var p2 = new b2Vec2(newX, enemyPos.y);
        var p2H = new b2Vec2(newX, enemyPos.y + enemy.body.options.height / 4);
        var p2L = new b2Vec2(newX, enemyPos.y - enemy.body.options.height / 2);

        var enemyBottomPoint = {
          x: enemyPos.x,
          y: enemyPos.y + enemy.body.options.height
        }

        ngrWorld.getWorld().RayCast(onSeeSomething, enemyPos, p2);
        ngrWorld.getWorld().RayCast(onSeeSomething, enemyPos, p2H);
         ngrWorld.getWorld().RayCast(onSeeSomething, enemyBottomPoint, p2L);

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

       // if (!enemy.state.isMoving) enemy.brake();

        enemy.state.canSeeHero = false;
        if (enemy.state.attackCooldown) enemy.state.attackCooldown--;
        if (enemy.state.attackDuration) enemy.state.attackDuration--;
        
        if (!enemy.state.attackDuration) {
          enemy.state.isAttacking = false;
        }
      }

      enemy.attack = function() {
        var enemy = this;
        var body = enemy.body;
        var attack = _.sample(enemy.stats.attacks);
        var state = enemy.state;

        enemy.state.attackCooldown = attack.cooldown;
        enemy.state.attackDuration = attack.duration;
        enemy.state.canAttack = false;

        console.log("Attack?",attack)

        if (attack.animation) {
          enemy.state.attackAnimation = attack.animation;
        } else {
          enemy.state.attackAnimation = null;
        }

        if (!attack.isProjectile && attack.range) {

          var enemyPos = body.GetPosition();

          var newPoint;
          if (state.facingRight) {
            newPoint = enemyPos.x + attack.range;
          } else {
            newPoint = enemyPos.x - attack.range;
          }

          var p1 = new b2Vec2(enemyPos.x, enemyPos.y);
          var p2 = new b2Vec2(newPoint, enemyPos.y);

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
              other.profile.damage(attack.damage,enemy);
            }
          }

          ngrGame.aoe(p2, attack.splash || 0.3, onhitsomething);


          state.currentAttack = attack;

        }
          if (attack.propel) {
            var propelForce = attack.propel * stats.muscle;
            var propelForceY = (attack.propelY || 0 )* stats.muscle;
            if (state.facingLeft) propelForce *= -1;
            body.ApplyForce(new b2Vec2(propelForce, -propelForceY), body.GetWorldCenter())
          }

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



      }

      enemy.onhassprite = function() {
        var anim = this.body.sprite.animation;

        _.each(anim.spriteSheet.getAnimations(), function(animation) {
          anim.spriteSheet.getAnimation(animation).speed = 0.4;
        });
      }

      return Enemy;

    }

    return Enemy;
  })
