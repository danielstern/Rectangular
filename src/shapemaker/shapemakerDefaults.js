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
        name: 'Dirt',
        type: 'dirt',
        src: 'img/grassCenter.png'
      }, {
        name: 'Castle',
        type: 'castle',
        src: 'img/castleCenter.png'
      }, {
        name: 'Snow',
        type: 'snow',
        src: 'img/snowCenter.png'
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
    }, {
      name: 'Triangle',
      type: 'triangle'
    }]

    this.shapeDefaultParams = {
      box: {
        params: 'height width restitution density friction',
      },
      triangle: {
        params: 'innerAngle adjacent opposite restitution density friction',
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
      presets: {
        height: 1,
        width: 1,
        restitution: 0.2,
        density: 0.2
      }

    }, {
      name: 'Wedge',
      shape: 'triangle',
      skin: {
        src: 'img/box-green.png',
      },
      presets: {
        innerAngle: 90,
        adjacent: 6,
        opposite: 2
      }

    }, {
      name: 'Coin Box',
      shape: 'box',
      skin: {
        src: 'img/boxCoin.png',
      },
      userData: {
        treasure: "true",
        points: 60
      },
      presets: {
        density: 0.7,
        restitution: 0.6,
        height: 1,
        width: 1,
      }

    }, {
      name: 'Boulder',
      shape: 'circle',
      skin: {
        src: 'img/stoneMid.png',
      },
      presets: {
        radius: 2,
        density: 0.9,
        restitution: 0.1,
        friction: 0.4,
      }

    }, {
      name: 'Rubber Ball',
      shape: 'circle',
      skin: {
        name: 'Blue',
        src: 'img/box-blue.png',
      },
      presets: {
        radius: 0.3,
        bg: 'tiled',
        restitution: 0.9,
      }

    }, {
      name: 'Explosive Box',
      shape: 'box',
      skin: {
        src: 'img/box-red.png',
      },
      userData: {
        explosive: true,
        volatility: 1,
        doodad: true,
        force: 1
      },      
      presets: {
        height: 0.5,
        width: 0.5,
        restitution: 0.2,
        density: 0.6,
        userData: {
          explosive: true
        }
      }

    }]

  })
