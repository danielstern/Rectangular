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
  this.testWorld1 =  {"properties":{"height":600,"width":800,"focus":{"x":0,"y":0},"SCALE":24,"worldWidth":1000,"worldHeight":25},"elements":[{"definition":{"b":{"position":{"x":500,"y":25},"linearVelocity":{"x":0,"y":0},"userData":null,"angle":0,"angularVelocity":0,"linearDamping":0,"angularDamping":0,"allowSleep":true,"awake":true,"fixedRotation":false,"bullet":false,"type":0,"active":true,"inertiaScale":1},"f":{"filter":{"categoryBits":1,"maskBits":65535,"groupIndex":0},"shape":{"m_type":1,"m_radius":0.005,"m_centroid":{"x":0,"y":0},"m_vertices":[{"x":-500,"y":-0.3},{"x":500,"y":-0.3},{"x":500,"y":0.3},{"x":-500,"y":0.3}],"m_normals":[{"x":0,"y":-1},{"x":1,"y":0},{"x":0,"y":1},{"x":-1,"y":0}],"m_vertexCount":4},"userData":null,"friction":0.2,"restitution":0.1,"density":0.5,"isSensor":false}},"options":{"height":0.3,"position":"static","bg":"tiled","userData":{"isFloor":true},"y":25,"width":500,"x":500}},{"definition":{"b":{"position":{"x":17.67282491394629,"y":1},"linearVelocity":{"x":0,"y":0},"userData":null,"angle":0,"angularVelocity":0,"linearDamping":0,"angularDamping":0,"allowSleep":true,"awake":true,"fixedRotation":false,"bullet":false,"type":2,"active":true,"inertiaScale":1},"f":{"filter":{"categoryBits":1,"maskBits":65535,"groupIndex":0},"shape":{"m_p":{"x":0,"y":0},"m_type":0,"m_radius":0.5},"userData":null,"friction":0.2,"restitution":0.3,"density":0.5,"isSensor":false}},"options":{"x":17.67282491394629,"radius":0.5,"restitution":0.3,"density":0.5}},{"definition":{"b":{"position":{"x":8.674199087545276,"y":1},"linearVelocity":{"x":0,"y":0},"userData":null,"angle":0,"angularVelocity":0,"linearDamping":0,"angularDamping":0,"allowSleep":true,"awake":true,"fixedRotation":false,"bullet":false,"type":2,"active":true,"inertiaScale":1},"f":{"filter":{"categoryBits":1,"maskBits":65535,"groupIndex":0},"shape":{"m_p":{"x":0,"y":0},"m_type":0,"m_radius":0.5},"userData":null,"friction":0.2,"restitution":0.3,"density":0.5,"isSensor":false}},"options":{"x":8.674199087545276,"radius":0.5,"restitution":0.3,"density":0.5}},{"definition":{"b":{"position":{"x":6.993871942783395,"y":1},"linearVelocity":{"x":0,"y":0},"userData":null,"angle":0,"angularVelocity":0,"linearDamping":0,"angularDamping":0,"allowSleep":true,"awake":true,"fixedRotation":false,"bullet":false,"type":2,"active":true,"inertiaScale":1},"f":{"filter":{"categoryBits":1,"maskBits":65535,"groupIndex":0},"shape":{"m_type":1,"m_radius":0.005,"m_centroid":{"x":0,"y":0},"m_vertices":[{"x":-0.5,"y":-3.095},{"x":0.5,"y":-3.095},{"x":0.5,"y":3.095},{"x":-0.5,"y":3.095}],"m_normals":[{"x":0,"y":-1},{"x":1,"y":0},{"x":0,"y":1},{"x":-1,"y":0}],"m_vertexCount":4},"userData":null,"friction":0.5,"restitution":0.3,"density":0.5,"isSensor":false}},"options":{"x":6.993871942783395,"height":3.095,"width":0.5,"restitution":0.3,"density":0.5,"friction":0.5,"angle":0}},{"definition":{"b":{"position":{"x":30.01808379776776,"y":1},"linearVelocity":{"x":0,"y":0},"userData":null,"angle":0,"angularVelocity":0,"linearDamping":0,"angularDamping":0,"allowSleep":true,"awake":true,"fixedRotation":false,"bullet":false,"type":2,"active":true,"inertiaScale":1},"f":{"filter":{"categoryBits":1,"maskBits":65535,"groupIndex":0},"shape":{"m_type":1,"m_radius":0.005,"m_centroid":{"x":0,"y":0},"m_vertices":[{"x":-0.5,"y":-3.095},{"x":0.5,"y":-3.095},{"x":0.5,"y":3.095},{"x":-0.5,"y":3.095}],"m_normals":[{"x":0,"y":-1},{"x":1,"y":0},{"x":0,"y":1},{"x":-1,"y":0}],"m_vertexCount":4},"userData":null,"friction":0.5,"restitution":0.3,"density":0.5,"isSensor":false}},"options":{"x":30.01808379776776,"height":3.095,"width":0.5,"restitution":0.3,"density":0.5,"friction":0.5,"angle":0}},{"definition":{"b":{"position":{"x":13.52684221540888,"y":1},"linearVelocity":{"x":0,"y":0},"userData":null,"angle":0,"angularVelocity":0,"linearDamping":0,"angularDamping":0,"allowSleep":true,"awake":true,"fixedRotation":false,"bullet":false,"type":2,"active":true,"inertiaScale":1},"f":{"filter":{"categoryBits":1,"maskBits":65535,"groupIndex":0},"shape":{"m_type":1,"m_radius":0.005,"m_centroid":{"x":0,"y":0},"m_vertices":[{"x":-0.5,"y":-3.095},{"x":0.5,"y":-3.095},{"x":0.5,"y":3.095},{"x":-0.5,"y":3.095}],"m_normals":[{"x":0,"y":-1},{"x":1,"y":0},{"x":0,"y":1},{"x":-1,"y":0}],"m_vertexCount":4},"userData":null,"friction":0.5,"restitution":0.3,"density":0.5,"isSensor":false}},"options":{"x":13.52684221540888,"height":3.095,"width":0.5,"restitution":0.3,"density":0.5,"friction":0.5,"angle":0}}]}
  
})
