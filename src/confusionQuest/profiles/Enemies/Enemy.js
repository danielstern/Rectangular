angular.module('ConfusionQuest')
  .service('Enemy', function (ngrGame, ngrLoop, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    function Enemy(x) {
      return newEnemy();
    }

    function newEnemy() {

      var Enemy = function (body) {
        var stats = {
          id: "enemy2",
          name: "enemy",
          health: 20,
          damage: 15,
          speed: 0.2,
          attack: 15,
          img: 'img/unbalance.png',
          name: "Unbalance",
          description: "A shadowy and dangerous being.",
          flavor: "Not as friendly as you'd think.",
        };
        this.stats = stats;

   //     _.extend(this, new Enemy.profile());

        var enemy = this;
        enemy.body = body;
        body.profile = this;

   
        this.state = {
          facingLeft: true,
          facingRight: false,
          isJumping: false,
          isAttacking: false,
          hp: stats.health,
        }

        this.getState = function () {
          return enemy.state;
        };
        
        this.init =  function () {

          this.state.hp = enemy.stats.health;

          enemy.body.onimpact(function (other) {

            if (other.GetUserData() && other.GetUserData().isHero) {
              var hero = other.profile;
              hero.damage(enemy.stats.attack, enemy);
            }
          });

          this.body.SetType(2);

          ngrLoop.addHook(function () {

            if (enemy.state.dead) return;
            if (enemy.body.sprite && enemy.body.sprite.animation) {
              var anim = enemy.body.sprite.animation;

              _.each(anim.spriteSheet.getAnimations(), function (animation) {
                anim.spriteSheet.getAnimation(animation).speed = 0.4;
              });
            };

            if (enemy.state.hp <= 0) {

              enemy.die();
            }

          })



        }
          this.init();

        enemy.tick = function () {
          if (enemy.state.isAttacking) {
            console.log("enemy attack!");
          }

        }

        ngrGame.control(enemy, {
          'a': 'goingLeft',
          'd': 'goingRight',
          'w': 'isJumping',
          'p': 'isAttacking',
        })
      };

      return Enemy;

    }
    Enemy.profile = function () {
      return {
        state: {
          hp: 0
        },
        die: function () {
          var pos = this.body.GetPosition();
          ngrGame.effect(ConfusionQuestSFX.explosion3Big, pos);
          this.body.crumble();
          this.state.dead = true;
        },
        damage: function (dmg) {

          this.state.hp -= dmg;

        }
      }
    };

    return Enemy;
  });
