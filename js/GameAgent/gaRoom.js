angular.module('Rectangular')
  .service('ngrRoom', function(ngrWorld, ngrState, ngrStage) {

    var roomBodies = {};
    var e = this;
    var w = ngrWorld;



    ngrState.getRoomCenter = _.bind(function() {
      return {
        x: state.room.height / 2,
        y: state.room.width / 2
      }
    }, ngrState);

    ngrState.updateRoom = _.bind(function(_room) {
      if (_room.width) state.room.width = Number(_room.width);
      if (_room.height) state.room.height = Number(_room.height);

      _.each(['floor', 'roof', 'leftWall', 'rightWall'], function(area) {
        if (_room[area] == true) state.room[area] = true;
        if (_room[area] === false) state.room[area] = false;
      })

      _.call(stateChangeListeners, state);
    }, ngrState);

    function NgrModels() {

      var env;

      this.defaults = {

        wall: {
          width: 1,
          type: 'static',
          shapeKind: 'box',
          src: 'img/snowCenter.png',
          bg: 'tiled',
          x: 0,

        },


        floor: {
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
      }

      this.leftWall = function(options) {
        env = ngrState.getState();

        var defaults = _.clone(ngrDefaults.wall);
        options = _.extend(defaults, options);

        options.height = env.room.height / 2;
        options.y = env.room.height / 2;
        options.memo = "leftWall";

        var leftWall = ngrBox.shape(options);

        leftWall.options = options;

        return leftWall;

      }



      this.rightWall = function(options) {

        env = ngrState.getState();

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

      this.floor = function(options) {

        env = ngrState.getState();

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

      this.roof = function(options) {

        env = ngrState.getState();

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
    }
    var ngrModels = new NgrModels();



    this.floor = function(options) {
      if (roomBodies.floor) roomBodies.floor.crumble();
      var floor = ngrModels.floor(options);
      roomBodies.floor = w.addElement(floor.options);
    }

    this.createRoom = function(options) {
      this.clearRoom();
      var r = ngrState.getState().room;

      if (r.floor) e.floor(options);
      if (r.leftWall) e.leftWall(options);
      if (r.rightWall) e.rightWall(options);
      if (r.roof) e.roof();

    }

    this.clearRoom = function() {

      _.invoke(roomBodies, "crumble");
      /*
       if (roomBodies.roof) roomBodies.roof.crumble();
       if (roomBodies.leftWall) (roomBodies.leftWall).crumble();
       if (roomBodies.rightWall) (roomBodies.rightWall).crumble();
       if (roomBodies.floor) (roomBodies.floor).crumble();*/
      roomBodies = {};
    }

    this.roof = function(options) {

      if (roomBodies.roof) roomBodies.roof.crumble();
      var roof = ngrModels.roof(options);
      roomBodies.roof = w.addElement(roof.options);
    }

    this.leftWall = function(options) {

      if (roomBodies.leftWall) roomBodies.leftWall.crumble();
      var leftWall = ngrModels.leftWall(options);
      roomBodies.leftWall = w.addElement(leftWall.options);
    }

    this.rightWall = function(options) {

      if (roomBodies.rightWall) roomBodies.rightWall.crumble();
      var rightWall = ngrModels.rightWall(options);
      roomBodies.rightWall = w.addElement(rightWall.options);
    }



  })
