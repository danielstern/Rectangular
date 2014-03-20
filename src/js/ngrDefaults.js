angular.module('Rectangular')
.service('ngrDefaults', function()
{
  this.wall = {
    width: 0.3,
    type: 'static',
    shapeKind: 'box',
    src: 'img/tile.png',
    bg: 'tiled',
    x: 0,

  };

  this.body = {
      height: 0.5,
      width: 0.5,
      x: 10,
      y: 1,
      radius: 1.5,
      density : 0.5 ,
      'friction' : 0.2 ,
      'restitution' : 0.1,
      'linearDamping' : 0.0 ,
      'angularDamping' : 0.0 ,
      gravityScale : 1.0 ,
      type : 'dynamic' ,
      angle: 0,
      
    }

  this.floor = {
    height: 0.3,
    type: 'static',
    friction: 0.3,
    density: 0.4,
    restitution: 0.2,
    isFloor: true,
    shapeKind: 'box',
    src: 'img/tile.png',
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
    fps:60,
    gravity: 60,
    debug: true,
    zoom: 1,
    floor: true,
    room: {
      width: 90,
      height: 40
    }
  }
  
})