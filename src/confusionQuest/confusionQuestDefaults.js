angular.module("ConfusionQuest")
  .service("ConfusionQuestDefaults", function () {
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
        src: 'img/sprites/p1_spritesheet.png',
        bg: 'spritesheet',
        /*frames: {
            width: 73,
            height: 97,
            regX: 36.5,
            regY: 50,
            count: 16
          },*/
        frameWidth: 73,
        frameHeight: 97,
        frames: [
          [365, 98, 69, 71, 0, 37, 48],
          [0, 196, 66, 92, 0, 37, 48],
          [438, 0, 69, 92, 0, 37, 48],
          [438, 93, 67, 94, 0, 37, 48],
          [67, 196, 66, 92, 0, 37, 48],
          [0, 0, 72, 97, 0, 37, 48],
          [73, 0, 72, 97, 0, 37, 48],
          [146, 0, 72, 97, 0, 37, 48],
          [0, 98, 72, 97, 0, 37, 48],
          [73, 98, 72, 97, 0, 37, 48],
          [146, 98, 72, 97, 0, 37, 48],
          [219, 0, 72, 97, 0, 37, 48],
          [292, 0, 72, 97, 0, 37, 48],
          [219, 98, 72, 97, 0, 37, 48],
          [365, 0, 72, 97, 0, 37, 48],
          [292, 98, 72, 97, 0, 37, 48],
        ],
        animations: {
          run: {
            frames: [6, 7, 8, 9, 8, 7],
            next: 'stand',
            speed: 0.2
          },
          stand: {
            frames: [4]
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
        height: 2.3,
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
          regX: 39,
          regY: 60,
        },
        frameWidth: 79,
        frameHeight: 119,
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
