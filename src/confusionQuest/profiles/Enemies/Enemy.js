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

        var pL = new b2Vec2(enemyPos.x + rayLength, enemyPos.y);
        var pR = new b2Vec2(enemyPos.x - rayLength, enemyPos.y);
        ngrWorld.getWorld().RayCast(onSeeSomethingL, enemyPos, pR);
        ngrWorld.getWorld().RayCast(onSeeSomethingR, enemyPos, pL);

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
        var rayLength = this.stats.vision || 100;
        var enemyPos = body.GetPosition();

        if (enemy.state.dead) return;
        if (enemy.body.sprite && enemy.body.sprite.animation) {
          enemy.onhassprite();
          this.animate(enemy.state, enemy.body.sprite.animation);
        };

        if (enemy.state.hp <= 0) {
          enemy.die();
        }

        if (enemy.state.isAttacking) {
          console.log("enemy attack!");
        }

        function onSeeSomething(other) {
          //console.log("I see something",other);
          var otherData = other.m_body.GetUserData();
          if (otherData && otherData.isHero) {
            console.log("I can see hero");
            enemy.state.canSeeHero = true;
          }
        }

        var p2 = new b2Vec2(enemyPos.x + enemy.state.facingLeft ? rayLength : -rayLength, enemyPos.y);
        ngrWorld.getWorld().RayCast(onSeeSomething, enemyPos, p2);


        enemy.faceHero();

        if (enemy.state.canSeeHero) {
          if (enemy.canAttack) enemy.attack();
        }

        enemy.state.canSeeHero = false;
      }

      enemy.attack = function() {
        console.log("I'm attacking!");
      }

      enemy.animate = function(state, anim) {
        console.logOnce("animating", state, anim)
        if (state.facingRight) {
          anim.scaleX = -Math.abs(anim.scaleX);
        };

        if (state.facingLeft) {
          anim.scaleX = Math.abs(anim.scaleX);
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
