angular.module("ConfusionQuest")
  .service("ConfusionQuestDefaults", function () {
      
     var ConfusionQuestDefaults = this;

    this.addDefault = function(def) {
      console.log("Pushing default,",def);
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
      name: 'Coin',
      shape: 'box',
      skin: {
        src: 'img/coinGold.png',
        bg: 'sprite'
      },
      profile: "confCoin",
      userData: {
        doodad: true,
        isCoin: true,
      },
      presets: {
        radius: 1,
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

    },{
      name: 'Powerup - Boots 1',
      shape: 'box',
      skin: {
        src: 'img/powershoe.png',
        bg: 'sprite'
      },
      profile: "boots1",
      userData: {
        doodad: true,
        isCoin: true,
      },
      presets: {
        radius: 1,
        height: 3,
        width: 3,
        restitution: 0.2,
        density: 0.2
      }

    },  {
      name: 'Powerup - Helmet 1',
      shape: 'box',
      skin: {
        src: 'img/helmet1.png',
        bg: 'sprite'
      },
      profile: "helmet1",
      userData: {
        doodad: true,
        isCoin: true,
      },
      presets: {
        radius: 1,
        height: 3,
        width: 3,
        restitution: 0.2,
        density: 0.2
      }

    }, {
      name: 'Door - Red',
      shape: 'box',
      skin: {
        src: 'img/lock_red.png',
        bg: 'sprite',
        index:0
      },
      profile: "doorRed",
      presets: {
        radius: 1,
        height: 4,
        width: 4,
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
      name: 'Dude',
      shape: 'box',
      profile: 'questHero',
      skin: {
        src: 'img/sprites/calvin/calvin2.png',
        bg: 'spritesheet',
        frames: {
            width:233.5 ,
            height: 257.5,
            regX:120,
            regY: 165,
            
          },
        frameWidth: 90,
        frameHeight: 150,
        animations: {
          run: {
            frames: [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
            speed: 0.4,
            
          },
          stand: {
            frames: [0,1,2,3,4,5,6,7,8,9,
            10,11,12,13,14,15,16,17,18,19,
            20,21,22,23,24,25,26,27,28,29
            ],
            next: "stand",
            speed: 0.4,
          },
          duck: {
            frames: [0]
          },
          hurt: {
            frames: [2],
            next: "stand",
            speed: 0.03
          },
          jump: {
            frames: [3],
            next: "stand",
            speed: 0.3

          }
        }
      },
      controls: 'platform-hero',
      userData: {
        doodad: true,
      },
      presets: {
        height: 2,
        width: 1.24,
        restitution: 0.1,
        density: 0.07,
        friction: 0.2,
        gravityScale: 0.4
      }

    }, {
      name: 'Enemy',
      shape: 'box',
      profile: 'enemy1',
      skin: {
        src: 'img/sprites/mahakana.png',
        bg: 'spritesheet',
        frames: {
          width: 78,
          height: 110,
          regX: 44,
          regY: 50,
        },
        frameWidth: 54,
        frameHeight: 70,
        animations: {

          stand: {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],
            speed: 0.2
          },
         /* hurt: {
            frames: [2],
            next: "stand",
          },*/
        }
      },
      userData: {
        doodad: true,
      },
      presets: {
        height: 3,
        width: 1.5,
        restitution: 0.1,
        density: 0.07,
        friction: 0.2,
        gravityScale: 0.4
      }

    }, {
      name: 'Bouncey Platform',
      shape: 'box',
      skin: {
        src: 'img/box-blue.png',
      },
      userData: {
        doodad: true,
      },
      presets: {
        height: 0.4,
        width: 2.5,
        restitution: 0.9,
        density: 0.2
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
