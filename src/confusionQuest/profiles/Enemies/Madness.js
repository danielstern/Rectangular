angular.module('ConfusionQuest')
  .service('Madness', function (ngrGame, ngrLoop, ngrWorld,  ConfusionQuestSFX, ConfusionQuestDefaults) {

    var Madness = function (body) {
      var stats = {
        id: "enemy2",
        name: "madness",
        health: 20,
        damage: 15,
        speed: 0.2,
        attack: 15,
        img: 'img/unbalance.png',
        name: "Unbalance",
        description: "A shadowy and dangerous being.",
        flavor: "Not as friendly as you'd think.",
      };

      var state = {
        hp: 0
      }

      this.init = function() {
        state.hp = stats.health;
      };

      this.stats = stats;
      this.init();

      var madness = this;
      madness.body = body;
      body.profile = this;

      body.onimpact(function (other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          var hero = other.profile;
          hero.damage(stats.attack, madness);
        }
      });

      this.damage = function(dmg) {
        console.log("I'm damaged",dmg);
        state.hp-=dmg;
      }

      madness.die = function() {
        var pos = body.GetPosition();
        ngrGame.effect(ConfusionQuestSFX.explosion3Big, pos);
        body.crumble();
        state.dead = true;
      }


      ngrLoop.addHook(function () {
        if (state.dead) return;
        _.each(body.sprite.animation.spriteSheet.getAnimations(), function (animation) {
          body.sprite.animation.spriteSheet.getAnimation(animation).speed = 0.4;
        });

        if (state.hp <= 0) {
          madness.die();
        }

      });
    };

    var Enemy = {
      state: {
       // hp: this.stats.heath,
      },
    };

   _.extend(Madness, Enemy);
//    console.log("Extending", new Madness);

    var defaults = {
      name: 'Madness',
      shape: 'box',
      profile: 'Madness',
      skin: {
        src: 'img/sprites/enemy1.png',
        bg: 'spritesheet',
        frames: {
          width: 395,
          height: 390,
          regX: 200,
          regY: 220,
        },
        frameWidth: 300,
        frameHeight: 300,
        animations: {
          stand: [0, 47],
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
