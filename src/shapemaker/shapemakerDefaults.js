angular.module('shapemaker')
  .service('shapemakerDefaults', function (ngrState) {
    var Shape = function () {
      return {
        bg: 'tiled',
        type: 'dynamic',
        src: 'img/stoneCenter.png',
        x: Math.random() * ngrState.getState().worldWidth,
      }
    }

    this.shape = function (options) {
      return _.extend(_.clone(new Shape), _.clone(options));
    }

    this.context = {
      scale: 60,
      gravity: 60,
      zoom: 0.4,
      speed: 60,
      drawDebug: false,
      drawSprites: true,
      selectedX: 0,
      scale: 2,
      selectedY: 0,
      selectedAngle: 0,
      room: {
        height: 20,
        width: 50,
        roof: false,
        floor: true,
        leftWall: false,
        rightWall: false,
      },
    }

    this.skins = [{
        name: 'Stone',
        type: 'stone',
        src: 'img/stoneCenter.png'
      }, {
        name: 'Boxy',
        type: 'boxy',
        src: 'img/box.png'
      }, {
        name: 'Rock',
        type: 'rock',
        src: 'img/stoneMid.png'
      }, {
        name: 'Red Box',
        src: 'img/box-red.png'
      }, {
        name: 'Green',
        type: 'green',
        src: 'img/box-green.png'
      }, {
        name: 'Blue',
        type: 'blue',
        src: 'img/box-blue.png'
      }

    ]

    this.shapeOptions = [{
      name: 'Circle',
      type: 'circle'
    }, {
      name: 'Rectangle',
      type: 'box'
    }, ]

    this.shapeDefaultParams = {
      box: {
        params: 'height width restitution density friction',
      },
      circle: {
        params: 'radius restitution density friction'
      }
    }

    this.creatorDefaults = {
      height: 2,
      width: 1,
      radius: 2,
      restitution: 0.3,
      density: 0.5,
      friction: 0.5,
      linearDamping: 0.5,
      gravityScale: 0.5,
      angle: 0,
      innerAngle: 90,
      adjacent: 2,
      opposite: 2,
    }

    this.presets = [{
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
      name: 'Density-Less Platform',
      shape: 'box',
      skin: {
        src: 'img/box.png',
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
      skin: {
        src: 'img/sprites/p1/p1_spritesheet.png',
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
          [365, 98, 69, 71, 0, 37, 50],
          [0, 196, 66, 92, 0, 37, 50],
          [438, 0, 69, 92, 0, 37, 50],
          [438, 93, 67, 94, 0, 37, 50],
          [67, 196, 66, 92, 0, 37, 50],
          [0, 0, 72, 97, 0, 37, 50],
          [73, 0, 72, 97, 0, 37, 50],
          [146, 0, 72, 97, 0, 37, 50],
          [0, 98, 72, 97, 0, 37, 50],
          [73, 98, 72, 97, 0, 37, 50],
          [146, 98, 72, 97, 0, 37, 50],
          [219, 0, 72, 97, 0, 37, 50],
          [292, 0, 72, 97, 0, 37, 50],
          [219, 98, 72, 97, 0, 37, 50],
          [365, 0, 72, 97, 0, 37, 50],
          [292, 98, 72, 97, 0, 37, 50],
        ],
        animations: {
          run: {
            frames: [5, 6, 7, 8, 9, 10],
            next: 'stand',
            speed: 0.2
          },
          stand: {
            frames: [5]
          },
          jump: {
            frames: [14],
            next: "stand",
            speed: 0.03

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
