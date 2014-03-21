angular.module('shapemaker')
  .service('shapecreatorDefaults', function (ngrState) {
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
      name: 'Boulder',
      shape: 'circle',
      skin: {
        src: 'img/stoneMid.png',
      },
      presets: {
        radius: 2,
        density: 0.9,
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
