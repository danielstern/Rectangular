angular.module('Rectangular')
/* Creates an instance of the world of the simulation, 
   and provides an interface for it. */
.service("ngrWorld", function(ngrBox, ngrModels, ngrState, ngrDisplay, ngrLoop) {

  var world;
  var bodies = [];
  var properties = {};
  var ngrWorld = this;
  var env;
  var w = this;
  window.ngrWorld = w;

  var elements = [];

  var gravity = new b2Vec2(0, 0);
  var hooks = [];

  this.getJSON = function() {
    var r = {};
    r.properties = ngrState.getState();
    r.elements = elements;
    console.log("Making string...",r);
    var str = JSON.stringify(r);
    return str;
  }

  this.load = function(json) {
    console.log("Loading...",json);
    //ngrState.setProperties(properties);
    _.each(json.elements,function(element){
      console.log("Adding,",element);
//      w.addElement(element.definition, element.options);
    })
  }


  this.addElement = function(definition, options) {
    console.log("adding",definition,options);
  //  var b = world.CreateBody(new NgShape(definition.options).getBodyDef());
  //  var f = b.CreateFixture(new NgShape(definition.options).getFixtureDef());

  var defintion = new NgShape(definition);

    var b = world.CreateBody(definition.getBodyDef());
    var f = b.CreateFixture(definition.getFixtureDef());

    var elementDef = {};
    elementDef.definition = definition;
    elementDef.options = options;
    elements.push(elementDef);

    options = _.clone(options) || {};

    options.cycle = 0;
    b.options = _.clone(options);

    bodies.push(b);

    if (options.userData) b.SetUserData(options.userData);

    return b;
  };

  this.pin = function(body, target) {
    var m_world = world;
    var r = target;
    var mouse_joint = new b2MouseJointDef();
    
    mouse_joint.bodyA = ngrWorld.getWorld().GetGroundBody();
    mouse_joint.bodyB = body;
    mouse_joint.target.Set(r.worldPosX, r.worldPosY);
    mouse_joint.collideConnected = true;

    mouse_joint.maxForce = body.mass * 300;
    mouseJointBody = m_world.CreateJoint(mouse_joint);
    return mouseJointBody;
  }

  this.destroyJoint = function(joint) {
    if (joint) world.DestroyJoint(joint);
  }

  this.unpin = this.destroyJoint;

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
    console.log("world clearing all");
    _.each(bodies, function(body) {
      world.DestroyBody(body);
      bodies = [];
      elements = [];
    });

  }

  this.setGravity = function(grav) {
    world.SetGravity(new b2Vec2(0, grav))
  }

  var worldLoop = undefined;

  this.setWorld = function(gravityX, gravityY, sleep) {

    var gravity = new b2Vec2(gravityX, gravityY);
    var doSleep = sleep;
    env = ngrState.getProperties();

    world = world || new b2World(gravity, false);

    window.world = world;

    worldLoop = ngrLoop.addPermanentHook(function() {

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
