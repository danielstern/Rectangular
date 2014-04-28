angular.module('ConfusionQuest')
  .service('Madness', function(ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {

    var stats = {
      id: "enemy2",
      name: "enemy",
      health: 35,
      damage: 15,
      speed: 0.2,
      muscle: 100,
      attacks: [{
        name: "Madness Swipe",
        damage: 12,
        cooldown: 150,
        duration: 15,
        effect: ConfusionQuestSFX.explosion2,
        knockback: 3,
        propel: 1,
        range: 5,
        animation: "attack",
      }, {
        name: "Do Nothing",
        damage: 0,
        cooldown: 60,
        duration: 35,
        animation: "stand",
      }],
      img: 'img/unbalance.png',
      name: "Madness",
      description: "A shadowy and dangerous being.",
      flavor: "Not as friendly as you'd think.",
    };

    var Madness = Enemy.fullExtend({
      init:function(){
        var enemy = this;
        console.log("Madness initing");
        this._super.init(enemy);
      },
      tick:function(){
        this._super.tick();
        this.brake();
      }
    })

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
          jump: [48, 71, "stand"],
          attack: [72, 79, "stand"]
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
