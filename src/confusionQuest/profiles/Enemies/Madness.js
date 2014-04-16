angular.module('ConfusionQuest')
  .service('Madness', function (ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {


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

    var Madness = new Enemy(stats);
    Madness.prototype.init = function () {
      
      var enemy = this;

      this.state.hp = enemy.stats.health;

      enemy.body.onimpact(function (other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          var hero = other.profile;
          hero.damage(enemy.stats.attack, enemy);
        }
      });

      this.body.SetType(2);

      enemy.tick = function() {

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

        if (enemy.state.isAttacking) {
          console.log("enemy attack!");
        }

      }

      ngrLoop.addHook(enemy.tick)

    }

    var defaults = {
      name: 'Madness',
      shape: 'box',
      profile: 'Madness',
      skin: {
        src: 'img/sprites/enemy3.png',
        bg: 'spritesheet',
        frames: {
          width: 460,
          height: 449,
          regX: 200,
          regY: 270,
        },
        frameWidth: 325,
        frameHeight: 325,
        animations: {
          stand: [0, 47],
          jump: [48, 71,],
          attack: [72, 79, 79, 77]
        }
      },
      presets: {
        height: 2,
        width: 2,
        restitution: 0.1,
        density: 0.07,
        friction: 0.2,
        gravityScale: 0.4
      }

    };

    _.extend(defaults, ConfusionQuestDefaults.enemy);
    ngrGame.addProfile('Madness', Madness);
    ConfusionQuestDefaults.addDefault(defaults);

  })
