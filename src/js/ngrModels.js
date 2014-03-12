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

  this.floor = {
    height: 0.3,
    position: 'static',
    src: 'img/tile-blue.png',
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
    gravity: 30,
    debug: true,
    floor: true
  }
})
