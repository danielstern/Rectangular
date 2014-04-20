angular.module('ConfusionQuest')
  .service('Sara', function(ngrGame, ngrLoop, Enemy, ngrWorld, ConfusionQuestSFX, ConfusionQuestDefaults) {


    var stats = {
      id: "enemy2",
      name: "enemy",
      health: 35,
      damage: 15,
      speed: 0.2,
      muscle: 100,
      attacks: [{
        name: "Do Nothing",
        damage: 0,
        cooldown: 60,
        duration: 35,
        animation: "stand",
      }],
      name: "Sara",
    };

    var Sara = new Enemy(stats);
    Sara.prototype.init = function() {

      var enemy = this;

    }

    Sara.prototype.tick = function() {
      this.brake();
    }

    var defaults = {
      name: 'Sara',
      shape: 'box',
      profile: 'Sara',
      skin: {
        src: 'img/sprites/SaraFullSheet.png',
        bg: 'spritesheet',
        frames: {
          width: 64,
          height: 64,
          regX: 32,
          regY: 38,
        },
        frameWidth: 42,
        frameHeight: 42,
        animations: {
          stand: [13],
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
    ngrGame.addProfile('Sara', Sara);
    ConfusionQuestDefaults.addDefault(defaults);

  })
