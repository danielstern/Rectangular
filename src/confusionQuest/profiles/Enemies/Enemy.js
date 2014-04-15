angular.module('ConfusionQuest')
  .service('Enemy', function (ngrGame, ngrLoop, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {
  	this.profile = function () {
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
        init: function () {

          var enemy = this;
          this.state.hp = this.stats.health;

          this.body.onimpact(function (other) {

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
              console.log("im dying");
              enemy.die();
            }

          })

        },
        damage: function (dmg) {
          console.log("I'm damaged", dmg);
          this.state.hp -= dmg;
          console.log(this.state);
        }
      }
    };
  });