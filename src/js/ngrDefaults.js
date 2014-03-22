angular.module('Rectangular')
  .service('ngrDefaults', function () {
    this.wall = {
      width: 1,
      type: 'static',
      shapeKind: 'box',
      src: 'img/snowCenter.png',
      bg: 'tiled',
      x: 0,

    };

    this.body = {
      height: 0.5,
      width: 0.5,
      x: 10,
      y: 1,
      radius: 1.5,
      density: 0.5,
      'friction': 0.2,
      'restitution': 0.1,
      'linearDamping': 0.0,
      'angularDamping': 0.0,
      gravityScale: 1.0,
      type: 'dynamic',
      angle: 0,

    }

    this.bullet = {
      shapeKind: 'circle',
      radius: 0.15,
      density: 600,
      bullet: true,
      src: 'img/box-red.png',
      bg: 'tiled',
      hidden: false,
      userData: {
        igniter: true,
      },
      restitution: 0.99,
      friction: 0,
      gravityScale: 0,
      timedLife: true,
      lifeTime: 20,
      type: 'dynamic',
    }

    this.floor = {
      height: 0.5,
      type: 'static',
      friction: 0.3,
      density: 0.4,
      restitution: 0.2,
      isFloor: true,
      shapeKind: 'box',
      src: 'img/stoneMid.png',
      bg: 'tiled',
      userData: {
        isFloor: true
      }
    }

    this.skin = {
      height: 1,
      width: 1,
      snapToPixel: true,
      mouseEnabled: false,
      y: 1,
      x: 10,
      angle: 0,
      src: ''
    }

    this.initialize = {
      canvas: undefined,
      scale: 30,
      fps: 60,
      gravity: 60,
      debug: true,
      zoom: 1,
      floor: true,
      room: {
        width: 40,
        height: 25
      }
    }

  })
