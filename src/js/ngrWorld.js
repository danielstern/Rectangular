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

  var hooks = [];
  var memoryPairs = [];

  this.load = function(json) {
    ngrState.setProperties(json.properties);
    _.each(json.elements,function(element){
     w.addElement(element.options);
    })
  }

  ngrLoop.addPermanentHook(function(){
    _.each(memoryPairs,function(pair){
      var o = pair.element.options;
      var pos = pair.body.GetPosition();
      var angle = pair.body.GetAngle();
      var type = pair.body.GetType();
      o.x = pos.x;
      o.y = pos.y;
      o.angle = angle;
      o.type = type;

    });
  });

  ngrLoop.addPermanentHook(function(){
    _.each(bodies,function(body){
    
      var pos = body.GetPosition();
      if (pos.y > 500) w.removeElement(body);

    });
  });


  this.addElement = function(options) {

    console.log("Adding element",options);

    var def = new NgShape(options);
    var id = guid();

    var b = world.CreateBody(def.getBodyDef());
    b.CreateFixture(def.getFixtureDef());
    if (options.userData) b.SetUserData(options.userData);
    if (options.isFloor) {
      if (ngrState.getFloor()) w.removeElement(ngrState.getFloor());
      ngrState.setFloor(b);
    }

    b.id = id;

    var elementDef = {};
    elementDef.options = def.options;
    elementDef.id = id;
    ngrState.addElement(elementDef);

    memoryPairs.push({element:elementDef,body:b,id:id});

    var privateOptions = _.clone(options);

    privateOptions.cycle = 0;
    b.options = privateOptions;

    bodies.push(b);

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

    var elId = body.id;
    world.DestroyBody(body);
    
    bodies = _.chain(bodies)
    .map(function(_body){
      if (_body.id != elId) return _body;
    })
    .compact()
    .value();

    ngrState.removeElement(body);

    memoryPairs = _.map(memoryPairs,function(_pair){
      if (_pair.id != elId) return _pair;
    })

    memoryPairs = _.compact(memoryPairs);

  }

  this.clearAll = function() {
    _.each(bodies, function(body) {
      world.DestroyBody(body);
      bodies = [];
      ngrState.clearElements();
    });

  }

  this.setGravity = function(grav) {
    world.SetGravity(new b2Vec2(0, grav))
  }

  var worldLoop = undefined;

  this.setWorld = function(gravityX, gravityY, sleep) {

    var gravity = new b2Vec2(gravityX, gravityY);
    var doSleep = sleep;
    
    world = world || new b2World(gravity, false);

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
