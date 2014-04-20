angular.module('ConfusionQuest')
  .service('Insanity', function(ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    var stats = {
      id: "Insanity",
      name: "enemy",
      health: 1000,
      attack: 8,
      dangerTouch: true,
      muscle: 10000,
      vision: 100,
      attacks: [{
        name: "Insanity Swipe",
        damage: 20,
        delay: 25,
        cooldown: 150,
        duration: 15,
        effect: ConfusionQuestSFX.explosion1Huge,
        knockback: 3,
        propel: 1,
        y: 2,
        range: 7,
        splash: 7,
        animation: "attack",
      }, {
        name: "Do Nothing",
        damage: 0,
        cooldown: 30,
        duration: 10,
        animation: "stand",
      }, {
        name: "Leap",
        damage: 0,
        cooldown: 100,
        duration: 25,
        propel: 12,
        propelY: 20,
        onLand: [{
          damage: 20,
          effect: ConfusionQuestSFX.explosion1Huge,
          knockback: 3,
          y: 3,
          range: 7,
          splash: 2,
        }, {
          damage: 20,
          effect: ConfusionQuestSFX.explosion1Huge,
          knockback: 3,
          y: 3,
          range: -7,
          splash: 2,
        }],
        animation: "jump",
      }, {
        name: "Small Leap",
        damage: 0,
        cooldown: 60,
        duration: 25,
        propel: 6,
        propelY: 10,
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
        gravityScale: 0.4,
        //collisionGroup: -1,
      }

    };

    _.extend(defaults, ConfusionQuestDefaults.enemy);
    ngrGame.addProfile('Insanity', Insanity);
    ConfusionQuestDefaults.addDefault(defaults);

  })
