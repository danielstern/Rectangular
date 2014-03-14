angular.module('Rectangular')
  .service("ngrModels", function(ngrState, ngrBox, ngrDefaults)
  {

    var env;

    this.leftWall = function(options)
    {

      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.wall);
      options = _.extend(defaults, options);

      options.height = env.worldHeight / 2;
      options.y = env.worldHeight / 2;

      var leftWall = ngrBox.shape('box', options);

      leftWall.options = options;

      return leftWall;

    }

    this.rightWall = function(options)
    {

      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.wall);
      options = _.extend(defaults, options);

      options.height = env.worldHeight / 2;
      options.x = env.worldWidth;
      options.y = env.worldHeight / 2;
      var rightWall = ngrBox.shape('box', options);

      rightWall.options = options;

      return rightWall;

    }

    this.floor = function(options)
    {

      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.floor);
      options = _.extend(defaults, options);

      options.y = env.worldHeight;
      options.width = env.worldWidth / 2;
      options.x = env.worldWidth / 2;

      var shape = ngrBox.shape('box', options);
      shape.options = options;
      return shape;

    }
  })

.service('ngrDefaults', function()
{
  this.wall = {
    width: 0.3,
    position: 'static',
    x: 0,
    src: 'img/tile.png',
    bg: 'tiled'
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
      position : 'dynamic' ,
      angle: 0,
    }

  this.floor = {
    height: 0.3,
    position: 'static',
    /*src: 'img/tile-blue.png',*/
    bg: 'tiled',
    userData:
    {
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
    gravity: 30,
    debug: true,
    floor: true,
    worldWidth: 1000,
    worldHeight: 16.6
  }
  this.testWorld1 =  {"properties":{"height":600,"width":800,"focus":{"x":0,"y":0},"SCALE":24,"worldWidth":1000,"worldHeight":25},"elements":[{"definition":{"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"isShape":true},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"options":{"height":0.5,"width":0.5,"x":20.884692637870707,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"isShape":true},"options":{"height":0.5,"width":0.5,"x":20.884692637870707,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"options":{"height":0.5,"width":0.5,"x":23.94023965268085,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"isShape":true},"options":{"height":0.5,"width":0.5,"x":23.94023965268085,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"},"options":{"height":0.3,"width":500,"x":500,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"static","angle":0,"bg":"tiled","userData":{"isFloor":true},"type":"box"}},{"definition":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":11.74996596140166,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":4.855162766762078,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"},"options":{"height":0.5,"width":0.5,"x":15.732158029762406,"y":1,"radius":0.5,"density":0.5,"friction":0.2,"restitution":0.3,"linearDamping":0,"angularDamping":0,"gravityScale":1,"position":"dynamic","angle":0,"type":"circle"}},{"definition":{"options":{"height":0.5,"width":0.5,"x":28.525928679543235,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"},"isShape":true},"options":{"height":0.5,"width":0.5,"x":28.525928679543235,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"}},{"definition":{"options":{"height":3.77,"width":0.5,"x":25.239564587051667,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"},"isShape":true},"options":{"height":3.77,"width":0.5,"x":25.239564587051667,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"}},{"definition":{"options":{"height":3.77,"width":0.5,"x":10.488052627382178,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"},"isShape":true},"options":{"height":3.77,"width":0.5,"x":10.488052627382178,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"}},{"definition":{"options":{"height":3.77,"width":0.5,"x":18.6325036532556,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"},"isShape":true},"options":{"height":3.77,"width":0.5,"x":18.6325036532556,"y":1,"radius":1.5,"density":0.5,"friction":0.5,"restitution":0.3,"linearDamping":0,"angularDamping":0,"position":"dynamic","angle":0,"type":"box"}}]} 
  
})
