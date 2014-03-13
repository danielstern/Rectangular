angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld", function(ngrBox, ngrModels, ngrState, ngrDisplay, ngrLoop) {

  var world;
  var bodies = [];
  var properties = {};
  var ngrWorld = this;
  var env;

  var elements = [];

  var gravity = new b2Vec2(0, 0);
  var hooks = [];


  this.addElement = function(definition, options) {
    var b = world.CreateBody(definition.b);
    var f = b.CreateFixture(definition.f);

    options = _.clone(options) || {};

    options.cycle = 0;
    b.options = _.clone(options);

    bodies.push(b);

    if (options.userData) b.SetUserData(options.userData);

    return b;
  };

  this.cycleBody = function(b) {

    var options = b.options;

    options.cycle += Math.PI / 200 / options.movement.period || 1;
    var phase = options.movement.phaseShift || 0;
    var currentY = b.GetPosition().y;
    var currentX = b.GetPosition().x;
    var currentRotation = b.GetAngle();
    if (options.movement.shiftX || options.movement.shiftY) {
      var newY = currentY - (Math.sin(options.cycle + phase) / 50) * options.movement.shiftY;
      var newX = currentX - (Math.sin(options.cycle + phase) / 50) * options.movement.shiftX;
      b.SetPosition(new b2Vec2(newX, newY));
    }

    if (options.movement.rotation) {
      var newRotation = (phase) + (options.cycle / 50) * options.movement.rotation || 1;
      b.SetAngle(newRotation);
    }

  }

  this.removeElement = function(body) {
    world.DestroyBody(body);

  }

  this.clearAll = function() {
    _.each(bodies, function(body) {
      world.DestroyBody(body);
      bodies = [];
    });

  }

  this.setGravity = function(grav) {
    world.SetGravity(new b2Vec2(0,grav))
  }

  var worldLoop = undefined;

  this.setWorld = function(gravityX, gravityY, sleep) {

    var gravity = new b2Vec2(gravityX, gravityY);
    var doSleep = sleep;
    env = ngrState.getProperties();

    world = world || new b2World(gravity, false);

    window.world = world;

    worldLoop = ngrLoop.addPermanentHook(function() {

      //console.log("World cycling");

      world.Step(1 / 60, 10, 10)
      world.ClearForces();
      world.DrawDebugData();

      _.each(bodies, function(body) {

        if (body.options && body.options.movement) {

          ngrWorld.cycleBody(body);
        }

      })
    })

    return world;
  }

  this.getWorld = function() {
    return world;
  }
})
