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
      },
      userData: {
        doodad: true,
      },
      presets: {
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
        doodad: true,
      },
      presets: {
        height: 0.5,
        width: 5,
        restitution: 0.1,
        density: 0,
        friction: 0.2,
        gravityScale: 0
      }

    },{
      name: 'Dude',
      shape: 'box',
      skin: {
        src: 'img/sprites/p1/p1_spritesheet.png',
        bg: 'spritesheet'
      },
      controls: 'platform-hero',
      userData: {
        doodad: true,
      },
      presets: {
        height: 1,
        width: 0.5,
        restitution: 0.1,
        density: 0,
        friction: 0.2,
        gravityScale: 0
      }

    },{
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
