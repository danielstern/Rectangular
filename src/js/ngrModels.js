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
      options.shapeKind = 'box';

      var leftWall = ngrBox.shape(options);

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
      options.shapeKind = 'box';
      var rightWall = ngrBox.shape(options);

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

      var shape = ngrBox.shape(options);
      shape.options = options;
      return shape;

    }
  })

.service('ngrDefaults', function()
{
  this.wall = {
    width: 0.3,
    type: 'static',
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
      type : 'dynamic' ,
      angle: 0,
    }

  this.floor = {
    height: 0.6,
    type: 'static',
    friction: 0.3,
    density: 0.4,
    restitution: 0.2,
    isFloor: true,
    shapeKind: 'box',
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
  
})
