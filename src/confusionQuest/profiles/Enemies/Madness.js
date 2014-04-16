angular.module('ConfusionQuest')
  .service('Madness', function (ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

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
      this.stats = stats;

      _.extend(this, new Enemy.profile());

      var madness = this;
      madness.body = body;
      body.profile = this;

      this.init();

      this.state = {
        facingLeft: true,
        facingRight: false,
        isJumping: false,
        isAttacking: false,
      }

      this.getState = function() {
        return madness.state;
      };

      madness.tick = function() {
        if (madness.state.isAttacking) {
          console.log("madness attack!");
        }

      }


      ngrGame.control(madness,{
        'a': 'goingLeft',
        'd': 'goingRight',
        'w': 'isJumping',
        'p': 'isAttacking',
      })
    };


   // _.extend(Madness, new Enemy.profile);
    //    console.log("Extending", new Madness);

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
