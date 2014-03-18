angular.module('Rectangular')
  .service("ngrModels", function(ngrState, ngrBox, ngrDefaults)
  {

    var env;

    this.leftWall = function(options)
    {
      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.wall);
      options = _.extend(defaults, options);

      options.height = env.room.height / 2;
      options.y = env.room.height / 2;
      options.memo = "leftWall";

      var leftWall = ngrBox.shape(options);

      leftWall.options = options;

      return leftWall;

    }

    this.rightWall = function(options)
    {

      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.wall);
      options = _.extend(defaults, options);

      options.height = env.room.height / 2;
      options.x = env.room.width;
      options.y = env.room.height / 2;
      options.memo = "rightWall";
      var rightWall = ngrBox.shape(options);

      rightWall.options = options;

      return rightWall;

    }

    this.floor = function(options)
    {

      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.floor);
      options = _.extend(defaults, options);

      options.y = env.room.height;
      options.width = env.room.width / 2;
      options.x = env.room.width / 2;
      
      options.memo = "floor";


      var shape = ngrBox.shape(options);
      shape.options = options;
      return shape;

    }

    this.roof = function(options)
    {

      env = ngrState.getProperties();

      var defaults = _.clone(ngrDefaults.floor);
      options = _.extend(defaults, options);

      options.y = 0;
      options.width = env.room.width / 2;
      options.x = env.room.width / 2;

      options.memo = "roof";

      var shape = ngrBox.shape(options);
      shape.options = options;
      return shape;

    }
  })


