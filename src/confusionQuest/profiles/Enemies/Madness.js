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
      console.log("Madness initing");
      

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
