angular.module('ConfusionQuest')
  .service('Insanity', function(ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    var stats = {
      id: "Insanity",
      name: "enemy",
      health: 1000,
      muscle: 10000,
      attacks: [{
        name: "Insanity Swipe",
        damage: 20,
        cooldown: 150,
        duration: 15,
        effect: ConfusionQuestSFX.explosion1Big,
        knockback: 3,
        propel: 1,
        range: 3,
        splash: 10,
        animation: "attack",
      }, {
        name: "Do Nothing",
        damage: 0,
        cooldown: 60,
        duration: 35,
        animation: "stand",
      }, {
        name: "Leap",
        damage: 0,
        cooldown: 150,
        duration: 25,
        propel: 50,
        propelY: 100,
        animation: "jump",

      }],
      img: 'img/unbalance.png',
      name: "Insanity",
      description: "A shadowy and dangerous being.",
      flavor: "Not as friendly as you'd think.",
    };

    var Insanity = new Enemy(stats);
    Insanity.prototype.init = function() {

      var enemy = this;
      console.log("Insanity initing");

    }

    var defaults = {
      name: 'Insanity',
      shape: 'box',
      profile: 'Insanity',
      skin: {
        src: 'img/sprites/insanity.png',
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
          jump: [48, 71],
          attack: [72, 79, "stand"]
        }
      },
      presets: {
        height: 6,
        width: 6,
        restitution: 0.05,
        density: 0.7,
        friction: 0.2,
        gravityScale: 0.4
      }

    };

    _.extend(defaults, ConfusionQuestDefaults.enemy);
    ngrGame.addProfile('Insanity', Insanity);
    ConfusionQuestDefaults.addDefault(defaults);

  })
