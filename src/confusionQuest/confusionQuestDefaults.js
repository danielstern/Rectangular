angular.module("ConfusionQuest")
  .service("ConfusionQuestDefaults", function () {

    var ConfusionQuestDefaults = this;

    ConfusionQuestDefaults.enemy = {
      userData: {
        isEnemy: true,
      }
    }

    this.addDefault = function (def) {
      
      ConfusionQuestDefaults.defaults.push(def);
    };

    this.defaults = [{
      name: 'Wooden Box',
      shape: 'box',
      skin: {
        src: 'img/box.png',
        bg: 'sprite'
      },
      userData: {
        doodad: true,
        isFloor: true,
      },
      presets: {
        height: 1,
        width: 1,
        restitution: 0.2,
        density: 0.2
      }

    }, {
      name: 'Ruby',
      shape: 'box',
      skin: {
        src: 'img/gemRed.png',
        bg: 'sprite'
      },
      profile: "ruby",
      userData: {
        doodad: true,
        isCoin: true,
      },
      presets: {
        radius: 1,
        height: 2,
        width: 2,
        restitution: 0.2,
        density: 0.2
      }

    }, {
      name: 'Door - Red',
      shape: 'box',
      skin: {
        src: 'img/lock_red.png',
        bg: 'sprite',
        index: 0
      },
      profile: "doorRed",
      presets: {
        radius: 1,
        height: 4,
        width: 4,
        restitution: 0.2,
        density: 0.2
      }
    },{
      name: 'Key - Red',
      shape: 'box',
      skin: {
        src: 'img/keyRed.png',
        bg: 'sprite',
        index: 0
      },
      profile: "keyRed",
      presets: {
        radius: 1,
        height: 1.5,
        width: 1.5,
        restitution: 0.2,
        density: 0.2
      }
    }, {
      name: 'Density-Less Platform',
      shape: 'box',
      skin: {
        src: 'img/box.png',
        bg: 'tiled'
      },
      userData: {
        isFloor: true,
      },
      presets: {
        height: 0.5,
        width: 5,
        restitution: 0.1,
        density: 0,
        friction: 0.2,
        gravityScale: 0
      }
    }, {
      name: 'Circle',
      shape: 'circle',
      skin: {
        src: 'img/box-purple.png',
        bg: 'tiled'
      },
      userData: {
        prize: true,
      },
      presets: {
        radius: 1.5,
        restitution: 0.2,
        density: 0.2,
        bg: 'tiled',

      }

    }]
  })
